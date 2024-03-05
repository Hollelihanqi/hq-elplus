<template>
  <div :id="containerId" class="search-container" :class="customClass">
    <el-form
      v-if="isUseForm"
      ref="formInstance"
      v-resize-element="handleResize"
      v-bind="$attrs"
      class="flex flex-wrap container-content"
    >
      <slot></slot>

      <div class="flex-1 text-right container-operation"><slot name="operation"></slot></div>
    </el-form>
    <div v-else v-resize-element="handleResize" class="container-content flex flex-wrap">
      <slot></slot>

      <div class="flex-1 text-right container-operation"><slot name="operation"></slot></div>
    </div>
  </div>
</template>
<script lang="ts" setup name="SearchContainer">
import { resizeElement as vResizeElement } from "@/directives";
import { guid } from "@yto/utils";

interface Props {
  isUseForm?: boolean;
  itemMinWidth: number;
  itemMaxWidth?: number;
  customClass?: string;
  autoLayout?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  isUseForm: false,
  itemMinWidth: 300,
  autoLayout: true,
});
const formInstance = ref();
const containerId = computed(() => {
  return `searchContainer_${guid()}`;
});
const emit = defineEmits(["resize"]);
const handleResize = (info: any) => {
  if (!props.itemMinWidth || !info.width) return;
  let num = Math.floor(info.width / props.itemMinWidth);
  const tmpItemWidth = info.width / num;
  if (tmpItemWidth < props.itemMinWidth) {
    num -= 1;
  }
  let itemWidth = Math.floor(info.width / num);
  // 超过最大值则按照最大值展示
  if (props.itemMaxWidth && itemWidth > props.itemMaxWidth) {
    itemWidth = props.itemMaxWidth;
  }
  emit("resize", itemWidth);
  props.autoLayout && setChildWidth(itemWidth); // 设置子元素宽度
};
const setChildWidth = (itemWidth: number) => {
  const tmpChildren = document.querySelector(`#${containerId.value} .container-content`)?.children;
  if (!tmpChildren || !tmpChildren.length) return;
  const children = Array.from(tmpChildren).filter((item: any) => {
    return !item.className.includes("container-operation");
  });
  children.forEach((item: any) => {
    const cols = item.getAttribute("data-cols") || 1;
    item.style.width = itemWidth * cols + "px";
  });
};
onMounted(() => {
  const tmpEl: any = document.querySelector(`#${containerId.value} .container-content`);
  // console.log("search-container-onMounted", tmpEl.offsetWidth);
  tmpEl && handleResize({ width: tmpEl.offsetWidth });
});
defineExpose({
  formInstance,
});
</script>
<style lang="scss" scoped>
.search-container {
}
</style>
