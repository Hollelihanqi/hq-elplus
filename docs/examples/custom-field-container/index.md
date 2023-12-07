# CustomFieldContainer

基于 CustomFieldConfig 组件实现自定义字段布局。

## 使用场景

- 配置页面得自定义规则配置

### 功能

- 支持单层新增/删除布局
- 支持左侧连接线可配置
- 支持右侧新增删除按钮可配置

## 基本使用

### CustomFieldContainer 属性

| 属性名      | 说明                   | 类型    | 可选值                | 默认值 | 备注                      |
| ----------- | ---------------------- | ------- | --------------------- | ------ | ------------------------- |
| `auto`      | 根据容器大小自适应布局 | boolean | -                     | true   | 配置了 direction 则不生效 |
| `direction` | 水平/重置方向布局      | string  | `vertical/horizontal` | -      |                           |

### CustomFieldContainer 插槽

| 属性名       | 说明         |
| ------------ | ------------ |
| `splitLine`  | 左侧分割线   |
| `operateBtn` | 右侧操作按钮 |

### CustomFieldContainer 事件

| 属性名   | 说明     |
| -------- | -------- |
| `add`    | 新增操作 |
| `delete` | 删除操作 |

### CustomFieldContainer 样式变量

| 属性名   | 说明 |
| -------- | ---- |
| `待补充` |      |
