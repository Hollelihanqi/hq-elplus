# chart 图表

基于 基于 Echart 二次封装，支持 Echart 的所有属性

### 功能

- 折线图:内置默认 options
- 柱状图:内置默认 options
- 饼图

## 基本使用

### 折线图

<demo src="./lineChart.vue"></demo>

### 柱状图

<demo src="./barChart.vue"></demo>

### 饼图

<demo src="./pieChart.vue"></demo>

## Attributes

[完整配置请参考-element-plus]('https://element-plus.org/zh-CN/component/table.html')

### Echart 属性

| 属性名    | 说明     | 类型   | 可选值       | 默认值 | 备注                                                      |
| --------- | -------- | ------ | ------------ | ------ | --------------------------------------------------------- |
| `type`    | 类型     | string | line/bar/pie | -      | 目前仅预定义线图/柱图/饼图三种，绘制其他图形无需指定 type |
| `options` | 配置项   | object | —            | {}     | —                                                         |
| `width`   | 图形宽度 | string | —            | 100%   | —                                                         |
| `height`  | 图形高度 | string | —            | 400px  | —                                                         |
