<!--
 * @Author: weichunpei
 * @Date: 2023-10-20 13:07:20
 * @LastEditors: weichunpei
 * @LastEditTime: 2023-10-20 13:25:54
 * @Description:
-->

# LayoutRouter

用于职能类后台管理项目布局组件(路由模式)。

### 功能

- 支持设置最大页签数量
- 支持插槽

## 基本使用

<demo src="./basic.vue"></demo>

```vue
<template>
  <div id="layout">
    <yto-c-layout-router class="router-class">
      <template #header>
        <yto-c-layout-header
          title="圆通党建"
          :collapse="collapse"
          :logo="logo"
          :user-info="userInfo"
          @collapse="collapse = !collapse"
        >
        </yto-c-layout-header>
      </template>
      <yto-c-layout-menu :unique-opened="true" :collapse="collapse" :menus="listNavigation"></yto-c-layout-menu>
    </yto-c-layout-router>
  </div>
</template>

<script lang="ts" setup>
import { IOptionTabPane, tabPaneAdd } from "gold-core";
import logo from "@/assets/vue.svg";
const collapse = ref(false);
const userInfo = {
  userCode: "02348618",
  userName: "魏春霈",
};
const listNavigation: any[] = [
  {
    label: "公告管理",
    icon: "icon iconfont party-web-icon-caidan3",
    children: [
      {
        label: "公告列表",
        href: "/layout-child-1?abc=1",
        code: "/layout-child-1",
        closable: false,
        mode: "router",
      },
    ],
  },
  {
    label: "资讯管理",
    icon: "icon iconfont party-web-icon-caidan3",
    children: [
      {
        label: "资讯列表",
        href: "/layout-child-2",
        code: "/layout-child-2",
        mode: "router",
      },
    ],
  },
];
const frist = listNavigation[0].children[0];
tabPaneAdd(frist?.href as string, frist as IOptionTabPane);
</script>
<style lang="scss">
#layout {
  .layout-header {
    --layout-header-background: #900808;
  }
  .layout-menu {
    --layout-menu-active-color: #ef1017;
    --layout-menu-active-background: rgba(239, 16, 23, 0.1);
  }
  .router-class {
    height: 100%;
  }
}
</style>
```

### LayoutRouter 属性

| 属性名   | 说明         | 类型    | 可选值 | 默认值   | 备注 |
| -------- | ------------ | ------- | ------ | -------- | ---- |
| `footer` | 显示底部区域 | boolean | -      | false    |      |
| `max`    | 最大页签数   | number  | -      | undefind |      |

### LayoutRouter 插槽

| 属性名    | 说明             |
| --------- | ---------------- |
| `default` | 内容区域左侧插槽 |
| `header`  | 顶部区域插槽     |
| `footer`  | 底部区域插槽     |

### layoutHeader 样式变量

| 属性名               | 说明     |
| -------------------- | -------- |
| `--layout-router-bg` | 背景颜色 |
