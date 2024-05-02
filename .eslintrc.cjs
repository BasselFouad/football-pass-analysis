module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh", "@typescript-eslint", "react", "react-hooks"],
  rules: {
    "require-jsdoc": "off",
    "valid-jsdoc": "warn",
    "guard-for-in": "off",
    camelcase: "warn",
    "no-extend-native": "off",
    "no-inner-declarations": "warn",
    "no-invalid-this": "warn",
    "prefer-destructuring": "warn",
    "react/no-unescaped-entities": "warn",
    "max-len": ["warn", {
      "code": 90,
      "tabWidth": 4,
      "comments": 100,
      "ignoreUrls": true,
      "ignoreStrings": true,
      "ignoreTemplateLiterals": true
    }]
  },
};