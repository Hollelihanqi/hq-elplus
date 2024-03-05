<!--
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2023-12-14 16:59:25
 * @LastEditTime: 2024-02-18 18:00:41
-->
<script setup lang="ts"></script>

<template>
  <div class="app flex flex-col">
    <div class="router-box flex flex-wrap">
      <router-link class="mr-[10px]" to="/form">Form</router-link>
      <router-link class="mr-[10px]" to="/chart">Chart</router-link>
      <router-link class="mr-[10px]" to="/table">Table</router-link>
      <router-link class="mr-[10px]" to="/staffSearch">StaffSearch</router-link>
      <router-link class="mr-[10px]" to="/dialog">Dialog</router-link>
      <router-link class="mr-[10px]" to="/dialog2">Dialog2</router-link>
      <router-link class="mr-[10px]" to="/userSearch">UserSearch</router-link>
      <router-link class="mr-[10px]" to="/uploaderf">Uploader</router-link>
      <router-link class="mr-[10px]" to="/layoutFrom">LayoutFrom</router-link>
      <router-link class="mr-[10px]" to="/layoutFrame">LayoutFrame</router-link>
      <router-link class="mr-[10px]" to="/theme">Them</router-link>
      <router-link class="mr-[10px]" to="/customFieldContainer">CustomFieldContainer</router-link>
      <router-link class="mr-[10px]" to="/customFieldConfig">CustomFieldDemo</router-link>
      <router-link class="mr-[10px]" to="/searchContainer">SearchContainer</router-link>
      <router-link class="mr-[10px]" to="/adaptionContainer">AdaptionContainer</router-link>
      <router-link class="mr-[10px]" to="/ellipsisTag">EllipsisTag</router-link>
      <router-link class="mr-[10px]" to="/searchFormItemContainer">SearchFormItemContainer</router-link>
      <router-link class="mr-[10px]" to="/tableSearch">TableSearch</router-link>
      <router-link class="mr-[10px]" to="/tareaTag">TareaTag</router-link>
      <router-link class="mr-[10px]" to="/cusRadio">CusRadio</router-link>
    </div>

    <router-view v-slot="{ Component }" class="flex-1">
      <KeepAlive>
        <component :is="Component" :key="$route.fullPath"></component>
      </KeepAlive>
    </router-view>

    <!-- <LayoutRouter class="h-full"></LayoutRouter> -->
    <!--     <LayoutFrame class="h-full"></LayoutFrame> -->
    <!-- <formItems></formItems> -->
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
