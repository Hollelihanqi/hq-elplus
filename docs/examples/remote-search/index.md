# RemoteSearch Select

基于 element-plus：ElSelect 二次封装，适用于远程搜索

### 功能

- 通过传入 URL 实现远程搜索
- 自定义 label
- 自定义 option 模板
- 支持 v-model

## 基本使用

<demo src="./basic.vue"></demo>

## 自定义模板

<demo src="./customTemp.vue"></demo>

## Attributes

[完整配置请参考-element-plus](https://element-plus.org/zh-CN/component/table.html)

### RemoteSearch 属性

| 属性名           | 说明                                          | 类型             | 可选值             | 默认值  |
| ---------------- | --------------------------------------------- | ---------------- | ------------------ | ------- |
| `url`            | 远程搜索地址                                  | String           | —                  | ""      |
| `method`         | 请求方式                                      | String           | —                  | "GET"   |
| `isRemoteSearch` | 如果只需要请求一次，请设置为 false            | Boolean          | —                  | true    |
| `requestApi`     | 自定义调用方法，返回一个数组,优先级低于 `url` | Function         | —                  |         |
| `requestAuto`    | 是否立即请求，如需手动请求，请设置为 false    | Boolean          | —                  | true    |
| `searchField`    | 搜索字段名称                                  | String           | —                  | ""      |
| `requestHeaders` | 请求 Headers                                  | Object、Function | —                  | {}      |
| `requestParams`  | 其它参数                                      | Object           | —                  | {}      |
| `resultKey`      | 接口返回后，获取列表的 key 名                 | String           | —                  | "items" |
| `dataCallback`   | 接口返回后，回调函数,可对数据进行格式化处理   | Function         | —                  | null    |
| `valueKey`       | 选项的值,对应的字段                           | String           | —                  | "id"    |
| `labelKey`       | 选项的标签,对应的字段                         | String           | —                  | "label" |
| `modelItem`      | 绑定的 value 值是否为当前选择中的数据对象     | Boolean          | —                  | false   |
| `optTemp`        | 自定义下拉模板                                | Funtion          | h() 函数、jsx 语法 | null    |
| `w`              | 控件的宽度                                    | String           | —                  | "100%"  |
