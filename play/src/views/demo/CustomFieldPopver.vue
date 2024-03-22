<!--
 * @Description: 自定义输入组件
 * @Author: ym
 * @Date: 2023-12-11 15:52:16
 * @LastEditTime: 2023-12-11 19:25:58
-->
<template>
  <el-popover :visible="isShow" placement="bottom" :width="200" popper-class="!px-0 !py-1 ignore ">
    <div ref="myPopoverRef">
      <div v-if="cacheList.length" class="op-title">
        {{ cacheTitle }}
      </div>
      <div class="max-h-[200px] overflow-y-auto">
        <div v-for="op in cacheList" :key="op.label + op.value" class="op-item">
          <slot v-if="$slots.cacheItem" name="cache-item" :item="op"></slot>
          <span v-else>{{ op.label }} </span>
        </div>
      </div>
      <el-divider v-if="cacheList.length" class="my-2" />
      <div class="op-title">
        {{ optionsTitle }}
      </div>
      <div class="max-h-[200px] overflow-y-auto">
        <div v-for="op in options" :key="op.label + op.value" class="op-item">
          <slot v-if="$slots.optionItem" name="option-item" :item="op"></slot>
          <span v-else>{{ op.label }} </span>
        </div>
      </div>
    </div>
    <template #reference>
      <div
        :class="`bg-white flex text-font2 w-[170px] items-center px-2 mr-4 border py-[5px] rounded-[4px] hover:( border-[#ccc]) ${
          isShow ? 'border-primary' : ''
        }`"
        @click.stop="onPopoverShow"
      >
        <el-input v-model="inputValue"></el-input>
        <el-icon v-if="isShow" color="#999"><ArrowUp /></el-icon>
        <el-icon v-else color="#999"><ArrowDown /></el-icon>
      </div>
    </template>
  </el-popover>
</template>
<script setup lang="ts">
import { ArrowDown, ArrowUp } from "@element-plus/icons-vue";
interface IOptions {
  label: string;
  value: any;
}
interface IProps {
  options: IOptions[];
  optionsTitle?: string;
  multiple?: boolean; // 多选
  multipleLimit?: number; // 多选限制
  disabled?: boolean; // 禁用
  filterable?: boolean; // 过滤
  remoteMethod?: (query: string) => Promise<IOptions[]>; // 远程搜索
  cacheTitle?: string;
  cachefun?: () => IOptions[]; // 常用搜索列表
}
const props = withDefaults(defineProps<IProps>(), {
  options: () => [],
  optionsTitle: "其他条件",
  cacheTitle: "常用条件",
});
const cacheList = computed(() => {
  const list = props?.cachefun ? props?.cachefun() : [];
  return list;
});
const isShow = ref(false);
const inputValue = ref("");
const myPopoverRef = ref();
const onPopoverShow = () => {
  isShow.value = !isShow.value;
};
const onHiddenClick = (e: any) => {
  if (!(myPopoverRef.value && myPopoverRef.value.contains(e.target))) {
    isShow.value = false;
  }
};
onMounted(() => {
  document.addEventListener("click", onHiddenClick);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", onHiddenClick);
});
</script>
<style lang="scss">
.op-item {
  @apply px-4 py-2 cursor-pointer hover:(text-primary bg-primary bg-opacity-5);
}
.op-title {
  @apply px-4 py-2 text-xs text-[#666];
}
</style>
