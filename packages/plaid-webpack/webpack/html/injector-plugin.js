const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const util = require('./util');

class InjectorPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('InjectorPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
        'InjectorPlugin', (data, callback) => {
          this.injectExternalFiles(data);
          this.groupAssets(data);
          if (data.plugin.options.inlineSource) this.inlineSource(data, compilation);
          callback(null, data);
        }
      );
    });
  }

  inlineSource(data, compilation) {
    // Based on https://github.com/DustinJackson/html-webpack-inline-source-plugin
    const { filename } = data.plugin.options;
    let prefix = path.dirname(filename) + '/';
    if (prefix === './') prefix = '';
    const publicUrlPrefix = compilation.outputOptions.publicPath || '';
    const getSource = url => {
      let asset;
      if (url) {
        const assetName = path.posix.relative(publicUrlPrefix, url);
        for (const [key, value] of Object.entries(compilation.assets)) {
          if (assetName === path.posix.relative('', key)) {
            asset = value;
            break;
          }
        }
      }
      if (!asset) return;
      let source = asset.source();
      if (typeof source !== 'string') source = source.toString();
      return source;
    };
    const inlineItem = item => {
      if (item.tagName === 'script' && item.attributes.src) {
        const url = `${prefix}${item.attributes.src}`;
        const source = getSource(url);
        if (source != null) {
          return {
            tagName: 'script',
            closeTag: true,
            innerHTML: util.escapeScript(source),
          };
        }
      } else if (item.tagName === 'link' && item.attributes.rel === 'stylesheet' && item.attributes.href) {
        const url = `${prefix}${item.attributes.href}`;
        const source = getSource(url);
        if (source != null) {
          return {
            tagName: 'style',
            closeTag: true,
            innerHTML: source,
          };
        }
      }
      return item;
    };
    data.headTags = data.headTags.map(inlineItem);
    data.bodyTags = data.bodyTags.map(inlineItem);
  }

  injectExternalFiles(data) {
    const { css, js } = data.plugin.options;
    const cssTags = (css || []).map(item => {
      if (typeof item === 'string') {
        return {
          tagName: 'link',
          closeTag: false,
          attributes: {
            rel: 'stylesheet',
            href: item,
          },
        };
      }
      if (item && item.content) {
        return {
          tagName: 'style',
          closeTag: true,
          innerHTML: item.content,
        };
      }
      return item;
    });
    const jsTags = (js || []).map(item => {
      if (typeof item === 'string') {
        return {
          tagName: 'script',
          closeTag: true,
          attributes: {
            src: item,
          },
        };
      }
      if (item && item.content) {
        return {
          tagName: 'script',
          closeTag: true,
          innerHTML: util.escapeScript(item.content),
        };
      }
      return item;
    });
    data.headTags = [...cssTags, ...data.headTags, ...jsTags];
  }

  groupAssets(data) {
    const { injectTo } = data.plugin.options;
    if (typeof injectTo === 'function') {
      const groups = { head: [], body: [] };
      [
        ['head', data.headTags],
        ['body', data.bodyTags],
      ].forEach(([defaultGroup, items]) => {
        items.forEach(item => {
          const groupName = injectTo(item, defaultGroup);
          const group = groups[groupName] || groups[defaultGroup];
          group.push(item);
        });
      });
      data.headTags = groups.head;
      data.bodyTags = groups.body;
    }
  }
}

module.exports = InjectorPlugin;
