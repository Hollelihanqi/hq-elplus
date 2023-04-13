<template>
  <BaseEchart :options="chartOptions"></BaseEchart>
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import BaseEchart from "./index.vue";
import { Map } from "immutable";
import { getBarChartBaseOptions, getOptiops } from "./chartConfig";
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
    Map(getBarChartBaseOptions()).mergeDeep(props.options)
  );
  console.log("barChartOptions-computed", options);
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
  }
  return options;
};
</script>
<style lang="scss" scoped>
.wrapper {
}
</style>
