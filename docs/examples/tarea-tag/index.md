# TareaTag 文件验证

一个自动输入框，将输入的文本按照一定的规则生成 tag

### 功能

- 根据正则判断输入是否合法
- 删除

## 基本使用

<demo src="./basic.vue"></demo>

## Attributes

[完整配置请参考-element-plus](https://element-plus.org/zh-CN/component/table.html)

## SearchForm 属性

| 属性名        | 说明                                   | 类型             | 可选值 | 默认值 |
| ------------- | -------------------------------------- | ---------------- | ------ | ------ |
| `v-model`     | 数据绑定                               | Object           | —      | --     |
| `placeholder` | 输入框提示语`                          | String           | —      | ""     |
| `regular`     | 正则表达式，用于验证每一条文本是否合法 | RegExp, Function | —      | null   |
| `required`    | 是否必传参数                           | Boolean          | —      | false  |

### ColConfigItem 属性

| 属性名 | 说明                          | 类型   | 默认值 |
| ------ | ----------------------------- | ------ | ------ |
| `xs`   | width < 768                   | Number | 1      |
| `sm`   | width >= 768 && width < 992   | Number | 2      |
| `md`   | width >= 992 && width < 1200  | Number | 2      |
| `lg`   | width >= 1200 && width < 1920 | Number | 3      |
| `xl`   | width >= 1920                 | Number | 4      |

### FormControlsItem 属性

| 属性名         | 说明                                                                                                | 类型                                            | 默认值 |
| -------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ------ |
| `el`           | `input 、 select 、 tree-select 、 date-picker 、 time-picker 、 time-select 、 switch 、 checkbox` | String                                          | -      |
| `props`        | el-form 表单元素属性，可查看 element-plus                                                           | Object                                          | -      |
| `label`        | 所有控件显示的 label 文字                                                                           | String                                          | -      |
| `field`        | 搜索字段名称                                                                                        | String                                          | -      |
| `defaultValue` | 搜索控件默认值                                                                                      | `String 、 Number 、 Boolean 、 Function 、 []` | -      |
| `formatValue`  | 格式化表单值                                                                                        | Function                                        | -      |
| `span`         | 搜索项所占用的列数，默认为 1 列                                                                     |                                                 | 1      |
| `offset`       | 搜索字段左侧偏移列数                                                                                |                                                 | 0      |
| `options`      | `el` 为 select 时，option 配置列表                                                                  | `[{label:string,value:any}]`                    | []     |
| `...colConfig` | 对 `colConfig` 的属性展开可单独配置到任意一个搜索项中                                               | Number                                          | -      |
| `render`       | 自定义渲染，可传入一个 Vue 组件,支持 JSX、h 函数                                                    | Function                                        | -      |
| `isRemote`     | `el` 为 select 时，是否通过调用接口，获取下拉列表数据                                               | Boolean                                         | false  |
| `remoteProps`  | 远程搜索配置,[参考-remote-search](http://10.130.136.69:7200/examples/remote-search/)                | Object                                          | -      |

## SearchForm 事件

| 名称           | 说明                 |
| -------------- | -------------------- |
| `on-search`    | 点击搜索按钮回调函数 |
| `on-reset`     | 点击重置回调函数     |
| `after-remote` | 远程搜索之后回调     |

## SearchForm 方法

| 名称              | 说明                                                               |
| ----------------- | ------------------------------------------------------------------ |
| `getFormatValues` | 获取格式化后的 Form 值，会动态判断表单配置项中是否有 `formatValue` |
