<template>
  <div
    v-if="list"
    v-resize-element="handleResize"
    class="adaption-container flex flex-wrap flex-1"
    :style="`min-width:${minNum * minWidth + gap * minNum}px;gap:${gap}px`"
  >
    <template v-for="(item, index) in list" :key="index">
      <div :style="cardStyle">
        <slot :info="item"></slot>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup name="AdaptionContainer">
import { ref } from "vue";
import { resizeElement as vResizeElement } from "@/directives";

interface Props {
  list: Array<any>;
  minWidth?: number; //单个卡片最小宽度
  gap?: number; //卡片间距
  minNum?: number; // 最少显示几个卡片
}
const props = withDefaults(defineProps<Props>(), {
  list: () => [],
  minWidth: 200,
  gap: 10,
  minNum: 3,
});
const cardStyle = ref("");
const handleResize = (info: any) => {
  let num = Math.floor(info.width / props.minWidth);
  const cardWidth = (info.width - num * props.gap) / num;
  if (cardWidth < props.minWidth) {
    num -= 1;
  }
  cardStyle.value = `width: ${(info.width - num * props.gap) / num}px; min-width:${props.minWidth}px`;
};
</script>
<style lang="scss" scoped>
.adaption-container {
}
</style>
