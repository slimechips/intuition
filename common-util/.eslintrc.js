module.exports = {
    env: {
        "es6": true,
        "node": true
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: ['airbnb-base'],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module"
    },
    rules: {
        "import/no-unresolved": "off",
        "no-console": "off",
        "no-use-before-define": "off",
        "import/prefer-default-export": "off",
        "no-underscore-dangle": "off",
    }
};