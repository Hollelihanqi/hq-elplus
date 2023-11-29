<template>
  <div class="tabs-box bg-[#E2E6E8] flex items-end pl-[16px]">
    <div
      v-for="tab in tabsMenuList"
      :key="tab.code"
      class="pl-[16px] pr-[8px] text-[14px] text-[#151719] cursor-pointer flex items-center overflow-ellipsis-line"
      :class="{
        'text-primary bg-white rounded-t-[4px]': tabsMenuValue === tab.code,
      }"
    >
      <span class="py-[8px] mr-[8px] flex-1 overflow-ellipsis-line" @click="tabClick(tab)">{{ tab.label }}</span>
      <el-icon v-if="tab.closable !== false && tabsMenuList.length > 1" class="!text-[#151719]" @click="tabRemove(tab)"
        ><Close
      /></el-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Close } from "@element-plus/icons-vue";
import { EnumSessionKey } from "@/common/EnumConstant";
import { tabPaneClose, tabPaneAdd, toURL, IOptionTabPane } from "gold-core";
import { useRouter } from "vue-router";

interface Props {
  tabsMenuList: IOptionTabPane[];
  keyLabel: string;
  formatTab?: (tabItem: IOptionTabPane) => IOptionTabPane;
}
const props = withDefaults(defineProps<Props>(), {
  keyLabel: "title",
  tabsMenuList: () => {
    return [];
  },
});

const tabsMenuValue: any = inject(EnumSessionKey.TabsActivate);
const router = useRouter();
const route = useRoute();

// Tab Click
const tabClick = (tabItem: IOptionTabPane) => {
  const { href, code } = tabItem;
  tabPaneAdd(href as string, { ...tabItem, href });
};

// Remove Tab
const tabRemove = (tabItem: IOptionTabPane) => tabPaneClose(tabItem.code as string);
watch(
  () => tabsMenuValue.value,
  (value) => {
    if (!value) return;
    const { mode, href } = unref(props.tabsMenuList).find((tab) => tab.code === value) || {};
    if (mode === "router") {
      const url = toURL(href as string);
      router.push(url.pathname + url.search);
    }
  },
  {
    immediate: true,
  }
);
const getUrl = (path: string) => {
  let href = path;
  Object.keys(route.query).forEach((key) => {
    href += href.includes("?") ? `&${key}=${route.query[key]}` : `?${key}=${route.query[key]}`;
  });
  Object.keys(route.params).forEach((key) => {
    href += href.includes("?") ? `&${key}=${route.query[key]}` : `?${key}=${route.query[key]}`;
  });
  return href;
};
const getTabsItem = (path: string): any => {
  const routers = router.getRoutes();
  const curRoute: any = routers.find((item) => item.path === path);
  if (!curRoute) return;
  console.log("watch---route.path-2", route.query);
  const href = getUrl(path);
  const tabItem = {
    code: path,
    href,
    label: curRoute.meta ? curRoute.meta[props.keyLabel] : curRoute.name,
    mode: "router",
  };
  return props.formatTab ? props.formatTab(tabItem) : tabItem;
};
watch(
  () => route.path,
  (newVal) => {
    if (!newVal) return;
    console.log("watch---route.path--1", newVal);
    const url = getUrl(newVal);
    const tabItem: any = unref(props.tabsMenuList).find((tab) => tab.href?.includes(url)) || {};
    console.log("watch---route.path--2", props.tabsMenuList);
    const { href } = tabItem;
    if (tabItem && href) {
      tabPaneAdd(href as string, { ...tabItem });
      return;
    }
    const tabsItem = getTabsItem(newVal);
    tabsItem && tabPaneAdd(tabsItem.href as string, { ...tabsItem });
  },
  {
    immediate: true,
  }
);
provide(EnumSessionKey.TabsActivate, tabsMenuValue);
</script>
<style lang="scss" scoped>
.overflow-ellipsis-line {
  @apply overflow-ellipsis whitespace-nowrap overflow-hidden;
}
</style>
