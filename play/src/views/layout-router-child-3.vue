<template>
  <div class="wrapper bg-white h-full flex justify-between">
    <span @click="handleClick('333')">第三个测试页面</span>
    <span @click="handleClick('333-end')">第三个测试页面-end</span>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { toPathFormat } from "gold-core";

const route = useRoute();
const router = useRouter();
const handleClick = (id: string) => {
  router.push({ path: "/layout-child-3", query: { id } });
};
onMounted(() => {
  // console.log("watch--onMounted", toPathFormat(route.query.iFrameUrl));
});
</script>
<style lang="scss" scoped>
.wrapper {
}
</style>
