<template>
  <div class="layout-frame flex flex-col flex-1 overflow-hidden">
    <slot name="header"></slot>
    <div class="flex flex-1 overflow-hidden">
      <slot></slot>
      <el-tabs
        class="flex flex-col flex-1 bg-white overflow-hidden"
        type="border-card"
        v-model="activate"
        @tab-remove="tabPaneClose"
      >
        <template v-for="{ href, code, label, closable } in listRoute">
          <el-tab-pane
            class="flex-1 bg-white p-4 overflow-hidden"
            :closable="isBoolean(closable) ? closable : true"
            :label="label"
            :name="code"
          >
            <iframe
              scrolling="auto"
              allowfullscreen="true"
              frameborder="0"
              class="w-full h-full"
              :id="code"
              :name="code"
              :src="href"
            ></iframe>
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
    <slot name="footer" v-if="footer"></slot>
  </div>
</template>
<script lang="ts" setup name="LayoutFrame">
import { provide } from "vue";
import { useFrame, tabPaneClose, isBoolean } from "gold-core";
import { EnumSessionKey } from "@/common/EnumConstant";

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
.layout-frame {
  --layout-frame-bg: white;
  :deep(.el-tabs) {
    @apply border-none;
    .el-tabs__header {
      background-color: var(--layout-frame-bg);
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
