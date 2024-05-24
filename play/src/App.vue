<!--
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2023-12-14 16:59:25
 * @LastEditTime: 2024-02-18 18:00:41
-->
<script setup lang="ts"></script>

<template>
  <div class="app flex flex-col">
    <LayoutRouter class="h-full"></LayoutRouter>
  </div>
</template>
<script lang="ts" setup>
import LayoutRouter from "@/views/layout-router.vue";
import LayoutFrame from "@/views/layout-frame.vue";
import formItems from "@/views/formItems/index.vue";
</script>
<style lang="scss">
.app {
  /* display: flex; */
  height: 100%;
}
.router-box {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
