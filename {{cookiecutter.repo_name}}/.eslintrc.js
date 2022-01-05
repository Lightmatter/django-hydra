module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/essential",
    "airbnb-base"
  ],
  "parserOptions": {
    "ecmaVersion": 13,
    "parser": "@typescript-eslint/parser",
    "sourceType": "module",
    "project": ['./tsconfig.json']
  },
  "plugins": [
    "vue",
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
    "import/no-absolute-path": 0,
    "quotes": ["error", "double", { "avoidEscape": true }]
  },
};
