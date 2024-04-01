module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "@yto/eslint-config",
    "./packages/yto-custom/types/.eslintrc-auto-import.json"
  ],
}