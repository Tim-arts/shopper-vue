module.exports = {
    root: true,
    env: { node: true },
    extends: [
        'plugin:vue/vue3-recommended',
        '@vue/airbnb',
        '@vue/typescript',
        'prettier/vue'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'quote-props': ['error', 'as-needed'],
        indent: ['error', 4],
        quotes: [2, 'single', { avoidEscape: true }],
        'linebreak-style': ['error', (process.platform === 'win32' ? 'windows' : 'unix')],
        'comma-dangle': ['error', 'never'],
        'max-len': 'off',
        semi: ['error', 'never', { beforeStatementContinuationChars: 'always' }],
        'object-curly-newline': ['error', { consistent: true }]
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
        tsconfigRootDir: './',
        ecmaFeatures: { jsx: true }
    }
}
