<template>
  <div id="layout" class="layout h-full">
    <yto-c-layout-frame class="frame" :cacheable="true" type="horizontal">
      <template #header>
        <yto-c-layout-header :collapse="collapse" :user-info="userInfo" @collapse="collapse = !collapse">
          <template #logout>
            <span>退出登录</span>
          </template>
        </yto-c-layout-header>
      </template>
      <yto-c-layout-menu
        title="圆通党建"
        :logo="logo"
        :unique-opened="true"
        :collapse="collapse"
        :menus="listNavigation"
      ></yto-c-layout-menu>
    </yto-c-layout-frame>
  </div>
</template>

<script lang="ts" setup>
import { IOptionTabPane, session, tabPaneAdd } from 'gold-core';
import logo from '@/assets/vue.svg';

const collapse = ref(false);
const userInfo = {
  userCode: '02348618',
  userName: '魏春霈',
};
const listNavigation: any[] = [
  { label: '百度', href: 'https://www.baidu.com', code: 'www.baidu.com', icon: 'icon iconfont party-web-icon-caidan3' },
  {
    label: '测试',
    href: '/demo/list',
    closable: false,
    code: '/demo/list',
    icon: 'icon iconfont party-web-icon-caidan3',
  },
  { label: '必应', href: 'https://cn.bing.com/', code: 'cn.bing.com', icon: 'icon iconfont party-web-icon-caidan3' },
  {
    label: '组件管理',
    icon: 'icon iconfont party-web-icon-caidan3',
    children: [
      { label: '组件配置', href: '/widget/component/list', code: '/widget/component/list' },
      { label: '属性配置', href: '/widget/component-attribute/list', code: '/widget/component-attribute/list' },
      { label: '事件配置', href: '/widget/component-event/list', code: '/widget/component-event/list' },
    ],
  },
];

// const listNavigation: any[] = [
//   {
//     label: "公告管理",
//     // icon: "Setting",
//     children: [
//       {
//         label: "公告列表",
//         href: "/noticeList",
//         closable: false,
//       },
//     ],
//   },
//   {
//     label: "资讯管理",
//     // icon: "icon iconfont party-web-icon-caidan2",
//     children: [
//       {
//         label: "资讯列表",
//         href: "/newsList",
//       },
//     ],
//   },
// ];

const frist = listNavigation[0];

tabPaneAdd(frist?.href as string, frist as IOptionTabPane);
</script>
<style lang="scss">
:root {
  // --el-color-primary: #ef1017;
}

#layout {
  .layout-frame {
    --nav-tabs-text-color: #ef1017;
  }
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
