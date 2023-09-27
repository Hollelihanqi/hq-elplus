<script setup lang="ts"></script>

<template>
  <div class="app">
    <!-- <CustomTable />
      <Menu/> -->
    <!-- <Chart></Chart> -->
    <!-- <FromItem></FromItem> -->
    <div class="router-box">
      <router-link class="mr-[10px]" to="/form">form</router-link>
      <router-link class="mr-[10px]" to="/chart">chart</router-link>
      <router-link class="mr-[10px]" to="/table">table</router-link>
      <router-link class="mr-[10px]" to="/staffSearch">StaffSearch</router-link>
      <router-link class="mr-[10px]" to="/dialog">dialog</router-link>
      <router-link class="mr-[10px]" to="/userSearch">userSearch</router-link>
      <router-link class="mr-[10px]" to="/uploaderf">Uploader</router-link>
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
.router-box {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
