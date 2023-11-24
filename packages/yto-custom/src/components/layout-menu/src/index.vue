<template>
  <div class="layout-menu flex flex-col bg-slate-100 overflow-auto">
    <el-menu v-bind="$attrs" class="layout-menu-v flex-1 overflow-auto" :collapse="collapse" :default-active="activate">
      <div v-if="!collapse" class="layout-menu-search w-full bg-[#fff] p-[12px] box-border">
        <el-input v-model="searchVal" placeholder="菜单查询" />
      </div>
      <template v-for="(item, index) in menuData" :key="index">
        <el-sub-menu v-if="isArray(item.children)" :index="getLabel(item)">
          <template #title>
            <slot name="label" v-bind="item">
              <inner-node-menu :data="item"></inner-node-menu>
            </slot>
          </template>
          <template v-for="(itemSub, indexSub) in item.children" :key="`${index}-${indexSub}`">
            <el-menu-item :index="itemSub.code" @click="menuClick(itemSub)">
              <slot name="label" v-bind="itemSub">
                <inner-node-menu :data="itemSub" :show-icon="false"></inner-node-menu>
              </slot>
            </el-menu-item>
          </template>
        </el-sub-menu>
        <el-menu-item v-else :index="item.code" @click="menuClick(item)">
          <slot name="label" v-bind="item">
            <inner-node-menu :data="item"></inner-node-menu>
          </slot>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script lang="ts" setup name="LayoutMenu">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMenu } from "@/composable/menu";
import { isArray, toURL } from "gold-core";
import InnerNodeMenu from "./NodeMenu.vue";

const props = defineProps({
  keyLabel: String,
  keyIcon: String,
  keyHref: String,
  keySession: String,
  collapse: Boolean,
  menus: Array,
  width: { type: String, default: "210px" },
});
const router = useRouter();
// 菜单过滤
const searchVal = ref("");
const fileNavMenu = (arr: any) => {
  return arr.filter((e: any) => {
    if (e.label.includes(searchVal.value)) {
      return e;
    } else if (e.children) {
      e.children = fileNavMenu(e.children);
      if (e.children.length > 0) {
        return e;
      }
    }
  });
};
const menuClick = (item: any) => {
  const { href, code } = item;
  paneAdd(item);
  // activate.value = code;
};
const menuData = computed(() => {
  const tmpData = JSON.parse(JSON.stringify(data));
  return searchVal.value ? fileNavMenu(tmpData) : tmpData;
});

const { paneAdd, getHref, getLabel, data, activate } = useMenu(props);
</script>

<style lang="scss">
:root {
  --el-menu-base-level-padding: 24px;
  --el-menu-level-padding: 24px;
}
</style>
<style lang="scss" scoped>
.layout-menu {
  --layout-menu-background: rgb(255, 255, 255);
  --layout-menu-color: rgb(84, 91, 231);
  --layout-menu-active-background: rgba(44, 60, 216, 0.1);
  --layout-menu-active-color: #2c3cd8;
  --layout-sub-menu-box-shadow: inset 0px -1px 0px 0px rgba(0, 0, 0, 0.1);
  --layout-menu-hover-color: #e6e6e6;

  :deep(.el-menu) {
    @apply bg-[var(--layout-menu-background)] border-none;
    .layout-menu-search {
      :deep(.el-input) {
        .el-input__wrapper {
          box-shadow: none;
          border: 1px solid #ddd;
          background: #f0f1f5;
          .el-input__inner {
            color: #151719;
          }
        }
      }
    }
    &:not(.el-menu--collapse) {
      width: v-bind("props.width");
    }
    .el-sub-menu {
      @apply bg-[var(--layout-menu-background)];
      box-shadow: var(--layout-sub-menu-box-shadow);

      &.is-active {
        @apply bg-[var(--layout-menu-background)];
        .el-sub-menu__title {
          @apply border-color-[#e5e7eb];
        }
      }

      .el-sub-menu__title {
        @apply text-[#000] opacity-80 border-b;
        &:hover {
          @apply bg-[var(--layout-menu-hover-color)];
        }
        .el-icon {
          @apply mr-[8px] ml-[-8px];
        }
      }
    }

    .el-menu-item {
      @apply h-[40px] bg-[var(--layout-menu-background)] leading-[40px] text-white opacity-80 text-[#000] border-b;
      .el-icon {
        @apply mr-[8px] ml-[-8px];
      }
      &:hover {
        @apply bg-[var(--layout-menu-hover-color)];
      }
      &.is-active {
        color: var(--layout-menu-active-color);
        background: var(--layout-menu-active-background);
        border-right: 3px solid;
      }
      &.is-active:hover {
        color: var(--layout-menu-active-color);
        background: var(--layout-menu-active-background);
      }
      &.is-active span {
        @apply relative;
      }
    }
  }
}
</style>
