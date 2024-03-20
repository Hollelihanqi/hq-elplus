<!--
 * @Description: 主题适配案例
 * @Author: ym
 * @Date: 2023-11-23 19:10:44
 * @LastEditTime: 2023-11-28 19:35:47
-->
<template>
  <div class="w-[80%] min-w-[600px] mx-auto my-8">
    <div class="flex justify-end items-center">
      <span class="mr-4">切换主题</span>
      <el-color-picker v-model="colorThem" @change="onChange" />
    </div>
    <div class="card border border-primary border-opacity-55">
      <div class="title">windicss 主题色</div>
      <div class="text-primary">测试用标题</div>
      <div class="text-primary text-opacity-70">测试用标题</div>
      <div class="text-primary text-opacity-50">测试用标题</div>
    </div>
    <div class="card border border-primary border-opacity-35">
      <div class="title">element-plus 主题色</div>
      <div>
        <el-button type="primary" disabled>Primary</el-button>
        <el-button type="primary" plain disabled>Primary</el-button>
        <el-button type="primary">Primary</el-button>
        <el-button type="primary" link>Primary</el-button>
        <el-button type="primary" text>Primary</el-button>
      </div>
      <div>
        <el-progress class="py-2" :text-inside="true" :stroke-width="26" :percentage="70" />
        <el-progress class="py-2" :text-inside="true" :stroke-width="24" :percentage="100" status="success" />
      </div>
    </div>
    <div class="card border border-primary border-opacity-15">
      <div class="title">业务组件库</div>
      <layoutFrom></layoutFrom>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCssVar, newColorWithOpacity } from './cssVar';
import layoutFrom from '../layoutFrom.vue';
const themConfig: { [key: string]: number } = {
  '--el-color-primary': 1,
  '--layout-header-background': 0.8,
  '--el-color-primary-light-9': 0.9,
  '--el-color-primary-light-8': 0.8,
  '--el-color-primary-light-7': 0.7,
  '--el-color-primary-light-6': 0.6,
  '--el-color-primary-light-5': 0.5,
  '--el-color-primary-light-4': 0.4,
  '--el-color-primary-light-3': 0.3,
  '--el-color-primary-light-2': 0.2,
  '--el-color-primary-light-1': 0.1,
  '--el-button-active-color': 0.9,
};
const { setCssVar } = useCssVar('--el-color-primary', '#3434ce');
const colorThem = ref('#3434ce');
const onChange = (val: string) => {
  Object.keys(themConfig).forEach((e) => {
    if (themConfig[e] === 1) {
      setCssVar(e, val);
      console.log('********** newColorWithOpacity(val, 1, true)', newColorWithOpacity(val, 1, true));
      setCssVar('--el-color-primary-windi', newColorWithOpacity(val, 1, true));
    } else {
      const _color = newColorWithOpacity(val, themConfig[e]);
      setCssVar(e, _color);
    }
  });
};
</script>
<style lang="scss" scoped>
.card {
  @apply my-4 bg-primary bg-opacity-2 px-8 pb-8 rounded;
}
.title {
  @apply text-lg py-4;
}
</style>
