import { type Config } from 'prettier';

const config: Config = {
    printWidth: 120, // max 120 chars in line, code is easy to read
    tabWidth: 4,
    trailingComma: 'es5',
    semi: true,
    singleQuote: true,
    bracketSpacing: true,
    arrowParens: 'always',
    jsxSingleQuote: false, // "" for react props, like in html
    bracketSameLine: false, // pretty JSX
    endOfLine: 'lf',
    proseWrap: 'always',
    tailwindStylesheet: './src/styles/index.css',
    plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
