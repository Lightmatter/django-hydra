module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "airbnb-base"
  ],
  "parserOptions": {
    "ecmaVersion": 13,
    "parser": "@typescript-eslint/parser",
    "sourceType": "module",
    "project": ['./tsconfig.json']
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "settings": {
    "import/resolver": {
      alias: {
        map: [
          ["@", "./frontend"],
        ],
      }
    }
  },
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "no-unused-vars": 0,
    "import/no-absolute-path": 0,
    "quotes": ["error", "double", { "avoidEscape": true }]
  },
};
