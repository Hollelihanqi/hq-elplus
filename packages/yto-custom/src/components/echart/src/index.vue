<template>
  <div :style="{ height: height }" >
    <div :id="container" :style="{ height: height }" v-resize-element="resizeHandler"></div>
  </div>
</template>

<script lang="ts" setup>
import {watch, nextTick, onActivated, onMounted, onUnmounted, createApp} from 'vue'
import * as echarts from "echarts";
import { guid } from "@yto/utils";
import {debounce} from 'lodash-es'
import {directivesList} from '../../../directives/index'

interface Props {
  height?: string;
  options: any;
}
const props = withDefaults(defineProps<Props>(), {
  height: "400px",
  options: () => {
    return {};
  },
});
let chart: any | null;
const app = createApp({})
app.directive("resize-element", directivesList.resizeElement)

const container = `baseChart_${guid()}`;
const showLoading = () => {
  chart &&
    chart.showLoading({
      text: "正在加载...",
      color: "#2c3cd8",
      textColor: "#2c3cd8",
      zlevel: 0,
    });
};

const initChart = () => {
  chart = echarts.init(document.querySelector(`#${container}`) as HTMLElement);
  showLoading();
  setChartOption();
  //窗口大小改变，重新绘图
  // window.addEventListener("resize", resizeHandler);
};
const setChartOption = async (options?: any) => {
  await nextTick();
  chart && chart.setOption(options || props.options);
  chart && chart.hideLoading();
};

const resizeHandler = debounce(() => {
  chart && chart.resize();
}, 200);

const disposeChart = () => {
  chart && chart.dispose();
  chart = null;
};

watch(
  () => props.options,
  (value) => {
    showLoading();
    setChartOption(value);
  },
  {
    deep: true,
  }
);

onActivated(resizeHandler);
onMounted(initChart);
onUnmounted(disposeChart);
</script>
