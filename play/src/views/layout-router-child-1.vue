<template>
  <div class="wrapper h-full bg-white p-[16px]">
    <span>这是第一个测试页面 </span>
    <div class="cursor-pointer" @click="handleClick">跳转到第三个</div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();
const handleClick = () => {
  router.push({ path: "/layout-child-3", query: { id: "123" } });
};
</script>
<style lang="scss" scoped>
.wrapper {
}
</style>
