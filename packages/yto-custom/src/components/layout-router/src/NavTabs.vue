<template>
  <div class="tabs-box">
    <el-tabs
      v-model="tabsMenuValue"
      v-bind="$attrs"
      class="bg-[#E2E6E8] overflow-hidden"
      type="border-card"
      @tab-remove="handleTabRemove"
    >
      <template v-for="{ href, code, label, closable } in tabsMenuList" :key="href">
        <el-tab-pane
          class="flex-1 bg-[#f0f1f5] px-[10px] pb-[10px] overflow-hidden"
          :closable="isBoolean(closable) ? closable : tabsMenuList.length === 1 ? false : true"
          :label="label"
          :name="code"
        />
      </template>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { EnumSessionKey } from "@/common/EnumConstant";
import { tabPaneClose, tabPaneAdd, toURL, IOptionTabPane, isBoolean } from "gold-core";
import { useRouter } from "vue-router";

interface Props {
  tabsMenuList: IOptionTabPane[];
  keyLabel: string;
  formatTab?: Function;
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
const handleTabRemove = (code: any) => {
  tabPaneClose(code);
  // router.go(-1);
};
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
  const buildUrl = (obj: any) =>
    Object.keys(obj).forEach((key) => {
      href += href.includes("?") ? `&${key}=${obj[key]}` : `?${key}=${obj[key]}`;
    });
  buildUrl(Object.assign({}, route.params, route.query));
  return href;
};

const getTabsItem = (path: string): any => {
  const routers = router.getRoutes();
  const curRoute: any = routers.find((item) => item.path === path);
  if (!curRoute) return;
  const href = getUrl(path);
  const tabItem = {
    code: path,
    href,
    label: curRoute.meta ? curRoute.meta[props.keyLabel] : curRoute.name,
    mode: "router",
    closable: curRoute.meta ? curRoute.meta.closable !== false : true,
  };
  return props.formatTab ? props.formatTab(tabItem) : tabItem;
};
watch(
  () => route.path,
  (newVal) => {
    if (!newVal) return;
    const url = getUrl(newVal);
    const tabItem: any = unref(props.tabsMenuList).find((tab) => tab.href?.includes(url)) || {};
    const { href } = tabItem;
    if (tabItem && href) {
      tabPaneAdd(href as string, { ...tabItem });
      return;
    }
    const tmpItem = getTabsItem(newVal);
    tmpItem && tabPaneAdd(tmpItem.href as string, { ...tmpItem });
  },
  {
    immediate: true,
  }
);

provide(EnumSessionKey.TabsActivate, tabsMenuValue);
</script>
<style lang="scss" scoped>
.tabs-box {
  :deep(.el-tabs) {
    --el-tabs-header-height: 31px;
    @apply border-none;
    .el-tabs__header {
      @apply px-[10px] pt-[10px];

      background-color: var(--nav-tabs-bg);
      .el-tabs__item {
        @apply rounded-t-[4px]  border-none text-[#151719];
        &.is-active {
          color: var(--nav-tabs-text-color);
          .is-icon-close {
            color: #151719;
            &:hover {
              color: white;
            }
          }
        }

        &.is-active {
          background-color: var(nav-tabs-active-bg);
        }
        &:nth-child(2):not(.is-active).is-closable:hover {
          @apply pl-[20px];
        }
      }
      .el-tabs__nav-prev,
      .el-tabs__nav-next {
        height: var(--el-tabs-header-height);
        line-height: var(--el-tabs-header-height);
      }
    }

    .el-tabs__content {
      display: none;
    }
  }
}
</style>
