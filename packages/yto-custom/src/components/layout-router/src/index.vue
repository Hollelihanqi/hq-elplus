<template>
  <div class="layout-router flex flex-col flex-1 overflow-hidden">
    <slot name="header"></slot>
    <div class="flex flex-1 overflow-hidden w-full">
      <slot></slot>
      <div class="layout-content flex flex-col flex-1 bg-[#F0F1F5] overflow-auto">
        <NavTabs
          class="h-[40px] w-full"
          :tabs-menu-list="listRoute"
          :key-label="tabsKeyLabel"
          :format-tab="formatTab"
        ></NavTabs>
        <div class="router-view flex-1 px-[10px] pb-[10px] overflow-auto w-full">
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
<script lang="ts" setup name="LayoutRouter">
import { provide } from "vue";
import { useFrame } from "gold-core";
import { EnumSessionKey } from "@/common/EnumConstant";
import NavTabs from "./NavTabs.vue";

const props = defineProps({
  footer: Boolean,
  cacheable: Boolean,
  sso: Boolean,
  max: Number,
  tabsKeyLabel: String,
  formatTab: Function,
});

const { listRoute, activate } = useFrame({
  cacheable: props.cacheable as boolean,
  sso: props.sso as boolean,
  max: props.max as number,
});

provide(EnumSessionKey.TabsActivate, activate);
</script>

<style scoped lang="scss">
.layout-router {
  --layout-router-bg: white;
  --nav-tabs-bg: #e2e6e8;
  --nav-tabs-active-bg: white;
  --nav-tabs-text-color: #151719;
}
</style>
