<template>
  <div class="wrapper p-[16px] bg-white h-full">
    <span>这是第二个测试页面 </span>
    <div class="cursor-pointer" @click="handleClick">跳转到第三个</div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();
const handleClick = () => {
  router.push({ path: "/layout-child-3", query: { id: "456" } });
};
</script>
<style lang="scss" scoped>
.wrapper {
}
</style>
