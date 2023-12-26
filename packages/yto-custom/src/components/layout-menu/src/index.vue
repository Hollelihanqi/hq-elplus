<template>
  <div class="layout-menu flex flex-col justify-between bg-slate-100">
    <StickyContainer>
      <template #header>
        <div v-if="title || logo" class="menu-logo-title flex items-center px-[16px] h-12 leading-12">
          <img v-if="logo" class="w-[32px] h-[32px] mr-[10px]" :src="logo" alt="logo" />
          <span class="title overflow-hidden whitespace-nowrap text-[20px]">{{ title }}</span>
        </div>
      </template>
      <el-menu
        v-bind="$attrs"
        class="layout-menu-v flex-1 overflow-auto"
        :collapse="collapse"
        :default-active="activate"
      >
        <div
          v-if="searchable"
          class="layout-menu-search w-full bg-[#fff] p-[12px] box-border"
          :class="!collapse ? 'appear' : 'disappear'"
        >
          <el-input v-model="searchVal" placeholder="菜单查询" />
        </div>
        <!-- 二级菜单 -->
        <template v-for="(item, index) in menuData" :key="index">
          <el-sub-menu v-if="isArray(item.children)" :index="getLabel(item)">
            <template #title>
              <slot name="label" v-bind="item">
                <inner-node-menu :data="item" :show-icon="!!item.icon"></inner-node-menu>
              </slot>
            </template>
            <!-- 三级菜单 -->
            <template v-for="(itemSub, indexSub) in item.children" :key="`${index}-${indexSub}`">
              <el-sub-menu v-if="isArray(itemSub.children)" :index="getLabel(itemSub)">
                <template #title>
                  <slot name="label" v-bind="itemSub">
                    <inner-node-menu :data="itemSub" :show-icon="!!itemSub.icon"></inner-node-menu>
                  </slot>
                </template>
                <template
                  v-for="(itemSecond, indexSecond) in itemSub.children"
                  :key="`${index}-${indexSub}-${indexSecond}`"
                >
                  <el-menu-item :index="itemSecond.code" @click="menuClick(itemSecond)">
                    <slot name="label" v-bind="itemSecond">
                      <inner-node-menu :data="itemSecond" :show-icon="false"></inner-node-menu>
                    </slot>
                  </el-menu-item>
                </template>
              </el-sub-menu>
              <el-menu-item v-else :index="itemSub.code" @click="menuClick(itemSub)">
                <slot name="label" v-bind="itemSub">
                  <inner-node-menu :data="itemSub" :show-icon="false"></inner-node-menu>
                </slot>
              </el-menu-item>
            </template>
          </el-sub-menu>
          <!-- 一级菜单 -->
          <el-menu-item v-else :index="item.code" @click="menuClick(item)">
            <slot name="label" v-bind="item">
              <inner-node-menu :data="item" :show-icon="!!item.icon"></inner-node-menu>
            </slot>
          </el-menu-item>
        </template>
      </el-menu>
    </StickyContainer>
  </div>
</template>
<script lang="ts" setup name="LayoutMenu">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMenu } from "../../../composable/menu";
import { isArray, isBoolean, toURL } from "gold-core";
import InnerNodeMenu from "./NodeMenu.vue";
import "@/icon-font/iconfont.css";
import StickyContainer from "../../sticky-container";
const props = defineProps({
  keyLabel: String,
  keyIcon: String,
  keyHref: String,
  keySession: String,
  collapse: Boolean,
  menus: Array,
  searchable: {
    type: Boolean,
    default: true,
  },
  width: { type: String, default: "210px" },
  title: String,
  logo: String,
});
const router = useRouter();
const emit = defineEmits(["menuClick", "update:collapse"]);
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
  emit("menuClick", item);
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
  --el-menu-item-height: 48px;
}
</style>
<style lang="scss" scoped>
.layout-menu {
  --layout-menu-background: rgb(255, 255, 255); // 整体背景色
  --layout-menu-active-background: rgba(44, 60, 216, 0.1); // 激活状态背景颜色
  --layout-menu-active-color: #2c3cd8; // 激活状态字体颜色
  --layout-sub-menu-box-shadow: inset 0px -1px 0px 0px rgba(0, 0, 0, 0.1);
  --layout-menu-hover-color: #e6e6e6; // hover效果的颜色
  --layout-menu-text-color: #000; // 字体颜色
  --layout-menu-search-background: #f0f1f5; // 搜索框背景色
  --layout-menu-border-color: #e5e7eb; // 边框默认颜色
  --layout-menu-active-border-color: #e5e7eb; // 激活状态下右侧边框颜色
  --layout-menu-title-bg: transparent;
  --layout-menu-title-color: #000;

  @apply bg-[var(--layout-menu-background)];
  .layout-menu-search {
    @apply overflow-hidden;
    &.disappear {
      animation: cutWidth 0.2s;
      @apply h-0 p-0;
    }
    &.appear {
      animation: addWidth 0.2s;
      @apply h-[56px] p-[12px];
    }
  }
  @keyframes cutWidth {
    0% {
      height: 56px;
      padding: 12px;
    }
    100% {
      height: 0px;
      padding: 0;
    }
  }
  @keyframes addWidth {
    0% {
      height: 0px;
      padding: 0;
    }

    100% {
      height: 56px;
      padding: 12px;
    }
  }
  .menu-logo-title {
    @apply text-[var(--layout-menu-title-color)] bg-[var(--layout-menu-title-bg)];
  }
  .layout-menu-search {
    @apply bg-[var(--layout-menu-background)];
    :deep(.el-input) {
      .el-input__wrapper {
        box-shadow: none;
        background: var(--layout-menu-search-background);
        &:is-focus {
          box-shadow: none;
        }
        .el-input__inner {
          color: var(--layout-menu-text-color);
          background: var(--layout-menu-search-background);
        }
      }
    }
  }
  :deep(.el-menu) {
    @apply bg-[var(--layout-menu-background)] border-none;
    &:not(.el-menu--collapse) {
      width: v-bind("props.width");
    }
    .el-sub-menu {
      @apply bg-[var(--layout-menu-background)];
      box-shadow: var(--layout-sub-menu-box-shadow);

      &.is-active {
        @apply bg-[var(--layout-menu-background)];
        .el-sub-menu__title {
          @apply border-color-[var(--layout-menu-border-color)];
        }
      }

      .el-sub-menu__title {
        @apply text-[var(--layout-menu-text-color)] opacity-80 border-b border-color-[var(--layout-menu-border-color)];
        &:hover {
          @apply bg-[var(--layout-menu-hover-color)];
        }
        .el-icon {
          @apply mr-[8px] ml-[-8px];
        }
      }
    }

    .el-menu-item {
      @apply h-[40px] bg-[var(--layout-menu-background)] leading-[40px] text-white opacity-80 text-[var(--layout-menu-text-color)] border-b border-color-[var(--layout-menu-border-color)];
      .el-icon {
        @apply mr-[8px] ml-[-8px];
      }
      &:hover {
        @apply bg-[var(--layout-menu-hover-color)];
      }
      &.is-active {
        color: var(--layout-menu-active-color);
        background: var(--layout-menu-active-background);
        border-right: 3px solid var(--layout-menu-active-border-color);
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
