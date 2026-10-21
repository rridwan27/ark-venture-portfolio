module.exports = [{
  files: ["**/*.js", "**/*.jsx"],
  languageOptions: {
    ecmaVersion: 2023,
    sourceType: "module",
    globals: {process: "readonly", module: "readonly"}
  },
  rules: {}
}];
