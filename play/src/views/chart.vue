<template>
  <div class="wrapper">
    <p class="p-[10px] text-[#5B8FF9]">线图测试</p>
      <yto-line-echart :options="lineChartOptions"></yto-line-echart>
      <p class="p-[10px] text-[#5B8FF9]">柱状图测试</p>
      <yto-bar-echart :options="barChartOptions"></yto-bar-echart>
      <p class="p-[10px] text-[#5B8FF9]">饼图测试</p>
      <yto-echart :options="pieChartOptions"></yto-echart>
  </div>
</template>

<script lang="ts" setup>
import {reactive} from 'vue'
import {  YtoBarEchart,  YtoLineEchart} from '@yto/custom/src/components/echart/main'

const lineChartOptions = reactive({
  color: ["#5B8FF9"],
  legend: {
    data: ["访客人数"],
  },
  xAxis: {
    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
  },
  series: [
    {
      name: "访客人数",
      type: "line",
      data: [5, 20, 36, 10, 10, 20],
      label: {
        show: true,
        color: "#000",
      },
    },
  ],
});

const barChartOptions = reactive({
  xAxis: {
    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
  },
  series: [
    {
      name: "销量",
      type: "bar",
      data: [5, 20, 36, 10, 10, 20],
    },
  ],
});
const pieChartOptions = reactive(
  {
  title: {
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
)
</script>
<style lang="scss" scoped>
.wrapper{}
</style>