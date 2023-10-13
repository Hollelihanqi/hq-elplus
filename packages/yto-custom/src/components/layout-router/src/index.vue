<template>
  <div class="layout-router flex flex-col flex-1 overflow-hidden">
    <slot name="header"></slot>
    <div class="flex flex-1 overflow-hidden">
      <slot></slot>
      <div class="w-full flex flex-col flex-1 bg-[#F0F1F5]">
        <NavTabs class="h-[40px]" :tabsMenuList="listRoute"></NavTabs>
        <div class="flex-1 px-[10px] pb-[10px]">
          <router-view v-slot="{ Component, route }">
            <keep-alive>
              <component
                v-if="route.meta && route.meta.keepAlive"
                :is="Component"
                :key="route.meta.usePathKey ? route.fullPath : undefined"
              />
            </keep-alive>
            <component
              v-if="!(route.meta && route.meta.keepAlive)"
              :is="Component"
              :key="route.meta.usePathKey ? route.fullPath : undefined"
            />
          </router-view>
        </div>
      </div>
    </div>
    <slot name="footer" v-if="footer"></slot>
  </div>
</template>
<script lang="ts" setup name="LayoutRouter">
import { provide } from "vue";
import { useFrame, tabPaneClose, isBoolean } from "gold-core";
import { EnumSessionKey } from "@/common/EnumConstant";
import NavTabs from "./NavTabs.vue";

const props = defineProps({
  footer: Boolean,
  cacheable: Boolean,
  sso: Boolean,
  max: Number,
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
  :deep(.el-tabs) {
    @apply border-none;
    .el-tabs__header {
      background-color: var(--layout-router-bg);
    }

    .el-tabs__content {
      display: flex;
      padding: 0.5rem;
      flex: 1 1 0%;
      overflow: hidden;
    }

    .el-tabs__content,
    > .el-tabs__header .el-tabs__item.is-active {
      background-color: rgb(241 245 249);
    }
  }
}
</style>
