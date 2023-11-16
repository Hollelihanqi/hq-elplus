<!--
 * @Author: weichunpei
 * @Date: 2023-10-20 13:07:20
 * @LastEditors: weichunpei
 * @LastEditTime: 2023-11-16 14:44:38
 * @Description:
-->

# LayoutFrame

用于职能类后台管理项目布局组件(iFrame 模式)。

### 功能

- 支持设置最大页签数量
- 支持插槽

## 基本使用

<demo src="./basic.vue"></demo>

### LayoutFrame 属性

| 属性名   | 说明         | 类型    | 可选值 | 默认值   | 备注 |
| -------- | ------------ | ------- | ------ | -------- | ---- |
| `footer` | 显示底部区域 | boolean | -      | false    |      |
| `max`    | 最大页签数   | number  | -      | undefind |      |

### LayoutFrame 插槽

| 属性名    | 说明             |
| --------- | ---------------- |
| `default` | 内容区域左侧插槽 |
| `header`  | 顶部区域插槽     |
| `footer`  | 底部区域插槽     |

### layoutHeader 样式变量

| 属性名              | 说明                 |
| ------------------- | -------------------- |
| `--layout-frame-bg` | 背景颜色             |
| `--nav-tabs-bg`     | 导航页签背景颜色     |
| `--active-tabs-bg`  | 导航页签激活背景颜色 |
