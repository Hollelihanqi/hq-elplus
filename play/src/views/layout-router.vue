<template>
  <div id="layout">
    <yto-c-layout-router class="frame">
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
import { IOptionTabPane, session, tabPaneAdd } from "../../../packages/yto-custom/src/gold-core";
import logo from "@/assets/vue.svg";
import { useRouter } from "vue-router";
const router = useRouter();
const collapse = ref(false);
const userInfo = {
  userCode: "02348618",
  userName: "魏春霈",
};

// const listNavigation: any[] = [
//   {
//     label: "公告管理",
//     // icon: "Setting",
//     children: [
//       {
//         label: "公告列表",
//         href: "/layout-router/child-1?abc=1",
//         code: "/layout-child-1",
//         closable: false,
//         mode: "router",
//       },
//     ],
//   },
//   {
//     label: "资讯管理",
//     // icon: "icon iconfont party-web-icon-caidan2",
//     children: [
//       {
//         label: "资讯列表",
//         href: "/layout-router/child-2",
//         code: "/layout-child-2",
//         mode: "router",
//       },
//     ],
//   },
// ];
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
  .frame {
    height: 100%;
  }
}
</style>
