# FromItems 菜单

基于 element-plus：form表单 二次封装，支持 element-plus 的所有属性

## itemType 支持类型
input  select  switch  radio  cascader checkbox
date   dateTime  inputNumber  rate  timePicker  timeSelect

### 功能

- JSON 数据渲染 fromItems


## 基本使用

<demo src="./index.vue"></demo>


## formItems  卡槽使用方式
```
slot = true
<template #cascader="scope">
测试卡槽
</template>

```
<demo src="./slot.vue"></demo>

## formItems  设置全局labelWidth
```
span = 12
 <yto-form-item :span="12 clearable >   </yto-form-item>  
```
<demo src="./slot.vue"></demo>


## formItems  设置formContent样式
```
contentWidth 设置class 样式
      
```
<demo src="./otherStyle.vue"></demo>
### formItems属性
| 属性名                | 说明                                                                            | 类型      | 可选值     | 默认值                     | 备注  |
|--------------------|-------------------------------------------------------------------------------|---------| ---------- |-------------------------|-----|
| `fromConfig`       | 表单配置项                                                                         | Array   | —          | []                      | _   |
| `span`             | 一列显示多少                                                                        | number  | —          | 12                      | —   |
| `form`             | from绑定数据对象                                                                    | Object  | —          | {}                      | —   |
| `clearable`        | 是否有清空图标                                                                       | Boolean   | —          | true                    | —   |
### fromConfig属性
| 属性名                | 说明        | 类型      | 可选值     | 默认值   | 备注 |
|--------------------|-----------|---------| -------- |-------|--|
| `itemType`       | 表单类型      | string  | —        | input | - |
| `slot`             | 是否需要卡槽    | Boolean | —        | false | — |
| `prop`             | 绑定键值      | string  | —        | —     | — |
| `label`        | 表单label   | string  | —        | -     | — |
| `options`        | 下拉框list数据 | Array   | —        | []    | inputType等于 select radio  cascader checkbox 可用 例：[{label:‘’，value:'''}] |
| `contentWidth`        | 自定义class | string   | —        | _    | -|

