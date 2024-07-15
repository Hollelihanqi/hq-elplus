<template>
  <div
    class="nav-tabs-w tabs-box w-full pt-[8px]"
    :class="activeItem?.mode === LAYOUT_MODE.Router ? 'nav-tabs-router' : 'nav-tabs-frame'"
  >
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
                class="w-[20px] h-full"
              ></span>
            </div>
          </template>
          <slot :info="item"></slot>
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { EnumSessionKey, LAYOUT_MODE } from "@/common/EnumConstant";
import { tabPaneClose, tabPaneAdd, toURL, IOptionTabPane, isBoolean } from "gold-core";
import { useRouter, RouteLocationNormalized } from "vue-router";
import { logger } from "@/_utils";

interface Props {
  tabsMenuList: IOptionTabPane[];
  keyLabel: string;
  formatTab?: Function;
  routerGoback: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  keyLabel: "title",
  routerGoback: false,
  tabsMenuList: () => {
    return [];
  },
});

const tabsMenuValue: any = inject(EnumSessionKey.TabsActivate);
const activeItem = computed(
  () => props.tabsMenuList.find((item) => item.code === unref(tabsMenuValue)) as IOptionTabPane
);
const router = useRouter();
const route = useRoute();
const handleTabRemove = (closeCode: any) => {
  tabPaneClose(closeCode);
  //只有关闭当前激活的页签，才需要执行此逻辑
  logger("handleTabRemove-1", closeCode, unref(tabsMenuValue), props.routerGoback);
  if (props.routerGoback && closeCode === unref(tabsMenuValue)) {
    const backItem = props.tabsMenuList.find((item: any) => item.back) as IOptionTabPane;
    logger("handleTabRemove", closeCode, props.tabsMenuList, backItem);
    if (!backItem) return;
    setTimeout(() => {
      const { href, mode, code } = backItem;
      const url = toURL(href as string);
      if (mode === LAYOUT_MODE.Router) {
        router.push(url.pathname + url.search);
      } else {
        router.push(buildCodePath(code));
      }
    }, 0);
  }
};

const activePreidx = computed(() => {
  const idx = props.tabsMenuList.findIndex((e: IOptionTabPane) => e.code === tabsMenuValue.value);
  return idx > 0 ? idx - 1 : -1;
});
const buildCodePath = (code?: string) => (code?.startsWith("/") ? code : `/${code}`);
const findActiveTabItem = (path: string) => {
  return props.tabsMenuList.find((item: IOptionTabPane) => buildCodePath(item.code) === path) as IOptionTabPane;
};
watch(
  () => tabsMenuValue.value,
  (value) => {
    if (!value) return;
    const { mode, href, code } = unref(props.tabsMenuList).find((tab: any) => tab.code === value) || {};
    logger("watch--tabsMenuValue.value", href);
    const url = toURL(href as string);
    if (mode === LAYOUT_MODE.Router) {
      router.push(url.pathname + url.search);
    } else {
      // router.push("/iframe");
      router.push(buildCodePath(code));
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
  const curRoute = routers.find((item) => item.path === path);
  if (!curRoute) return;
  const href = getUrl(path);
  const tabItem = {
    code: path,
    href,
    label: curRoute.meta ? curRoute.meta[props.keyLabel] : curRoute.name,
    mode: LAYOUT_MODE.Router,
    closable: curRoute.meta && isBoolean(curRoute.meta.closable) ? curRoute.meta.closable : undefined,
  };
  return props.formatTab ? props.formatTab(tabItem) : tabItem;
};
const routerPathChange = () => {
  const path = route.path;
  const url = getUrl(path);
  const tabItem = unref(props.tabsMenuList).find((tab: any) => {
    const urlObj = toURL(tab.href as string);
    return urlObj.pathname + urlObj.search === url;
  }) as IOptionTabPane;
  const { href } = tabItem || {};
  if (tabItem && href) {
    tabPaneAdd(href as string, { ...tabItem });
    return;
  }
  const tmpItem = getTabsItem(path);
  tmpItem && tabPaneAdd(tmpItem.href as string, { ...tmpItem });
};
const framePathChange = (activeItem: IOptionTabPane) => {
  logger("framePathChange", activeItem);
  activeItem.href && tabPaneAdd(activeItem.href, { ...activeItem });
};

watch(
  () => route.fullPath,
  (newVal, oldVal) => {
    if (!newVal) return;
    const activeItem = findActiveTabItem(route.path);
    logger("watch--route.fullPath", newVal, oldVal, activeItem?.mode);
    activeItem?.mode === LAYOUT_MODE.Frame ? framePathChange(activeItem) : routerPathChange();
    //记录path切换时的current/back标记
    props.routerGoback &&
      props.tabsMenuList.forEach((item: any) => {
        item.current = newVal && item.href && toURL(item.href).pathname === newVal.split("?")[0];
        item.back = oldVal && item.href && toURL(item.href).pathname === oldVal.split("?")[0];
      });
  },
  {
    immediate: true,
  }
);

provide(EnumSessionKey.TabsActivate, tabsMenuValue);
</script>
<style lang="scss" scoped>
.nav-tabs-router {
  @apply h-[40px];
  :deep(.el-tabs__content) {
    @apply hidden;
  }
}
.nav-tabs-frame {
  @apply h-full pb-[10px];
  :deep(.el-tabs__content) {
    @apply p-0 flex-1 h-0;
    .el-tab-pane {
      @apply h-full;
    }
  }
}
.nav-tabs-w {
  // --nav-tabs-bg: #e2e6e8;
  --nav-tab-item-divider-color: #b4b9bf;
  --nav-tab-item-bg: #fff;
  background: var(--nav-tabs-bg);
  @apply px-[10px];
  :deep(.el-tabs) {
    @apply flex flex-col;
    background: transparent;
    border: none;
    --el-tabs-header-height: 32px;
    .el-tabs__nav-wrap {
      .el-tabs__nav-prev,
      .el-tabs__nav-next {
        @apply leading-[var(--el-tabs-header-height)];
      }
    }
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

    & > div {
      height: 100%;
      background: var(--nav-tabs-bg);
      padding-left: 20px;
      padding-right: 20px;
      & > span {
        background: var(--nav-tabs-bg);
        color: var(--nav-tabs-text-color);
      }
    }
    .active-pre-tab {
      border-bottom-right-radius: 4px;
    }
    .el-icon.is-icon-close {
      position: absolute;
      right: 20px;
      color: var(--nav-tabs-text-color);
    }
    & > div::before {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      display: block;
      content: "";
      width: 1px;
      height: 20px;
      background: var(--nav-tab-item-divider-color);
    }
  }
  :deep(.el-tabs__item:first-child) {
    & > div::before {
      display: none;
    }
  }
  :deep(.el-tabs__item.is-active) {
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    color: var(--el-color-primary);
    & > div::before {
      display: none;
    }
    & > div {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      background: var(--nav-tabs-active-bg);
      & > span {
        background: var(--nav-tabs-active-bg);
        color: var(--el-color-primary);
      }
    }
  }
  :deep(.el-tabs__item.is-active + .el-tabs__item) {
    & > div {
      border-bottom-left-radius: 4px;
    }
    & > div::before {
      display: none;
    }
  }
}
</style>
