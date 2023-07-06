# Table 表格

基于 element-plus：el-table el-pagination 二次封装，支持 element-plus 的所有属性

### 功能

- JSON 数据渲染 Table
- 自带分页功能

## 基本使用

<demo src="./basic.vue"></demo>

## 自动请求数据

<demo src="./request.vue"></demo>

## 数据枚举

<demo src="./enum.vue"></demo>

## Attributes

[完整配置请参考-element-plus](https://element-plus.org/zh-CN/component/table.html)

### Table 属性

| 属性名              | 说明                                                                                             | 类型     | 可选值     | 默认值                                    |
| ------------------- | ------------------------------------------------------------------------------------------------ | -------- | ---------- | ----------------------------------------- |
| `columns`           | 表头 columns 配置项兼容 Table-column 属性                                                        | Array    | —          | []                                        |
| `tableData`         | 数据源                                                                                           | Array    | —          | []                                        |
| `paginationHide`    | 是否有分页功能                                                                                   | Boolean  | —          | false                                     |
| `paginationOptions` | 分页组件 props                                                                                   | Boolean  | —          | false                                     |
| `layout`            | 分页组件布局，子组件名用逗号分隔                                                                 | String   | —          | "total, sizes, prev, pager, next, jumper" |
| `total`             | 总条目数                                                                                         | Number   | —          | 0                                         |
| `pageSize`          | 分页大小                                                                                         | Number   | —          | 10                                        |
| `pageSizes`         | 每页显示个数选择器的选项设置                                                                     | Array    | —          | [10, 30, 50, 100]                         |
| `currentPage`       | 当前页数                                                                                         | Array    | —          | 1                                         |
| `currentPageKey`    | 传给 API 的默认字段名，paginationHide 为 true 时，不携带此参数                                   | String   | —          | page                                      |
| `pageSizeKey`       | 传给 API 的默认字段名，paginationHide 为 true 时，不携带此参数                                   | String   | —          | size                                      |
| `tableChange`       | 触发分页、排序 调用此方法，接收 actionType 和 value 两个参数，actionType: page、size、sort       | Function | —          |                                           |
| `requestApi`        | 表格数据自动获取方法，返回一个 Promise                                                           | Function | —          |                                           |
| `requestAuto`       | 是否立即触发 requestApi ,如果不需要可设置为 false，手动调用 updateTableData 方法更新列表数据     | Boolean  | true/false | true                                      |
| `dataKey`           | 自动调用 requestApi 返回结果后，读取列表数据的 key                                               | String   | —          | items                                     |
| `dataCallback`      | 自动调用 requestApi 返回结果后，可通过此方法对数据进行处理，并返回一个对象。'{total:0,items:[]}' | Function | —          | —                                         |
| `requestParams`     | 表格数据获取时，其它参数                                                                         | Object   | —          | —                                         |

### Column 属性

| 属性名         | 说明                                     | 类型          | 备注            |
| -------------- | ---------------------------------------- | ------------- | --------------- |
| `hide`         | 隐藏列                                   | Boolean       |                 |
| `copy`         | 鼠标左键点击后复制列文本                 | Boolean       |                 |
| `enum`         | 字典，可格式化单元格内容                 | Array、Object |                 |
| `formatText`   | 列文本格式化                             | Function      | formatText(row) |
| `render`       | 自定义单元格内容渲染（tsx 语法、h 语法） | Function      |                 |
| `headerRender` | 自定义单元格内容渲染（tsx 语法、h 语法） | Function      |                 |
| `_children`    | 多级表头                                 | Array         |                 |

### Table 方法

| 属性名            | 说明                                      | 类型     | 备注 |
| ----------------- | ----------------------------------------- | -------- | ---- |
| `updateTableData` | 更新表格数据,调用此方法会执行 requestAPI  | Function |      |
| `resetTableData`  | 重置表格数据 ,调用此方法会执行 requestAPI | Function |      |

### Table 插槽

| 名称          | 说明           |
| ------------- | -------------- |
| `tableHeader` | 自定义表头内容 |

### Table-column 插槽

| 名称                     | 说明                                                |
| ------------------------ | --------------------------------------------------- |
| `—`                      | 自定义列的内容 作用域参数为 { row, column, $index } |
| `column.prop + "Header"` | 自定义表头的内容 ， 作用域参数为 { column, $index } |
