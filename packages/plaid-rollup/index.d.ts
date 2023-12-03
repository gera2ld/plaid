import { RollupBabelInputPluginOptions } from '@rollup/plugin-babel';
import { RollupCommonJSOptions } from '@rollup/plugin-commonjs';
import { PostCSSPluginConf } from 'rollup-plugin-postcss';

export declare function definePlugins(options: {
  babelConfig?: RollupBabelInputPluginOptions;
  esm?: boolean;
  aliases?: Record<string, string>;
  extensions?: string[];
  replaceValues?: Record<string, string>;
  postcss?: PostCSSPluginConf;
  browser?: boolean;
  minimize?: boolean;
  commonjs?: RollupCommonJSOptions;
}): any[];

type IPattern = string | ((id: string) => boolean) | RegExp;

export declare function defineExternal(
  externals: IPattern[],
): (id: string) => boolean;
