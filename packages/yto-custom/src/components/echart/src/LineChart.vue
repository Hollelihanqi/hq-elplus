<template>
  <BaseEchart :options="chartOptions"></BaseEchart>
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import BaseEchart from "./index.vue";
import { Map } from "immutable";
import { getLineChartConfig, getOptiops } from "./chartConfig";
import { isEmpty, isArray } from "lodash-es";

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
  if (isEmpty(options.series) || (isArray(options.series) && options.series.every((item:any) => isEmpty(item.data))) ){
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
