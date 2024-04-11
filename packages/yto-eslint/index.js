/*
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2024-03-19 14:16:27
 * @LastEditTime: 2024-04-11 09:42:45
 */
/* eslint-disable */
const { defineConfig } = require("eslint-define-config");
module.exports = defineConfig({
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:markdown/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["vue", "@typescript-eslint", "prettier"],
  overrides: [
    {
      files: ["*.vue"],
      parser: require.resolve("vue-eslint-parser"),
    },
    {
      files: ["**/*.md/*.js", "**/*.md/*.ts"],
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
      },
    },
  ],
  rules: {
    "vue/multi-word-component-names": "off", // 禁用组件名称始终为多词
    "@typescript-eslint/no-explicit-any": "off", // 禁止使用any类型
    "@typescript-eslint/no-namespace": "off", // 禁止使用自定义 TypeScript 模块和命名空间。
    "@typescript-eslint/no-inferrable-types": "off", // 可以轻松推断的显式类型可能会增加不必要的冗长
    "@typescript-eslint/ban-types": "off", // 禁止使用特定类型
    "@typescript-eslint/no-unused-vars": "off", // 禁止未使用的变量
    "@typescript-eslint/no-non-null-assertion": "off", // 禁止断言为 any
    "@typescript-eslint/ban-ts-comment": "off", // 禁止@ts-ignore
    "vue/no-mutating-props": [
      "error",
      {
        // 禁止检测引用类型
        shallowOnly: true,
      },
    ],
    "vue/no-reserved-component-names": "off", // 警用组件名使用 HTML 保留字段
    "@typescript-eslint/no-empty-function": "off", //禁用空函数
    "vue/require-default-prop": "off", // 禁用属性默认值
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto", // 表示Prettier将根据文件现有的行尾字符自动确定并保持一致的风格。这意味着如果文件原来使用的是CRLF（Windows风格），则格式化后仍会保留CRLF；如果文件原来使用的是LF（Unix或Mac风格），则格式化后依然使用LF。这样可以确保在跨平台协作时避免因为换行符不同而引起的冲突
      },
    ],
  },
  settings: {
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".mjs", ".d.ts"],
      },
    },
  },
});
