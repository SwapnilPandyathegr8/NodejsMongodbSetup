module.exports = {
    // "extends": "eslint:recommended",
    "parserOptions": { "ecmaVersion": 6 },
    "env": { "es6": true },
    "rules": {
        // enable additional rules
        "indent": ["error", 2],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "double"],
        "semi": ["error", "always"],

        // override default options for rules from base configurations
        // "comma-dangle": ["error", "always"],
        "no-cond-assign": ["error", "always"],

        // disable rules from base configurations
        "no-console": "off",
        "no-trailing-spaces": "error",
        "no-undefined": "error"
    }
};