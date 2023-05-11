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
    "prettier",
    "./packages/yto-custom/types/.eslintrc-auto-import.json",
  ],
  overrides: [],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-namespace": "off", // 禁止使用自定义 TypeScript 模块和命名空间。
    "@typescript-eslint/no-inferrable-types": "off", // 可以轻松推断的显式类型可能会增加不必要的冗长
    "@typescript-eslint/ban-types": "off", // 禁止使用特定类型
    "@typescript-eslint/no-unused-vars": "off", // 禁止未使用的变量
    "@typescript-eslint/no-non-null-assertion": "off", // 禁止断言为 any
    "@typescript-eslint/ban-ts-comment": "off", // 禁止@ts-ignore
    "vue/no-mutating-props": "off",
    "vue/no-reserved-component-names":"off", // 警用组件名使用 HTML 保留字段
    // "vue/no-unused-vars": "off", // 警用未使用的变量
    '@typescript-eslint/no-empty-function': 'off', //禁用空函数
    'vue/require-default-prop': "off", // 禁用属性默认值
    // 'vue/component-tags-order': 'off', // 禁用标签顺序
    // "vue/attributes-order": 0, //禁用属性顺序
    // 'vue/attribute-hyphenation': 0, // 禁用使用驼峰式绑定属性
    // 'vue/require-explicit-emits': 0 // 禁用未使用 emits 选项声明的事件触发器
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
