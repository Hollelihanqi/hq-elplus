<template>
  <div id="layout">
    <yto-c-layout-router
      ref="routerRef"
      class="h-full"
      :cacheable="true"
      :router-goback="true"
      type="horizontal"
      @tab-change="handleTabChange"
    >
      <template #header>
        <yto-c-layout-header :collapse="collapse" :user-info="userInfo" @collapse="collapse = !collapse">
          <template #extend>123</template>
        </yto-c-layout-header>
      </template>
      <yto-c-layout-menu
        title="测试项目"
        :logo="logo"
        :collapse="collapse"
        :unique-opened="true"
        :menus="listNavigation"
        width="220px"
        @menu-click="handleMenuClick"
      ></yto-c-layout-menu>
    </yto-c-layout-router>
  </div>
</template>

<script lang="ts" setup>
// import { IOptionTabPane, session, tabPaneAdd } from "../../../packages/yto-custom/src/gold-core";

import { IOptionTabPane, session, tabPaneAdd } from 'gold-core';
import logo from '@/assets/vue.svg';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const collapse = ref(false);
const routerRef = ref();
const userInfo = {
  userCode: '02348618',
  userName: '魏春霈',
};
// 	vertical/horizontal
const listNavigation: any[] = [
  {
    label: '首页',
    href: '/layout-child-3',
    code: '/layout-child-3',
    icon: 'icon iconfont party-web-icon-caidan3',
    // closable: false,
    mode: 'router',
  },
  {
    label: 'layoutmenu名称超长测试',
    icon: 'icon iconfont party-web-icon-caidan3',
    children: [
      {
        label: '公告列表公告列表公告列表公告列表',
        href: '/layout-child-1?abc=1',
        code: '/layout-child-1',
        // closable: false,
        mode: 'router',
      },
    ],
  },
  {
    label: '三级菜单测试',
    icon: 'icon iconfont party-web-icon-caidan3',
    children: [
      {
        label: '资讯列表',
        children: [
          {
            label: '资讯详情',
            href: '/layout-child-2',
            code: '/layout-child-2',
            mode: 'router',
          },
        ],
      },
    ],
  },
  {
    label: '组件调试',
    icon: 'icon iconfont party-web-icon-caidan3',
    children: [
      {
        label: 'Form',
        href: '/form',
        code: '/form',
        mode: 'router',
      },
      {
        label: 'Chart',
        href: '/chart',
        code: '/chart',
        mode: 'router',
      },
      {
        label: 'Table',
        href: '/table',
        code: '/table',
        mode: 'router',
      },
      {
        label: 'StaffSearch',
        href: '/staffSearch',
        code: '/staffSearch',
        mode: 'router',
      },
      {
        label: 'Dialog',
        href: '/dialog',
        code: '/dialog',
        mode: 'router',
      },
      {
        label: 'Dialog2',
        href: '/dialog2',
        code: '/dialog2',
        mode: 'router',
      },
      {
        label: 'UserSearch',
        href: '/userSearch',
        code: '/userSearch',
        mode: 'router',
      },
      {
        label: 'Uploader',
        href: '/uploaderf',
        code: '/uploaderf',
        mode: 'router',
      },
      {
        label: 'LayoutFrom',
        href: '/layoutFrom',
        code: '/layoutFrom',
        mode: 'router',
      },
      {
        label: 'Theme',
        href: '/theme',
        code: '/theme',
        mode: 'router',
      },
      {
        label: 'CustomFieldContainer',
        href: '/customFieldContainer',
        code: '/customFieldContainer',
        mode: 'router',
      },
      {
        label: 'CustomFieldDemo',
        href: '/customFieldConfig',
        code: '/customFieldConfig',
        mode: 'router',
      },
      {
        label: 'SearchContainer',
        href: '/searchContainer',
        code: '/searchContainer',
        mode: 'router',
      },
      {
        label: 'AdaptionContainer',
        href: '/adaptionContainer',
        code: '/adaptionContainer',
        mode: 'router',
      },
      {
        label: 'EllipsisTag',
        href: '/ellipsisTag',
        code: '/ellipsisTag',
        mode: 'router',
      },
      {
        label: 'SearchFormItemContainer',
        href: '/searchFormItemContainer',
        code: '/searchFormItemContainer',
        mode: 'router',
      },
      {
        label: 'tableSearch',
        href: '/tableSearch',
        code: '/tableSearch',
        mode: 'router',
      },
      {
        label: 'TareaTag',
        href: '/tareaTag',
        code: '/tareaTag',
        mode: 'router',
      },
      {
        label: 'CusRadio',
        href: '/cusRadio',
        code: '/cusRadio',
        mode: 'router',
      },
      {
        label: 'selectRemote',
        href: '/selectRemote',
        code: '/selectRemote',
        mode: 'router',
      },
      {
        label: 'TimeLine',
        href: '/TimeLine',
        code: '/TimeLine',
        mode: 'router',
      },
    ],
  },
];
// const frist = listNavigation[0].children[0];

// if (route.path === "/") {
//   tabPaneAdd(frist?.href as string, frist as IOptionTabPane);
// }

// tabPaneAdd(`/layout-child-3?iFrameUrl=http://action-analysis-tst.ytokj.com/user-access-records` as string, {
//   label: "测试列表3",
//   href: "/layout-child-3",
//   code: "/layout-child-3",
//   mode: "router",
//   closable: false,
// });
const handleMenuClick = (info: any) => {
  console.log('handleMenuClick-----');
};
const handleTabChange = (info: any) => {
  const list = unref(routerRef).getTabsList();
  console.log('handleTabChange-----', list);
};
onMounted(() => {
  // router.push({ name: "layoutChild3" });
});
</script>
<style lang="scss">
#layout {
  .nav-tabs-w {
    // --nav-tab-item-divider-color: #b4b9bf;
    // --nav-tab-item-bg: yellow;
    // --nav-tab-item-font-color: #151719;
    // --nav-tab-active-bg: green;
  }
  .layout-header {
    --layout-header-background: #fff;
    // --layout-header-left-width: 220px;
    --layout-header-text-color: #000;
  }
  .layout-menu {
    //紫色系配色方案
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
    //蓝色系配色方案
    // --layout-menu-title-color: #fff;
    // --layout-menu-text-color: #fff;
    // --layout-menu-background: #333f5f;
    // --layout-menu-active-color: #fff;
    // --layout-menu-search-background: #2a3249;
    // --layout-menu-active-background: #4272dd;
    // --layout-menu-hover-color: #4272dd;
    // --layout-menu-border-color: rgba(0, 0, 0, 0.1);
    // --layout-menu-active-border-color: #4272dd;
    // --layout-menu-active-parent-background: #334c84;
    // --layout-menu-inline-bg-color: #2a3249;
    // --layout-menu-triangle-color: #969ca2;
  }
}
:deep(.router-view-containe) {
  background: #fff;
}
</style>
