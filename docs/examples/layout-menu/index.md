<!--
 * @Author: weichunpei
 * @Date: 2023-10-20 09:30:23
 * @LastEditors: weichunpei
 * @LastEditTime: 2023-10-20 11:10:11
 * @Description: layoutHeader 组件
-->

# LayoutMenu

用于职能类后台管理项目布局的左侧导航菜单组件。

### 功能

- 支持设置 IconFont
- 支持折叠
- 支持 ElMenu 的所有配置

## 基本使用

<demo src="./basic.vue"></demo>

### LayoutMenu 属性

| 属性名     | 说明     | 类型             | 可选值 | 默认值 | 备注 |
| ---------- | -------- | ---------------- | ------ | ------ | ---- |
| `collapse` | 系统名称 | boolean          | -      | ""     |      |
| `menus`    | 菜单数据 | IOptionTabPane[] | -      | []     |      |
| `width`    | 菜单宽度 | Img              | —      | -      |      |

### Interface

```ts
interface IOptionTabPane {
  code?: string;
  target?: string;
  mode?: string;
  closable?: boolean;
  refresh?: boolean;
  label: string;
  href?: string;
  children?: IOptionTabPane[];
}
```
