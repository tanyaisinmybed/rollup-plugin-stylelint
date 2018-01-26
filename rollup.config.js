import babel from 'rollup-plugin-babel';
import packageJson from './package.json'

export default {
    input: 'src/index.js',

    external: [
        'stylelint',
        'rollup-pluginutils'
    ],

    plugins: [
        babel(),
    ],

    output: [
        {
            format: 'cjs',
            file: packageJson.main
        },
        {
            format: 'es',
            file: packageJson.module
        }
    ]
};