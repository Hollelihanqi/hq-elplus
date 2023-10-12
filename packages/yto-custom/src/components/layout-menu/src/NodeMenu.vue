<template>
  <el-icon v-if="showIcon" class="align-middle">
    <!-- <component v-if="!isBlank(getIcon(data))" :is="getIcon(data)"></component> -->
    <i v-if="!isBlank(getIcon(data))" :class="getIcon(data)"></i>
    <template v-else>{{ labelFirst(data) }}</template>
  </el-icon>
  <span class="truncate ..." :style="{ width }">{{ getLable(data) }}</span>
</template>
<script lang="ts" setup>
import { inject } from "vue";

import { ElIcon } from "element-plus";
import "element-plus/es/components/icon/style/css";

import { isBlank, isEmpty } from "@/gold-core";
import { EnumSessionKey } from "@/common/EnumConstant";
defineProps({ data: Object, showIcon: { type: Boolean, default: true } });
const keyLabel = inject<any>(EnumSessionKey.MenuKeyLabel);
const keyIcon = inject<any>(EnumSessionKey.MenuKeyIcon);
const width = inject<any>(EnumSessionKey.MenuWidth);

function getLable(target: any) {
  if (isEmpty(target)) {
    return "";
  }
  const key: string = keyLabel as string;
  return Reflect.get(target, isBlank(key) ? "label" : key);
}

function labelFirst(target: any) {
  return getLable(target).substring(0, 1);
}

function getIcon(target: any) {
  console.log("getIcon", target, keyIcon);
  if (isEmpty(target)) {
    return "";
  }
  const key: string = keyIcon as string;
  return Reflect.get(target, isBlank(key) ? "icon" : key);
}
</script>
