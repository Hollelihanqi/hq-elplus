<template>
  <div class="tabs-box bg-[#E2E6E8]">
    <ul class="tabs-menu h-full flex items-end pl-[16px]">
      <li
        v-for="tab in tabsMenuList"
        :key="tab.code"
        class="pl-[16px] pr-[8px] text-[14px] text-[#151719] cursor-pointer flex items-center justify-center"
        :class="{
          'text-primary bg-white rounded-t-[4px]': tabsMenuValue === tab.code,
        }"
      >
        <span class="py-[8px] inline-block h-full mr-[8px]" @click="tabClick(tab)">{{ tab.label }}</span>
        <el-icon class="!text-[#151719]" v-if="tab.closable !== false" @click="tabRemove(tab)"><Close /></el-icon>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
// import { useGlobalStore, useTabsStore } from "@/store";
import { Close } from "@element-plus/icons-vue";
import { EnumSessionKey } from "@/common/EnumConstant";
import { tabPaneClose, tabPaneAdd, toURL, IOptionTabPane } from "@/gold-core";
import { useRouter } from "vue-router";

const props = defineProps({
  tabsMenuList: {
    type: Array,
    default: () => {
      return [];
    },
  },
});

const tabsMenuValue = inject(EnumSessionKey.TabsActivate);
const router = useRouter();

// // 监听路由的变化（防止浏览器后退/前进不变化 tabsMenuValue）
// watch(
//   () => route.path,
//   (newVal) => {
//     if (newVal === "/") return;
//     tabsMenuValue.value = route.path;
//     const tabsParams = {
//       icon: route.meta.icon as string,
//       title: route.meta.title as string,
//       path: route.path,
//       close: !route.meta.isAffix,
//     };
//     tabStore.addTabs(tabsParams);
//   },
//   {
//     immediate: true,
//   }
// );

watch(
  () => tabsMenuValue.value,
  (value) => {
    if (!value) return;
    const { mode, href } = unref(props.tabsMenuList).find((tab) => tab.code === value) || {};
    if (mode === "router") {
      const url = toURL(href);
      router.push(url.pathname + url.search);
    }
  },
  {
    immediate: true,
  }
);
// // Tab Click
const tabClick = (tabItem: IOptionTabPane) => {
  const { href, code } = tabItem;
  console.log("tabClick", href);
  tabPaneAdd(href, { ...tabItem, href });
  // tabsMenuValue.value = code;
};

// // Remove Tab
const tabRemove = (tabItem: IOptionTabPane) => {
  // tabStore.removeTabs(activeTabPath);
  tabPaneClose(tabItem.code);
};

provide(EnumSessionKey.TabsActivate, tabsMenuValue);
</script>
<style lang="scss" scoped>
.tabs-box {
  :deep(.tabs-menu) {
  }
}
</style>
