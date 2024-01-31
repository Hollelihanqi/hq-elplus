<template>
  <div id="layout">
    <yto-c-layout-router
      ref="routerRef"
      class="h-full"
      :cacheable="true"
      type="horizontal"
      @tab-change="handleTabChange"
    >
      <template #header>
        <yto-c-layout-header :collapse="collapse" :user-info="userInfo" @collapse="collapse = !collapse">
          <template #extend>123</template>
        </yto-c-layout-header>
      </template>
      <yto-c-layout-menu
        title="圆通党建"
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
    label: "测试123",
    href: "/layout-child-6",
    code: "/layout-child-6",
    icon: "icon iconfont party-web-icon-caidan3",
    // closable: false,
    mode: "router",
  },
  {
    label: "测试12378",
    href: "/layout-child-7",
    code: "/layout-child-7",
    icon: "icon iconfont party-web-icon-caidan3",
    // closable: false,
    mode: "router",
  },
  {
    label: "测试看看看看",
    href: "/layout-child-8",
    code: "/layout-child-8",
    icon: "icon iconfont party-web-icon-caidan3",
    // closable: false,
    mode: "router",
  },
  {
    label: "测试uu看看",
    href: "/layout-child-9",
    code: "/layout-child-9",
    icon: "icon iconfont party-web-icon-caidan3",
    // closable: false,
    mode: "router",
  },
  {
    label: "测试看rty看",
    href: "/layout-child-10",
    code: "/layout-child-10",
    icon: "icon iconfont party-web-icon-caidan3",
    // closable: false,
    mode: "router",
  },
  {
    label: "公告管理公告管理公告管理",
    icon: "icon iconfont party-web-icon-caidan3",
    children: [
      {
        label: "公告列表公告列表公告列表公告列表",
        href: "/layout-child-1?abc=1",
        code: "/layout-child-1",
        // closable: false,
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
        // href: "/layout-child-2",
        // code: "/layout-child-2",
        // mode: "router",

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
  // {
  //   label: "测试数据",
  //   icon: "icon iconfont party-web-icon-caidan3",
  //   children: [
  //     {
  //       label: "测试列表",
  //       href: "/layout-child-3",
  //       code: "/layout-child-3",
  //       mode: "router",
  //     },
  //   ],
  // },
];
// const frist = listNavigation[0].children[0];

// if (route.path === "/") {
//   tabPaneAdd(frist?.href as string, frist as IOptionTabPane);
// }
// tabPaneAdd(
//   `/layout-child-3?iFrameUrl=${encodeURIComponent(
//     "http://action-analysis-tst.ytokj.com/user-access-records"
//   )}` as string,
//   {
//     label: "测试列表3",
//     href: "/layout-child-3",
//     code: "/layout-child-3",
//     mode: "router",
//     closable: false,
//   }
// );
tabPaneAdd(`/layout-child-3?iFrameUrl=http://action-analysis-tst.ytokj.com/user-access-records` as string, {
  label: "测试列表3",
  href: "/layout-child-3",
  code: "/layout-child-3",
  mode: "router",
  closable: false,
});
const handleMenuClick = (info: any) => {
  console.log("handleMenuClick-----");
};
const handleTabChange = (info: any) => {
  const list = unref(routerRef).getTabsList();
  console.log("handleTabChange-----", list);
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
    // --layout-menu-title-bg: #900808;
    // --layout-menu-title-color: #fff;

    --layout-menu-title-color: #fff;
    --layout-menu-text-color: #fff;
    --layout-menu-background: #56297e;
    --layout-menu-active-color: #fff;
    --layout-menu-search-background: #4d2571;
    --layout-menu-active-background: #8942c9;
    --layout-menu-hover-color: #8942c9;
    --layout-menu-border-color: rgba(0, 0, 0, 0.1);
    --layout-menu-active-border-color: #8942c9;
    --layout-menu-active-parent-background: #6d31a3;
    --layout-menu-inline-bg-color: #40195f;
  }
}
:deep(.router-view-containe) {
  background: #fff;
}
</style>
