<template>
  <div
    :id="containerId"
    class="search-container overflow-hidden relative w-full"
    :class="customClass"
    :style="handleContainerHeightChange()"
    @keyup.enter="handleEnterKeyup"
  >
    <el-form
      v-if="isUseForm"
      ref="formInstance"
      v-resize-element="handleResize"
      v-bind="$attrs"
      class="flex flex-wrap container-content w-full"
    >
      <slot></slot>

      <div class="flex-1 text-right container-operation"><slot name="operation"></slot></div>
    </el-form>
    <div v-else v-resize-element="handleResize" class="container-content flex flex-wrap w-full">
      <slot></slot>
      <div class="flex-1 text-right container-operation"><slot name="operation"></slot></div>
    </div>
    <div
      v-if="showCollapse"
      class="bg-[#F7F9FA] w-[32px] h-[16px] flex items-center justify-center cursor-pointer container-collapse text-[12px] absolute bottom-0 left-[50%] ml-[-16px]"
      @click="handleCollapse"
    >
      <el-icon :style="`transform: rotate(${collapse ? 90 : -90}deg)`"><DArrowRight /></el-icon>
      <!-- {{ collapse ? `展开` : "折叠" }} -->
    </div>
  </div>
</template>
<script lang="ts" setup name="SearchContainer">
import { resizeElement as vResizeElement } from "@/directives";
import { guid, debounceFun } from "@yto/utils";
import { DArrowRight } from "@element-plus/icons-vue";
import { logger } from "@/_utils";
import { IAnyObject } from "../../custom-field-container/src/index.vue";

interface Props {
  isUseForm?: boolean;
  itemMinWidth: number;
  itemMaxWidth?: number;
  customClass?: string;
  autoLayout?: boolean; //是否自动布局
  isCollapse?: boolean; //是否可以折叠
  collapseLine?: number; //折叠行数
  defaultCollapse: boolean; //是否默认折叠
}
const props = withDefaults(defineProps<Props>(), {
  isUseForm: true,
  itemMinWidth: 300,
  autoLayout: true,
  isCollapse: false,
  defaultCollapse: false,
  collapseLine: 3,
});
const formInstance = ref();
const containerId = computed(() => {
  return `searchContainer_${guid()}`;
});
let prevWidth = 0; //记录上一次容器宽度
let containerMaxHeight = 0;
let containerMinHeight = 0;

const showCollapse = ref(false);
const collapse = ref(false);
const emit = defineEmits(["resize", "enterKeyup"]);

const setContainerMaxMinHeight = (maxHeight = 0, minHeight = 0) => {
  containerMaxHeight = maxHeight || 0;
  containerMinHeight = minHeight || 0;
};
const handleResize = (info: any) => {
  if (!props.itemMinWidth || !info.width || prevWidth == info.width) return;
  logger("search-container-handleResize", info);
  prevWidth = info.width;
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
const hiddenLastEl = async (elements: any) => {
  // 隐藏最后一个刚好达到限制行数的子元素
  const childrenArr: Array<any> = Array.from(elements).filter((child: any) => {
    return Number(child.getAttribute("data-line-count")) === props.collapseLine;
  });
  childrenArr[childrenArr.length - 1].style.display = "none";
};
const showEl = (el: any) => (el.style.display = el.getAttribute("data-display") || "block");
const hideEl = (el: any) => (el.style.display = "none");
const isOperateEl = (el: any) => el.className.includes("container-operation");
const setOrgElDisplay = (elements: any) => {
  Array.from(elements).forEach((el: any) => {
    el.setAttribute("data-display", window.getComputedStyle(el).display);
  });
};
/**
 * 获取元素额外高度
 * */
const getElExtraHeight = (elStyle: IAnyObject) => {
  return (
    parseInt(elStyle.marginTop) +
    parseInt(elStyle.marginBottom) +
    parseInt(elStyle.paddingBottom) +
    parseInt(elStyle.paddingTop) +
    parseInt(elStyle.borderBottomWidth) +
    parseInt(elStyle.borderTopWidth) +
    parseInt(elStyle.borderLeftWidth) +
    parseInt(elStyle.borderBottomWidth)
  );
};
const dealCollapse = (lineNum: number, itemWidth: number) => {
  setContainerMaxMinHeight();
  const tmpChildren = document.querySelector(`#${containerId.value} .container-content`)?.children;
  if (!tmpChildren || !tmpChildren.length) return;
  let row = 1,
    rowHeightObj: IAnyObject = {}; //用于保存每一行的最大高度
  let currentTotalLineCols = 0;
  Array.from(tmpChildren).forEach((child: any, idx: number) => {
    const cols = Number(child.getAttribute("data-cols")) || 1;
    currentTotalLineCols += cols;
    child.setAttribute("data-line-count", row);

    //计算每一行最大高度
    const tmpRowHeight = child.offsetHeight + getElExtraHeight(getComputedStyle(child));
    !rowHeightObj[row] && (rowHeightObj[row] = 0);
    rowHeightObj[row] = tmpRowHeight > rowHeightObj[row] ? tmpRowHeight : rowHeightObj[row];

    // 如果是折叠状态，resize过程中,动态改变元素的display属性,避免元素被隐藏
    if (unref(collapse) && !isOperateEl(child)) {
      row <= props.collapseLine ? showEl(child) : hideEl(child);
    }
    if (currentTotalLineCols >= lineNum && Array.from(tmpChildren)[idx + 1]) {
      currentTotalLineCols = 0;
      row++;
    }
  });
  // 计算容器的最大、最小高度
  let tmpMaxHeight = 0,
    tmpMinHeight = 0;
  Object.keys(rowHeightObj).forEach((key: string) => {
    tmpMaxHeight += rowHeightObj[key];
    if (Number(key) <= props.collapseLine) {
      tmpMinHeight += rowHeightObj[key];
    }
  });
  setContainerMaxMinHeight(tmpMaxHeight, tmpMinHeight);
  logger("containerRowMaxHeight", rowHeightObj, containerMinHeight, containerMaxHeight);
  setTimeout(() => {
    //判断是否显示折叠按钮
    showCollapse.value = row > props.collapseLine;

    unref(showCollapse) && unref(collapse) && hiddenLastEl(tmpChildren);
    logger("内部元素共显示了大致", row, "行（不包含最后一行可能未满的情况）", showCollapse.value);
    //如果开启了默认折叠 超过最大行数则自动折叠
    if (props.isCollapse && props.defaultCollapse && unref(showCollapse)) {
      doCollapse(tmpChildren);
      collapse.value = true;
    }
  }, 10);
};
//处理展开
const doExpand = (elements: any) => Array.from(elements).forEach(showEl);
//处理折叠
const doCollapse = (elements: any) => {
  Array.from(elements).forEach((child: any) => {
    if (!isOperateEl(child) && Number(child.getAttribute("data-line-count")) > props.collapseLine) {
      hideEl(child);
    }
  });
  hiddenLastEl(elements);
};

//点击折叠/展开按钮
const handleCollapse = () => {
  const tmpChildren = document.querySelector(`#${containerId.value} .container-content`)?.children;
  if (!tmpChildren || !tmpChildren.length) return;
  unref(collapse) ? doExpand(tmpChildren) : doCollapse(tmpChildren);
  collapse.value = !unref(collapse);
};
const handleContainerHeightChange = () => {
  if (!props.isCollapse) return;
  const containerEl: any = document.querySelector(`#${containerId.value}`);
  if (!containerEl) return { height: 0 };
  const height = unref(collapse)
    ? `${containerMinHeight + getElExtraHeight(getComputedStyle(containerEl))}px`
    : `${containerMaxHeight + getElExtraHeight(getComputedStyle(containerEl))}px`;
  return {
    transition: "height 0.2s linear",
    height,
  };
};
//处理keyupEnter事件
const handleEnterKeyup = () => {
  logger("search-container inner enter keyup");
  emit("enterKeyup");
};
onMounted(() => {
  const tmpEl: any = document.querySelector(`#${containerId.value} .container-content`);
  if (!tmpEl) return;
  setOrgElDisplay(tmpEl.children);
  handleResize({ width: tmpEl.offsetWidth });
});
defineExpose({
  formInstance,
});
</script>
<style lang="scss" scoped>
.search-container {
}
</style>
