# CustomFieldConfig

用于实现自定义字段的配置。

## 使用场景

- 查询头自定义查询条件
- 配置页面得自定义配置

### 功能

- 左侧字段（field）支持输入/选择
- 中间操作符（operator）支持选择
- 右侧字段值（value）支持输入/选择（其他显示方式建议通过插槽实现）
- 支持禁用(考虑单独禁用整体禁用)
- 支持 form 表单校验（可配置）

## 基本使用

### CustomFieldConfig 属性

| 属性名             | 说明         | 类型     | 可选值 | 默认值 | 备注     |
| ------------------ | ------------ | -------- | ------ | ------ | -------- |
| `v-model:field`    | 字段值       | string   | -      | -      |          |
| `fieldConfig`      | field 配置   | object   | -      | -      |          |
| `v-model:operator` | 操作符       | string   | -      | ''     |          |
| `operatorConfig`   | field 配置   | object   | -      | -      |          |
| `v-model:value`    | 字段值       | string   | -      | -      | 支持多选 |
| `valueConfig`      | field 配置   | object   | -      | -      |          |
| `disabled`         | 是否禁用     | boolean  | -      | false  |          |
| `rules`            | 表单校验规则 | function | -      | -      |          |
| `cacheable`        | 是否临时缓存 | boolean  | -      | false  |          |

```js
interface FieldConfig {
  type: string;
  options: Array;
}
interface operatorConfig {
  options: Array;
  disabled: boolean;
}
interface valueConfig {
  type: string;
  options: Array;
  disabled: boolean;
}
```

### CustomFieldConfig 插槽

| 属性名     | 说明              |
| ---------- | ----------------- |
| `filed`    | field 区域插槽    |
| `operator` | operator 区域插槽 |
| `value`    | value 区域插槽    |

### CustomFieldConfig 事件

| 属性名           | 说明           |
| ---------------- | -------------- |
| `filedChange`    | field 发生改变 |
| `operatorChange` | 操作符发生改变 |
| `valueChange`    | value 发生改变 |

### CustomFieldConfig 样式变量

| 属性名                 | 说明 |
| ---------------------- | ---- |
| `--custom-field-width` | 宽度 |
