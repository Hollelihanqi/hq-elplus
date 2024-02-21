<!--
 * @Author: weichunpei
 * @Date: 2023-10-20 09:30:23
 * @LastEditors: weichunpei
 * @LastEditTime: 2024-02-20 19:55:53
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

| 属性名       | 说明       | 类型             | 可选值 | 默认值  | 备注 |
| ------------ | ---------- | ---------------- | ------ | ------- | ---- |
| `collapse`   | 系统名称   | boolean          | -      | ""      |      |
| `menus`      | 菜单数据   | IOptionTabPane[] | -      | []      |      |
| `width`      | 菜单宽度   | string           | —      | "210px" |      |
| `searchable` | 是否可搜索 | boolean          | —      | true    |      |
| `title`      | 系统名称   | string           | -      | ""      |      |
| `logo`       | 系统 logo  | Img              | —      | -       |      |

### LayoutMenu 样式变量

| 属性名                              | 说明                           |
| ----------------------------------- | ------------------------------ |
| `--layout-menu-background`          | 背景色                         |
| `--layout-menu-text-color`          | 文字颜色                       |
| `--layout-menu-active-background`   | 激活背景色                     |
| `--layout-menu-active-color`        | 激活文字颜色                   |
| `--layout-menu-hover-color`         | 鼠标 hover 颜色                |
| `--layout-menu-search-background`   | 搜索框背景色                   |
| `--layout-menu-border-color`        | 边框默认颜色                   |
| `--layout-menu-active-border-color` | 激活状态下右侧边框颜色         |
| `--layout-menu-title-bg`            | 顶部 title 区域背景颜色        |
| `--layout-menu-title-color`         | 顶部 title 区域文字颜色        |
| `--layout-menu-active-border-color` | 激活状态下二级菜单左侧边框颜色 |
| `--layout-menu-inline-bg-color`     | 子菜单默认背景颜色             |
| `--layout-menu-triangle-color`      | 折叠/展开三角颜色              |

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
  showIcon?: boolean;
}
```

### 紫色配色方案

```json
    --layout-menu-title-color: #fff;
    --layout-menu-text-color: #fff;
    --layout-menu-background: #56297e;
    --layout-menu-active-color: #fff;
    --layout-menu-search-background: #33154b;
    --layout-menu-active-background: #8942c9;
    --layout-menu-hover-color: #8942c9;
    --layout-menu-border-color: rgba(0, 0, 0, 0.1);
    --layout-menu-active-border-color: #8942c9;
    --layout-menu-active-parent-background: #6d31a3;
    --layout-menu-inline-bg-color: #40195f;
    --layout-menu-triangle-color: #a985c9;
```

### 蓝色系配色方案

```json
     --layout-menu-title-color: #fff;
     --layout-menu-text-color: #fff;
     --layout-menu-background: #333f5f;
     --layout-menu-active-color: #fff;
     --layout-menu-search-background: #2a3249;
     --layout-menu-active-background: #4272dd;
     --layout-menu-hover-color: #4272dd;
     --layout-menu-border-color: rgba(0, 0, 0, 0.1);
     --layout-menu-active-border-color: #4272dd;
     --layout-menu-active-parent-background: #334c84;
     --layout-menu-inline-bg-color: #2a3249;
     --layout-menu-triangle-color: #969ca2;
```
