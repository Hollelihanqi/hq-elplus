<!--
 * @Description: 自定义容器
 * @Author: ym
 * @Date: 2023-12-07 16:20:35
 * @LastEditTime: 2023-12-25 14:29:23
-->
<template>
  <div :class="`flex w-full ${direction === 'vertical' ?'flex-wrap' : 'flex-col'}`">
    <slot name="prepend"></slot>
    <div :class="`flex ${direction === 'vertical' ? 'flex-col flex-1 w-0' : 'flex-wrap w-full'}`">
      <div v-for="(item, index) in modelValue" :key="index + '_row'" class="flex items-center my-2" :style="`width: ${width}`">
        <div class="flex-1 w-0">
          <slot name="content" :item="item" :index="index"></slot>
        </div>
        <div>
          <slot v-if="$slots.btn" name="btn" :item="item" :index="index"></slot>
          <template v-else>
            <el-button class="mx-2" link :icon="Plus" @click="onClick('add', index, item)"></el-button>
            <span class="mr-2 w-[20px] inline-block">
              <el-button v-show="modelValue.length > 1"  link :icon="Delete" @click="onClick('delete', index, item)"></el-button>
            </span>
            <slot name="btnAppend" :item="item" :index="index"></slot>
          </template>
        </div>
      </div>
      <slot name="append"></slot>
    </div>
  </div>
</template>
<script setup lang="ts" name="CustomFieldContainer">
import {Plus, Delete} from '@element-plus/icons-vue'
interface IAnyObject {
  [key: string]: any
}
interface IProps {
  direction?: 'vertical' | 'horizontal'
  modelValue: IAnyObject[]
  width?: string
}
const props = withDefaults(defineProps<IProps>(), {
  direction: 'horizontal',
  width: '100%'
})
const emits = defineEmits(['add', 'delete'])
const onClick = (flag: 'add' | 'delete', index: number, item: IAnyObject) => {
  if (flag === 'add') {
    emits('add', index, item)
  } else {
    emits('delete', index, item)
  }
}
</script>
