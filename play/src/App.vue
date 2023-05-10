<script setup lang="ts">
import CustomTable from './views/index.vue'
import Menu from './components/Menu.vue'
import Chart from './views/chart.vue'
import FromItem from "./views/formItem/index.vue"
</script>

<template>
    <div class="app">
      <!-- <CustomTable />
      <Menu/> -->
<!--      <Chart></Chart>-->
      <FromItem></FromItem>
    </div>
</template>

<style lang="scss" scoped>
.app{
  /* display: flex; */
}
</style>
