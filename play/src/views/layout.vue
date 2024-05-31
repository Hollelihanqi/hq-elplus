<template>
  <div id="layout">
    <yto-c-layout ref="routerRef" class="h-full" :cacheable="true" type="horizontal" @tab-change="handleTabChange">
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
        :formatTab="formatTab"
      ></yto-c-layout-menu>
    </yto-c-layout>
  </div>
</template>

<script lang="ts" setup>
// import { IOptionTabPane, session, tabPaneAdd } from "../../../packages/yto-custom/src/gold-core";

import { IOptionTabPane, session, tabPaneAdd } from "gold-core";
import logo from "@/assets/vue.svg";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const collapse = ref(false);
const routerRef = ref();
const userInfo = {
  userCode: "02348618",
  userName: "魏春霈",
};
// 	vertical/horizontal
const listNavigation: any[] = [
  {
    label: "首页",
    href: "/layout-child-3",
    code: "/layout-child-3",
    icon: "icon iconfont party-web-icon-caidan3",
    // closable: false,
    mode: "router",
  },
  {
    label: "Frame模式",
    icon: "icon iconfont party-web-icon-caidan3",
    children: [
      {
        label: "用户活跃度",
        href: "http://192.168.201.37:8003/platform-overview?source=JSC&token=b3d8f88160204af4bbc656c444b16428",
        code: "/platform-overview",
        // closable: false,
        mode: "frame",
      },
      {
        label: "日志监控",
        href: "http://192.168.201.37:8003/log-monitoring?source=JSC&token=b3d8f88160204af4bbc656c444b16428",
        code: "/log-monitoring",
        // closable: false,
        mode: "frame",
      },
    ],
  },
  {
    label: "三级菜单测试",
    icon: "icon iconfont party-web-icon-caidan3",
    children: [
      {
        label: "资讯列表",
        children: [
          {
            label: "资讯详情",
            href: "/layout-child-2",
            code: "/layout-child-2",
            mode: "router",
          },
        ],
      },
    ],
  },
  {
    label: "组件调试",
    icon: "icon iconfont party-web-icon-caidan3",
    children: [
      {
        label: "Chart",
        href: "/chart",
        code: "/chart",
        mode: "router",
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
const formatTab = (info: any) => {
  if(info.mode == 'frame') {
    const tmpArr = info.href.split('token=')
    info.href = `${tmpArr[0]}token=56e322f92cf34c2f89969adf03979479`
  }
  console.log("formatTab-----", info);
  return info
}
const handleMenuClick = (info: any) => {
  console.log("handleMenuClick-----", info);
};
const handleTabChange = (info: any) => {
  const list = unref(routerRef).getTabsList();
  console.log("handleTabChange-----list", list);
  console.log("handleTabChange-----info", info);
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
