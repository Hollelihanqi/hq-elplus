<template>
  <div id="layout">
    <yto-c-layout-router :cacheable="true" type="vertical" @tab-change="handleTabChange">
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
      <yto-c-layout-menu
        :collapse="collapse"
        :unique-opened="true"
        :menus="listNavigation"
        width="220px"
        @menuClick="handleMenuClick"
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
const userInfo = {
  userCode: "02348618",
  userName: "魏春霈",
};

const listNavigation: any[] = [
  {
    label: "首页",
    href: "/layout-child-3",
    code: "/layout-child-3",
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

        showIcon: false,
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
  console.log("handleTabChange-----", info);
};
onMounted(() => {
  // router.push({ name: "layoutChild3" });
});
</script>
<style lang="scss">
#layout {
  .layout-router {
    --nav-tabs-text-color: #ef1017;
    @apply h-full;
  }
  .layout-header {
    --layout-header-background: #900808;
    --layout-header-left-width: 220px;
  }
  .layout-menu {
    --layout-menu-active-color: #ef1017;
    --layout-menu-active-background: rgba(239, 16, 23, 0.1);
  }
}
</style>
