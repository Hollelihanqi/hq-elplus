<template>
  <div class="h-[300px]">
    <yto-c-sticky-container ref="TestRef">
      <div class="h-[600px] bg-purple-600">
        werwer
        <el-button @click="hclick">滚动到最底部</el-button>
      </div>
    </yto-c-sticky-container>
  </div>
</template>
<script lang="ts" setup>
const TestRef = ref();
const hclick = () => {
  TestRef.value.scrollToBottom();
};
</script>
