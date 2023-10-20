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
        <el-icon
          v-if="tab.closable !== false && tabsMenuList.length > 1"
          class="!text-[#151719]"
          @click="tabRemove(tab)"
          ><Close
        /></el-icon>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { Close } from "@element-plus/icons-vue";
import { EnumSessionKey } from "@/common/EnumConstant";
import { tabPaneClose, tabPaneAdd, toURL, IOptionTabPane } from "gold-core";
import { useRouter } from "vue-router";

interface Props {
  tabsMenuList: IOptionTabPane[];
}
const props = withDefaults(defineProps<Props>(), {
  tabsMenuList: () => {
    return [];
  },
});

const tabsMenuValue: any = inject(EnumSessionKey.TabsActivate);
const router = useRouter();

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
// Tab Click
const tabClick = (tabItem: IOptionTabPane) => {
  const { href, code } = tabItem;
  console.log("tabClick", href);
  tabPaneAdd(href as string, { ...tabItem, href });
};

// Remove Tab
const tabRemove = (tabItem: IOptionTabPane) => tabPaneClose(tabItem.code as string);

provide(EnumSessionKey.TabsActivate, tabsMenuValue);
</script>
<style lang="scss" scoped>
.tabs-box {
  :deep(.tabs-menu) {
  }
}
</style>
