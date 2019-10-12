module.exports = {
    env: {
        "es6": true,
        "node": true
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: ["airbnb-base", "plugin:@typescript-eslint/recommended"],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module"
    },
    rules: {
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/camelcase": "off",
        "import/no-unresolved": "off",
        "no-console": "off",
        "no-use-before-define": "off",
        "import/first": "off",
        "import/prefer-default-export": "off",
        "no-underscore-dangle": "off",
        "camelcase": "off",
        "object-curly-newline": "off",
    }
};