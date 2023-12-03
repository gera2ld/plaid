# `@gera2ld/plaid-rollup`

![NPM](https://img.shields.io/npm/v/@gera2ld/plaid-rollup.svg)
![License](https://img.shields.io/npm/l/@gera2ld/plaid-rollup.svg)

Rollup configuration.

## Usage

In `rollup.config.mjs`:

```js
import { defineConfig } from 'rollup';
import { definePlugins, defineExternal } from '@gera2ld/plaid-rollup';

export default defineConfig({
  input: 'src/index.ts',
  output: {
    format: 'es',
  },
  plugins: definePlugins({
    browser: true,
    replaceValues: {
      'process.env.VERSION': '1.0.0',
    },
  }),
  external: defineExternal(['path']),
});
```
