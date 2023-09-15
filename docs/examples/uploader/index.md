# Uploader

基于 [simple-uploader.js](https://github.com/simple-uploader/Uploader) 库开发的 Vue3 大文件上传器

### 功能

- 大文件分片上传
- 断点续传
- 秒传

## 基本使用

<!-- <demo src="./basic.vue"></demo> -->

### Uploader 属性

| 属性名          | 说明                                                                                                                                                                                                                                                        | 类型            | 可选值     | 默认值               |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ---------- | -------------------- |
| options         | uploader 实例配置项                                                                                                                                                                                                                                         | Object          | —          | {}                   |
| autoUpload      | 文件添加后是否立即上传                                                                                                                                                                                                                                      | Boolean         | true/false | true                 |
| multiple        | 是否支持文件多选                                                                                                                                                                                                                                            | Boolean         | true/false | true                 |
| limit           | 最大上传文件数(0 代表没有限制)                                                                                                                                                                                                                              | Number          | —          | 0                    |
| listHide        | 是否隐藏文件上传列表                                                                                                                                                                                                                                        | Boolean         | true/false | false                |
| accept          | 指定文件上传控件可接受的文件类型                                                                                                                                                                                                                            | String          | —          | ""                   |
| isCheckFileType | 是否检查文件类型 <span title="内部会调用 `checkFileType` 方法，根据 `accept` 属性进行文件后缀名检查，如果上传的文件类型不符合`accept`可接受的文件类型，直接移除文件，并且调用`on-type-error`事件。如果 `accept`为空，不会调用`checkFileType`方法">？</span> | Boolean         | true/false | true                 |
| headers         | 上传文件时额外发送的 HTTP 请求头                                                                                                                                                                                                                            | Object/Function | —          | {}                   |
| requestParams   | 额外的自定义请求参数                                                                                                                                                                                                                                        | Object          | —          | {}                   |
| onFileAdded     | 文件添加到上传队列之前调用,可用于文件校验，返回 false 禁止文件上传,并且从列表中移除当前文件                                                                                                                                                                 | Function        | —          | null                 |
| onFileSuccess   | 单个文件上传成功后触发                                                                                                                                                                                                                                      | Function        | —          | null                 |
| onFileComplete  | 所有文件上传完成后触发                                                                                                                                                                                                                                      | Function        | —          | null                 |
| onFileRemoved   | 特定文件已从上传队列中移除后触发                                                                                                                                                                                                                            | Function        | —          | null                 |
| getInstance     | 返回 `Uploader 实例`                                                                                                                                                                                                                                        | Function        | —          | `(UPLOADER) => ({})` |

### options 属性

### 事件

| 名称              | 说明                       | 类型     |
| ----------------- | -------------------------- | -------- |
| `on-type-error`   | 文件校验错误后触发         | Function |
| `on-exceed-limit` | 文件超出最大上传数量后触发 | Function |
