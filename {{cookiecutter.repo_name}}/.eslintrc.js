/* eslint-disable quote-props */
module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
  },
  "extends": [
    "plugin:@typescript-eslint/recommended",
    //TODO: Fix typechecking issues in main.ts and util to use this
    //'plugin:@typescript-eslint/recommended-requiring-type-checking',
    "airbnb-base",
  ],
  "parserOptions": {
    "ecmaVersion": 13,
    "parser": "@typescript-eslint/parser",
    "sourceType": "module",
    tsconfigRootDir: __dirname,
    "project": ["./tsconfig.json"],
  },
  "plugins": [
    "@typescript-eslint",
  ],
  "settings": {
    "import/resolver": {
      "alias": {
        "map": [
          ["@", "./frontend"],
        ],
      },
      "node": {
        "extensions": [".js", ".ts"],
      },
      "typescript": {},
    },
  },
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-empty-interface": "off",
    "no-unused-vars": 0,
    "import/no-absolute-path": 0,
    "quotes": ["error", "double", { "avoidEscape": true }],
    "max-len": "off",
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
    "no-extra-semi": "off",
    "import/extensions": "off",
    "no-else-return": "off",
    "consistent-return": "off",
  },
};
