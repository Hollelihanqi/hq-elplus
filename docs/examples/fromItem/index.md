# BaseMenu 菜单

基于 element-plus：form 表单 二次封装，支持 element-plus 的所有属性

### 功能

- JSON 数据渲染 fromITem

## 基本使用

<demo src="./index.vue"></demo>

## from 支持类型

input select switch radio cascader checkbox
date dateTime inputNumber rate timePicker timeSelect

## formItem 卡槽使用方式

```
slot = true
<template #cascader="scope">
测试卡槽
</template>

```

<demo src="./slot.vue"></demo>

## formItem 总体设置一行布局

```
span = 12
 <yto-form-item
          :span="12"
          clearable
      >

      </yto-form-item>

```

具体参考 https://element-plus.gitee.io/zh-CN/component/layout.html
<demo src="./slot.vue"></demo>

## formItem 设置全局 labelWidth

```
span = 12
 <yto-form-item
         labelWidht="80px"
      >

      </yto-form-item>

```

## formItem 设置 formContent 样式

```
contentWidth 设置class 样式

```

<demo src="./otherStyle.vue"></demo>
