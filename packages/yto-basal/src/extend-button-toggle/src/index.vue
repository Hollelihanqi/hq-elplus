<template>
    <div v-if="list.length" class="toggle-box">
      <yto-radio-group v-bind="$attrs">
        <yto-radio-button v-for="item in list" :key="item.value" :label="item.value">
          <span>{{ item.label }}</span>
          <i v-if="item.icon" class="yto-icon-edit"></i>
        </yto-radio-button>
      </yto-radio-group>
    </div>
  </template>
  <script lang="ts" setup>
  import { defineProps, PropType } from "vue";
  
  interface ListProps {
    label: string;
    value: string;
    icon?: string;
  }
  const props = defineProps({
    list: {
      type: Array as PropType<ListProps[]>,
      default: () => [],
    },
  });
  </script>
  <style lang="scss" scoped>
  .toggle-box {
    background: #fff;
    @extend .df;
    @extend .aic;
    gap: 20px;
    :deep(.el-radio-group) {
      .el-radio-button__inner {
        min-width: 80px;
        height: 32px;
        @extend .df;
        @extend .aic;
        @extend .jcc;
      }
    }
    :deep(.el-radio-group > :not(label.is-active)) {
      .el-radio-button__inner {
        background: #fff;
        color: #999;
      }
    }
  }
  :deep(.el-radio-button__original-radio:checked+.el-radio-button__inner) {
    color: var(--el-color-primary);
    background-color: white;
    border-color: var(--el-color-primary);
    box-shadow: -1px 0 0 0 var(--el-color-primary);
  }
  </style>
  