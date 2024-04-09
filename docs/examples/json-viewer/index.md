# JsonViewer 数据预览器

基于原生 HTML、JS、CSS

### 功能

- 复制
- 主题配置

## 基本使用

<demo src="./basic.vue"></demo>

### JsonViewer 属性

| 属性名        | 说明           | 类型    | 可选值       | 默认值    |
| ------------- | -------------- | ------- | ------------ | --------- |
| `data`        | JSON 对象      | Object  | —            | {}        |
| `expanded`    | 是否收起       | Boolean | —            | false     |
| `copy`        | 复制功能       | Boolean | —            | true      |
| `expandDepth` | 默认展开的级数 | Number  | —            | 3         |
| `theme`       | 主题颜色       | String  | "light/dark" | light     |
| `rootKey`     | 根节点名称     | String  | —            | "Root"    |
| `expandColor` | 展开按钮颜色   | String  | —            | "#824c96" |
