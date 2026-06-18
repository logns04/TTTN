const tseslint =
require(
'@typescript-eslint/eslint-plugin'
);

const parser =
require(
'@typescript-eslint/parser'
);

module.exports = [

{
files: ['**/*.ts'],

languageOptions: {
parser
},

plugins: {
'@typescript-eslint':
tseslint
},

rules: {

'no-console': 'off',

'@typescript-eslint/no-explicit-any':
'error',

'@typescript-eslint/no-unused-vars':
'warn'
}
}

];
