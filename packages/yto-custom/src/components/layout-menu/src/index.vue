<template>
  <div class="layout-menu flex flex-col justify-between bg-slate-100">
    <StickyContainer>
      <!-- <template v-if="!collapse" #header>
        <Logo :title="title" :logo="logo" />
      </template> -->
      <el-menu v-bind="$attrs" class="layout-menu-v h-[100%]" :collapse="collapse" :default-active="activate">
        <Logo :title="title" :logo="logo" :collapse="collapse" />
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
                <inner-node-menu :collapse="collapse" :data="item" :show-icon="!!item.icon"></inner-node-menu>
              </slot>
            </template>
            <!-- 三级菜单 -->
            <template v-for="(itemSub, indexSub) in item.children" :key="`${index}-${indexSub}`">
              <el-sub-menu v-if="isArray(itemSub.children)" class="second-sub-menu" :index="getLabel(itemSub)">
                <template #title>
                  <slot name="label" v-bind="itemSub">
                    <inner-node-menu :collapse="collapse" :data="itemSub" :show-icon="!!itemSub.icon"></inner-node-menu>
                  </slot>
                </template>
                <template
                  v-for="(itemSecond, indexSecond) in itemSub.children"
                  :key="`${index}-${indexSub}-${indexSecond}`"
                >
                  <el-menu-item :index="itemSecond.code" class="leaf-menu" @click="menuClick(itemSecond)">
                    <slot name="label" v-bind="itemSecond">
                      <inner-node-menu :data="itemSecond" :show-icon="false"></inner-node-menu>
                    </slot>
                  </el-menu-item>
                </template>
              </el-sub-menu>
              <el-menu-item v-else :index="itemSub.code" class="leaf-menu" @click="menuClick(itemSub)">
                <slot name="label" v-bind="itemSub">
                  <inner-node-menu :data="itemSub" :show-icon="false"></inner-node-menu>
                </slot>
              </el-menu-item>
            </template>
          </el-sub-menu>
          <!-- 一级菜单 -->
          <el-menu-item v-else :index="item.code" @click="menuClick(item)">
            <slot name="label" v-bind="item">
              <inner-node-menu :collapse="collapse" :data="item" :show-icon="!!item.icon"></inner-node-menu>
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
import Logo from "./Logo.vue";
import { logger } from "@/_utils";
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
  linkType: { type: String, default: "paneAdd" },
  formatMenu: Function,
});

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

const menuClick = async (item: any) => {
  emit("menuClick", item);
  logger("menuClick", props.linkType, item);
  if (props.linkType === "paneAdd") {
    paneAdd(props.formatMenu ? await props.formatMenu(item) : item);
  }
};
const menuData = computed(() => {
  const tmpData = JSON.parse(JSON.stringify(data));
  return searchVal.value ? fileNavMenu(tmpData) : tmpData;
});

const { paneAdd, getHref, getLabel, data, activate } = useMenu(props);
</script>
<style lang="scss">
:root {
  --el-menu-base-level-padding: 18px;
  --el-menu-level-padding: 18px;
  --el-menu-item-height: 48px;
}
</style>
<style lang="scss" scoped>
.layout-menu {
  --layout-menu-background: rgb(255, 255, 255); // 整体背景色
  --layout-menu-active-parent-background: #eee;
  --layout-menu-active-background: rgba(44, 60, 216, 0.1); // 激活状态背景颜色
  --layout-menu-active-color: #2c3cd8; // 激活状态字体颜色
  --layout-sub-menu-box-shadow: inset 0px -1px 0px 0px rgba(0, 0, 0, 0.1);
  --layout-menu-hover-color: #e6e6e6; // hover效果的颜色
  --layout-menu-text-color: #000; // 字体颜色
  --layout-menu-search-background: #f0f1f5; // 搜索框背景色
  --layout-menu-border-color: #e5e7eb; // 边框默认颜色
  --layout-menu-active-border-color: #2c3cd8; // 激活状态下二级菜单左侧边框颜色
  --layout-menu-inline-bg-colorr: #f0f1f5; // 子菜单默认背景颜色
  --layout-menu-title-bg: transparent; //顶部 title 区域背景颜色
  --layout-menu-title-color: #000; //顶部 title 区域文字颜色
  --layout-menu-triangle-color: #b2b2b2; // 折叠/展开三角颜色

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
    /**************处理菜单折叠后图标对不齐的问题*****************/
    &.el-menu--collapse {
      .el-sub-menu .el-sub-menu__title .el-icon,
      .el-menu-item .el-icon {
        @apply ml-0;
      }
    }
    .el-sub-menu {
      @apply bg-[var(--layout-menu-background)];
      box-shadow: var(--layout-sub-menu-box-shadow);

      &.is-active {
        @apply bg-[var(--layout-menu-background)];
        .el-sub-menu__title {
          @apply border-color-[var(--layout-menu-border-color)] bg-[var(--layout-menu-active-parent-background)];
        }
        /**************处理二级菜单激活状态左侧的边框*****************/
        .second-sub-menu.is-active .el-sub-menu__title {
          @apply relative;
          &::before {
            content: "";
            @apply w-[4px] h-[28px] bg-[var(--layout-menu-active-border-color)] absolute left-0 top-[3px];
          }
        }
      }
      .leaf-menu,
      .second-sub-menu .el-sub-menu__title {
        @apply h-[34px] leading-[34px];
      }
      .el-sub-menu__title {
        @apply text-[var(--layout-menu-text-color)] text-opacity-80  border-b border-color-[var(--layout-menu-border-color)];
        &:hover {
          @apply bg-[var(--layout-menu-hover-color)];
        }
        .el-icon {
          @apply mr-[4px] ml-[-8px];
        }
      }
      /**************处理激活状态叶子节点左侧的小圆点*****************/
      .leaf-menu.is-active div {
        @apply relative;
        &::before {
          content: "";
          @apply absolute w-[4px] h-[4px] rounded-[4px] absolute left-[-8px] top-[15px] bg-[var(--layout-menu-active-color)];
        }
      }
      /**************开始：处理展开折叠三角形*****************/
      .el-sub-menu__title .el-icon.el-sub-menu__icon-arrow {
        svg {
          @apply hidden;
        }
        &::after {
          content: "";
          @apply w-0 h-0 border-solid;

          border-color: transparent;
          border-width: 5px 0 5px 5px;
          border-left-color: var(--layout-menu-triangle-color);
        }
      }
      &.is-opened:not(.second-sub-menu) {
        > .el-sub-menu__title .el-icon.el-sub-menu__icon-arrow {
          transform: rotateZ(90deg) !important;
        }
      }
      &.is-opened.second-sub-menu {
        > .el-sub-menu__title .el-icon.el-sub-menu__icon-arrow {
          transform: rotateZ(90deg) !important;
        }
      }
      /**************结束：处理展开折叠三角形*****************/
      .el-menu.el-menu--inline {
        .el-menu-item,
        .el-sub-menu__title {
          //如果修改：hover和active样式 请注意和下边的hover/active样式一起修改
          @apply bg-[var(--layout-menu-inline-bg-color)];
          &:hover {
            @apply bg-[var(--layout-menu-hover-color)];
          }
          &.is-active {
            @apply bg-[var(--layout-menu-active-background)] text-[var(--layout-menu-active-color)];
          }
        }
      }
    }

    .el-menu-item {
      @apply bg-[var(--layout-menu-background)] opacity-80 text-[var(--layout-menu-text-color)] border-b border-color-[var(--layout-menu-border-color)];
      .el-icon {
        @apply mr-[4px] ml-[-8px];
      }
      //如果修改：hover和active样式 请注意和上边的hover/active样式一起修改
      &:hover {
        @apply bg-[var(--layout-menu-hover-color)];
      }
      &.is-active {
        @apply bg-[var(--layout-menu-active-background)] text-[var(--layout-menu-active-color)];
      }
      &.is-active:hover {
        @apply bg-[var(--layout-menu-active-background)] text-[var(--layout-menu-active-color)];
      }
    }
  }
}
</style>
