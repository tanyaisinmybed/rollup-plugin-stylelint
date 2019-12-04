# rollup-plugin-stylelint (WIP 🚧)
Verify entry point and all imported files with stylelint
## Installation
```
npm install --save-dev rollup-plugin-stylelint stylelint
```
## Usage
```js
// rollup.config.js
import stylelint from 'rollup-plugin-stylelint';

export default {
  entry: './main.ts',

  plugins: [
    stylelint({
        //stylelint config
    })
  ]
}
```
The plugin loads linter options from the .stylelintrc file by default. Passing options to the plugin directly overrides those options.

## Options

See more options here [stylelint-config](https://stylelint.io/user-guide/configuration).

### throwOnError

Type: `boolean`  
Default: `false`

If true, will throw an error if any errors were found.

### throwOnWarning

Type: `boolean`  
Default: `false`

If true, will throw an error if any warnings were found.
