<!--
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2023-12-14 16:59:25
 * @LastEditTime: 2023-12-20 10:32:36
-->
<script setup lang="ts"></script>

<template>
  <div class="app flex flex-col">
    <!-- <div class="router-box">
      <router-link class="mr-[10px]" to="/form">form</router-link>
      <router-link class="mr-[10px]" to="/chart">chart</router-link>
      <router-link class="mr-[10px]" to="/table">table</router-link>
      <router-link class="mr-[10px]" to="/staffSearch">StaffSearch</router-link>
      <router-link class="mr-[10px]" to="/dialog">dialog</router-link>
      <router-link class="mr-[10px]" to="/userSearch">userSearch</router-link>
      <router-link class="mr-[10px]" to="/uploaderf">Uploader</router-link>
      <router-link class="mr-[10px]" to="/layoutFrom">layoutFrom</router-link>
      <router-link class="mr-[10px]" to="/layoutFrame">layoutFrame</router-link>
      <router-link class="mr-[10px]" to="/theme">them</router-link>
      <router-link class="mr-[10px]" to="/customFieldContainer">customFieldContainer</router-link>
      <router-link class="mr-[10px]" to="/customFieldConfig">CustomFieldDemo</router-link>
      <router-link class="mr-[10px]" to="/searchContainer">SearchContainer</router-link>
    </div>

    <router-view v-slot="{ Component }" class="flex-1">
      <KeepAlive>
        <component :is="Component" :key="$route.fullPath"></component>
      </KeepAlive>
    </router-view> -->

    <LayoutRouter class="h-full"></LayoutRouter>
    <!-- <LayoutFrame class="h-full"></LayoutFrame> -->
  </div>
</template>
<script lang="ts" setup>
import LayoutRouter from "@/views/layout-router.vue";
import LayoutFrame from "@/views/layout-frame.vue";
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
