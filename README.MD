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