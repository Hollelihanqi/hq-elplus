<template>
  <div class="p-[16px] bg-white w-full h-full">
    <ul>
      <li>
        格式化时间测试(123456秒)：<span>{{ formatTime(123456) }}</span>
      </li>
      <li>
        格式化时间测试(123456789毫秒)：<span>{{
          formatTime(123456789, "millisecond", ["day", "hour", "minute", "second", "millisecond"])
        }}</span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { formatTime } from "@yto/utils";
</script>
