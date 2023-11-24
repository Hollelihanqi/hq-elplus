# Table 表格

基于 element-plus：el-form 二次封装，支持 element-plus 的所有属性

### 功能

- JSON 数据渲染 el-form 控件
- 支持 v-model 数据绑定
- 自适应布局
- 支持收缩/收起

## 基本使用

<demo src="./basic.vue"></demo>

## Attributes

[完整配置请参考-element-plus](https://element-plus.org/zh-CN/component/table.html)

## SearchForm 属性

| 属性名                | 说明                                                            | 类型             | 可选值 | 默认值                                  |
| --------------------- | --------------------------------------------------------------- | ---------------- | ------ | --------------------------------------- |
| `v-model:searchModel` | 数据绑定                                                        | Object           | —      | --                                      |
| `colConfig`           | 全局配置不同屏幕下一行所显示的控件个数, 参考 `FormControlsItem` | [Number, Object] | —      | `{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }` |
| `formControls`        | 搜索项配置项，参考 `ColConfigItem`                              | Array            | —      | []                                      |
| `modelDefault`        | 默认值,可以同时支持多个表单项的默认值配置                       | Object           | —      | null                                    |

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
| `span`         | 搜索项所占用的列数，默认为 1 列                                                                     |                                                 | 1      |
| `offset`       | 搜索字段左侧偏移列数                                                                                |                                                 | 0      |
| `options`      | `el` 为 select 时，option 配置列表                                                                  | `[{label:string,value:any}]`                    | []     |
| `...colConfig` | 对 `colConfig` 的属性展开可单独配置到任意一个搜索项中                                               | Number                                          | -      |
| `render`       | 自定义渲染，可传入一个 Vue 组件,支持 JSX、h 函数                                                    | Function                                        | -      |
| `isRemote`     | `el` 为 select 时，是否通过调用接口，获取下拉列表数据                                               | Boolean                                         | false  |
| `remoteProps`  | 远程搜索配置,[参考-remote-search](http://10.130.136.69:7200/examples/remote-search/)                | Object                                          | -      |

## SearchForm 事件

| 名称        | 说明                 |
| ----------- | -------------------- |
| `on-search` | 点击搜索按钮回调函数 |
| `on-reset`  | 点击重置回调函数     |
