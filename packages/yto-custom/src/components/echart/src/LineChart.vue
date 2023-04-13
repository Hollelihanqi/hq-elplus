<!--
 * @Author: 魏春霈
 * @Date: 2023-03-17 15:31:34
 * @LastEditors: 魏春霈
 * @LastEditTime: 2023-03-20 14:16:25
 * @Description: 折线图
-->
<template>
  <BaseEchart :options="chartOptions"></BaseEchart>
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import BaseEchart from "./index.vue";
import { Map } from "immutable";
import { getLineChartConfig, getOptiops } from "./chartConfig";
import { isEmpty } from "lodash-es";

interface Props {
  options?: any;
}
const props = withDefaults(defineProps<Props>(), {
  options: () => {
    return {};
  },
});
const chartOptions = computed(() => {
  const options = getOptiops(
    Map(getLineChartConfig()).mergeDeep(props.options)
  );
  console.log("LineChartOptions-computed", options);
  return dealNodata(options);
});
/**
 * @description:无数据
 * @param {*} options
 * @return {*}
 */
const dealNodata = (options: any) => {
  if (isEmpty(options.series) || isEmpty(options.series[0].data)) {
    options.title.show = true;
    options.yAxis.show = false;
    options.xAxis.show = false;
    options.legend.show = false;
    options.tooltip.show = false;
  }
  return options;
};
</script>
<style lang="scss" scoped>
.wrapper {
}
</style>
