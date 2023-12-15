<!--
 * @Author: weichunpei
 * @Date: 2023-10-20 13:07:20
 * @LastEditors: error: git config user.name & please set dead value or install git
 * @LastEditTime: 2023-12-14 13:44:10
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

| 属性名         | 说明                | 类型     | 可选值              | 默认值   | 备注                                     |
| -------------- | ------------------- | -------- | ------------------- | -------- | ---------------------------------------- |
| `footer`       | 显示底部区域        | boolean  | -                   | false    |                                          |
| `max`          | 最大页签数          | number   | -                   | undefind |                                          |
| `cacheable`    | 是否开启缓存        | boolean  | -                   | false    |                                          |
| `tabsKeyLabel` | tabslabel 对应 key  | string   | -                   | 'title'  |                                          |
| `formatTab`    | tabsItem 格式化方法 | function | -                   | -        |                                          |
| `showTab`      | 是否显示 tab 页签   | boolean  | -                   | true     |                                          |
| `type`         | 布局方式            | string   | vertical/horizontal | vertical | vertical：上下布局；horizontal：左右布局 |

### LayoutRouter 插槽

| 属性名    | 说明             |
| --------- | ---------------- |
| `default` | 内容区域左侧插槽 |
| `header`  | 顶部区域插槽     |
| `footer`  | 底部区域插槽     |
| `tab`     | tab 页签插槽     |

### LayoutRouter 方法

| 属性名        | 说明                 |
| ------------- | -------------------- |
| `getTabsList` | 获打开 tabs 列表方法 |

### layoutHeader 样式变量

| 属性名                  | 说明                 |
| ----------------------- | -------------------- |
| `--layout-router-bg`    | 背景颜色             |
| `--nav-tabs-bg`         | 导航页签背景颜色     |
| `--nav-tabs-active-bg`  | 导航页签激活背景颜色 |
| `--nav-tabs-text-color` | 导航页签激活文字颜色 |
