<!--
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2024-03-19 14:23:09
 * @LastEditTime: 2024-03-20 10:39:46
-->
<template>
  <div class="bg-white w-full h-full py-20 px-10">
    <TimeLine :time-data="timeData"> </TimeLine>
    <!-- <template #left="{item}">
      <div class="py-1 w-[80px] text-[14px] text-primary rounded-full bg-primary bg-opacity-10 border border-primary border-opacity-20 text-center btn">{{ item.content }}</div>
    </template>
    <template #default="{item}">
     <div>{{ item.timestamp }}</div>
     <div class="content">{{ item.msg }}</div>
    </template> -->
  </div>
</template>
<script lang="ts" setup>
import TimeLine from "./TimeLine.vue";
const timeData = [
  {
    status: "需求发起",
    timestamp: "2018-04-15",
    content:
      "似水流年是一个人所有的一切，只有这个东西，才真正归你所有。其余的一切，都是片刻的欢娱和不幸，转眼间就已跑到那似水流年里去了",
  },
  {
    status: "进行中",
    timestamp: "2018-04-13",
    content:
      "那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，还想在一瞬间变成天上半明半暗的云。后来我才知道，生活就是个缓慢受锤的过程，人一天天老下去，奢望也一天天消失，最后变得像挨了锤的牛一样。可是我过二十一岁生日时没有预见到这一点。我觉得自己会永远生猛下去，什么也锤不了我。",
  },
  {
    status: "已完成",
    timestamp: "2018-04-11",
    content: "慢慢来，不要急，生活给你出了难题，可也终有一天会给出答案。",
  },
];
</script>
<style lang="scss" scoped>
.btn {
  height: fit-content;
}
.content {
  @apply py-4 bg-gray-50 text-[#666] text-[14px] px-4 rounded my-2;
  line-height: 26px;
}
</style>
