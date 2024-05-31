<template>
  <div class="layout-router flex flex-1 overflow-hidden" :class="{ 'flex-col': isVertical }">
    <slot v-if="isVertical" name="header"></slot>
    <slot v-else></slot>
    <div class="flex flex-1 overflow-hidden" :class="isVertical ? 'w-full' : 'flex-col'">
      <slot v-if="isVertical"></slot>
      <slot v-else name="header"></slot>
      <div class="layout-content flex flex-col flex-1 bg-[#F0F1F5] overflow-auto">
        <slot v-if="showTab" name="tab" :tab-data="listRoute">
          <NavTabs
            v-if="showTab"
            :tabs-menu-list="listRoute"
            :key-label="tabsKeyLabel"
            :format-tab="formatTab"
            :router-goback="routerGoback"
            @tab-change="handleTabChange"
          >
            <template #default="{ info }">
              <iframe
                v-if="info.mode == LAYOUT_MODE.Frame"
                :id="info.code"
                scrolling="auto"
                allowfullscreen="true"
                frameborder="0"
                class="w-full h-full"
                :name="info.code"
                :src="info.href"
              ></iframe>
            </template>
          </NavTabs>
        </slot>
        <div
          v-show="activeItem?.mode === LAYOUT_MODE.Router"
          class="router-view-container flex-1 px-[10px] pb-[10px] overflow-auto w-full"
        >
          <router-view v-slot="{ Component, route }">
            <keep-alive>
              <component
                :is="Component"
                v-if="route.meta && route.meta.keepAlive"
                :key="route.meta.usePathKey ? route.fullPath : undefined"
              />
            </keep-alive>
            <component
              :is="Component"
              v-if="!(route.meta && route.meta.keepAlive)"
              :key="route.meta.usePathKey ? route.fullPath : undefined"
            />
          </router-view>
        </div>
      </div>
    </div>
    <slot v-if="footer" name="footer"></slot>
  </div>
</template>
<script lang="ts" setup name="Layout">
import { provide } from "vue";
import { useFrame } from "gold-core";
import { EnumSessionKey, LAYOUT_MODE } from "@/common/EnumConstant";
import NavTabs from "./NavTabs.vue";

const props = defineProps({
  footer: Boolean,
  cacheable: Boolean,
  sso: Boolean,
  max: Number,
  tabsKeyLabel: String,
  formatTab: Function,
  routerGoback: Boolean,
  type: {
    type: String,
    default: "vertical",
  },
  showTab: {
    type: Boolean,
    default: true,
  },
});

const { listRoute, activate } = useFrame({
  cacheable: props.cacheable as boolean,
  sso: props.sso as boolean,
  max: props.max as number,
});
const activeItem = computed(() => listRoute.value.find((item) => item.code === unref(activate)));
// 是否为垂直布局
const isVertical = computed(() => props.type === "vertical");
const emit = defineEmits(["tab-change"]);
const handleTabChange = (tab: any) => emit("tab-change", tab);
const getTabsList = () => listRoute;
provide(EnumSessionKey.TabsActivate, activate);
defineExpose({ getTabsList });
</script>

<style scoped lang="scss">
.layout-router {
  --layout-router-bg: white;
  --nav-tabs-bg: #e2e6e8;
  --nav-tabs-active-bg: white;
  --nav-tabs-text-color: #151719;
}
</style>
