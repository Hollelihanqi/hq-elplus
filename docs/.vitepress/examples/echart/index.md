# BaseEchart 菜单

基于 echarts 二次封装，支持 echarts 属性的所有扩展

### 功能

- JSON 数据渲染 Menu

## 基本使用

<demo src="./basic.vue"></demo>

## Attributes

[完整配置请参考-element-plus]('https://element-plus.org/zh-CN/component/menu.html')

### 自定义 Menu 属性

| 属性名  | 说明     | 类型  | 可选值 | 默认值 | 备注            |
| ------- | -------- | ----- | ------ | ------ | --------------- |
| `menus` | 菜单数组 | array | —      | []     | 子节点 children |

### Interface
``` ts
interface MenuProps {
  name: string;
  path?: string;
  icon?: string | undefined;
  children?: [];
  [propName:string]:any;
}
```