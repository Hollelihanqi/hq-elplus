<script setup lang="ts">
import CustomTable from "./views/index.vue";
import Menu from "./components/Menu.vue";
import Chart from "./views/chart.vue";
import FromItem from "./views/formItem/index.vue";
</script>

<template>
  <div class="app">
    <!-- <CustomTable />
      <Menu/> -->
    <!-- <Chart></Chart> -->
    <!-- <FromItem></FromItem> -->
    <router-link class="mr-[10px]" to="/form">form</router-link>
    <router-link class="mr-[10px]" to="/chart">chart</router-link>
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
}
</style>
