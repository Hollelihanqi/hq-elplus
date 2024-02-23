90
<template>
  <div :id="containerId" class="search-container relative" :class="customClass">
    <el-form v-if="isUseForm" v-resize-element="handleResize" v-bind="$attrs" class="flex flex-wrap container-content">
      <slot></slot>

      <div class="flex-1 text-right container-operation"><slot name="operation"></slot></div>
    </el-form>
    <div v-else v-resize-element="handleResize" class="container-content flex flex-wrap">
      <slot></slot>

      <div class="flex-1 text-right container-operation"><slot name="operation"></slot></div>
    </div>
    <div
      v-if="showCollapse"
      class="cursor-pointer container-collapse text-center text-[12px] absolute bottom-[4px] left-[50%] ml-[-12px]"
      @click="handleCollapse"
    >
      <el-icon :style="`transform: rotate(${collapse ? 90 : -90}deg)`"><DArrowRight /></el-icon>
      <!-- {{ collapse ? `展开` : "折叠" }} -->
    </div>
  </div>
</template>
<script lang="ts" setup name="SearchContainer">
import { resizeElement as vResizeElement } from "@/directives";
import { guid } from "@yto/utils";
import { DArrowRight } from "@element-plus/icons-vue";

interface Props {
  isUseForm?: boolean;
  itemMinWidth: number;
  itemMaxWidth?: number;
  customClass?: string;
  autoLayout?: boolean; //是否自动布局
  isCollapse?: boolean; //是否可以折叠
  collapseLine?: number; //折叠行数
}
const props = withDefaults(defineProps<Props>(), {
  isUseForm: false,
  itemMinWidth: 300,
  autoLayout: true,
  isCollapse: true,
  collapseLine: 3,
});
const containerId = computed(() => {
  return `searchContainer_${guid()}`;
});
const showCollapse = ref(false);
const collapse = ref(false);
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
  nextTick(() => {
    props.isCollapse && dealCollapse(num, itemWidth);
  });
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
const dealCollapse = (lineNum: number, itemWidth: number) => {
  const tmpChildren = document.querySelector(`#${containerId.value} .container-content`)?.children;
  if (!tmpChildren || !tmpChildren.length) return;
  let row = 1;
  let currentTotalLineCols = 0;
  Array.from(tmpChildren).forEach((child: any, idx: number) => {
    const cols = Number(child.getAttribute("data-cols")) || 1;
    currentTotalLineCols += cols;
    child.setAttribute("data-line-count", row);
    if (currentTotalLineCols >= lineNum && Array.from(tmpChildren)[idx + 1]) {
      currentTotalLineCols = 0;
      row++;
    }
  });
  //如果是展开状态 则不隐藏按钮
  !collapse.value && (showCollapse.value = row > props.collapseLine);
  // console.log("内部元素共显示了大致", row, "行（不包含最后一行可能未满的情况）");
};
const handleCollapse = () => {
  const tmpChildren = document.querySelector(`#${containerId.value} .container-content`)?.children;
  if (!tmpChildren || !tmpChildren.length) return;
  if (unref(collapse)) {
    //处理展开
    Array.from(tmpChildren).forEach((child: any) => {
      child.style.display = child.getAttribute("data-display") || "block";
    });
  } else {
    //处理折叠
    Array.from(tmpChildren).forEach((child: any) => {
      //存储该元素的display属性
      child.setAttribute("data-display", window.getComputedStyle(child).display);
      if (
        !child.className.includes("container-operation") &&
        Number(child.getAttribute("data-line-count")) > props.collapseLine
      ) {
        child.style.display = "none";
      }
    });
    // 隐藏最后一个刚好达到限制行数的子元素
    const childrenArr: Array<any> = Array.from(tmpChildren).filter((child: any) => {
      return Number(child.getAttribute("data-line-count")) === props.collapseLine;
    });
    childrenArr[childrenArr.length - 1].style.display = "none";
  }
  collapse.value = !unref(collapse);
};
onMounted(() => {
  const tmpEl: any = document.querySelector(`#${containerId.value} .container-content`);
  // console.log("search-container-onMounted", tmpEl.offsetWidth);
  tmpEl && handleResize({ width: tmpEl.offsetWidth });
});
</script>
<style lang="scss" scoped>
.search-container {
}
</style>
