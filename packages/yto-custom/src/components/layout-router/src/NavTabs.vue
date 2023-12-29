<template>
  <div class="nav-tabs-w tabs-box h-[2.5rem] w-full pt-[.5rem] px-[.625rem]">
    <el-tabs v-model="tabsMenuValue" class="h-full" v-bind="$attrs" type="border-card" @tab-remove="handleTabRemove">
      <template v-for="(item, index) in tabsMenuList" :key="item.href">
        <el-tab-pane
          class="overflow-hidden"
          :closable="isBoolean(item.closable) ? item.closable : tabsMenuList.length === 1 ? false : true"
          :name="item.code"
        >
          <template #label>
            <div :class="`flex ${activePreidx === index ? 'active-pre-tab' : ''}`">
              <span class="h-full flex items-center label">{{ item.label }}</span>
              <span
                v-if="isBoolean(item.closable) ? item.closable : tabsMenuList.length === 1 ? false : true"
                class="w-[1.25rem] h-full"
              ></span>
            </div>
          </template>
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { EnumSessionKey } from "@/common/EnumConstant";
import { tabPaneClose, tabPaneAdd, toURL, IOptionTabPane, isBoolean } from "gold-core";
import { useRouter, RouteLocationNormalized } from "vue-router";

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

const activePreidx = computed(() => {
  const idx = props.tabsMenuList.findIndex((e: IOptionTabPane) => e.code === tabsMenuValue.value);
  return idx > 0 ? idx - 1 : -1;
});
watch(
  () => tabsMenuValue.value,
  (value) => {
    if (!value) return;
    const { mode, href } = unref(props.tabsMenuList).find((tab) => tab.code === value) || {};
    if (mode === "router") {
      const url = toURL(href as string);
      console.log(url.pathname);
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
    closable: curRoute.meta && isBoolean(curRoute.meta.closable) ? curRoute.meta.closable : undefined,
  };
  return props.formatTab ? props.formatTab(tabItem) : tabItem;
};
// router.afterEach((to, from) => {
//   try {
//     const path = to.path;
//     const url = getUrl(path, to);
//     const tabItem: any =
//       unref(props.tabsMenuList).find((tab) => {
//         const urlObj = toURL(tab.href as string);
//         return urlObj.pathname + urlObj.search === url;
//       }) || {};
//     const { href } = tabItem;
//     if (tabItem && href) {
//       tabPaneAdd(href as string, { ...tabItem });
//       return;
//     }
//     const tmpItem = getTabsItem(path, to);
//     tmpItem && tabPaneAdd(tmpItem.href as string, { ...tmpItem });
//   } catch (error) {
//     console.log("layout-router-afterEach-error", error);
//   }
// });
watch(
  () => route.fullPath,
  (newVal) => {
    if (!newVal) return;
    const path = route.path;
    const url = getUrl(path);
    const tabItem: any =
      unref(props.tabsMenuList).find((tab) => {
        const urlObj = toURL(tab.href as string);
        return urlObj.pathname + urlObj.search === url;
      }) || {};
    const { href } = tabItem;
    if (tabItem && href) {
      tabPaneAdd(href as string, { ...tabItem });
      return;
    }
    const tmpItem = getTabsItem(path);
    tmpItem && tabPaneAdd(tmpItem.href as string, { ...tmpItem });
  },
  {
    immediate: true,
  }
);

provide(EnumSessionKey.TabsActivate, tabsMenuValue);
</script>
<style lang="scss" scoped>
.nav-tabs-w {
  --nav-tabs-bg: #f0f1f5;
  --nav-tab-item-divider-color: #b4b9bf;
  --nav-tab-item-bg: #fff;
  --nav-tab-item-font-color: #151719;
  --nav-tab-active-bg: #fff;
  background: var(--nav-tabs-bg);
  :deep(.el-tabs) {
    background: transparent;
    border: none;
    --el-tabs-header-height: 2rem;
  }
  :deep(.el-tabs__header) {
    background: transparent;
    border: none;
  }
  :deep(.el-tabs__item) {
    margin: 0 !important;
    border: none !important;
    background: var(--nav-tab-item-bg);
    padding: 0 !important;
    color: var(--nav-tab-item-font-color);
    & > div {
      height: 100%;
      background: var(--nav-tabs-bg);
      padding-left: 1.25rem;
      padding-right: 1.25rem;
      & > span {
        background: var(--nav-tabs-bg);
      }
    }
    .active-pre-tab {
      border-bottom-right-radius: 0.25rem;
    }
    .el-icon {
      position: absolute;
      right: 1.25rem;
    }
    & > div::before {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      display: block;
      content: "";
      width: 0.0625rem;
      height: 1.25rem;
      background: var(--nav-tab-item-divider-color);
    }
  }
  :deep(.el-tabs__item:first-child) {
    & > div::before {
      display: none;
    }
  }
  :deep(.el-tabs__item.is-active) {
    border-top-right-radius: 0.25rem;
    border-top-left-radius: 0.25rem;
    color: var(--el-color-primary);
    & > div::before {
      display: none;
    }
    & > div {
      border-top-left-radius: 0.25rem;
      border-top-right-radius: 0.25rem;
      background: var(--nav-tab-active-bg);
      & > span {
        background: var(--nav-tab-active-bg);
      }
    }
  }
  :deep(.el-tabs__item.is-active + .el-tabs__item) {
    & > div {
      border-bottom-left-radius: 0.25rem;
    }
    & > div::before {
      display: none;
    }
  }
}
</style>
