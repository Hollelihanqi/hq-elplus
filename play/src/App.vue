<script setup lang="ts"></script>

<template>
  <div class="app">
    <!-- <CustomTable />
      <Menu/> -->
    <!-- <Chart></Chart> -->
    <!-- <FromItem></FromItem> -->
    <div class="flex flex-col">
      <router-link class="mr-[10px]" to="/form">form</router-link>
      <router-link class="mr-[10px]" to="/chart">chart</router-link>
      <router-link class="mr-[10px]" to="/table">table</router-link>
    </div>

    <router-view v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" :key="$route.fullPath"></component>
      </KeepAlive>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
.app {
  /* display: flex; */
  height: 100%;
}
</style>
