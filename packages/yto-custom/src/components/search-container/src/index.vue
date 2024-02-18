<template>
  <div class="search-container" :class="customClass">
    <el-form v-if="isUseForm" v-resize-element="handleResize" v-bind="$attrs" class="flex flex-wrap">
      <slot></slot>

      <div class="flex-1 text-right"><slot name="operation"></slot></div>
    </el-form>
    <div v-else v-resize-element="handleResize" class="flex flex-wrap">
      <slot></slot>

      <div class="flex-1 text-right"><slot name="operation"></slot></div>
    </div>
  </div>
</template>
<script lang="ts" setup name="SearchContainer">
import { resizeElement as vResizeElement } from "@/directives";
interface Props {
  isUseForm?: boolean;
  itemMinWidth: number;
  customClass?: string;
}
const props = withDefaults(defineProps<Props>(), {
  isUseForm: false,
  itemMinWidth: 200,
});
const emit = defineEmits(["resize"]);
const handleResize = (info: any) => {
  if (!props.itemMinWidth) return;
  let num = Math.floor(info.width / props.itemMinWidth);
  const itemWidth = info.width / num;
  if (itemWidth < props.itemMinWidth) {
    num -= 1;
  }
  emit("resize", Math.floor(info.width / num));
};
</script>
<style lang="scss" scoped>
.search-container {
}
</style>
