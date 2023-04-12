<script setup lang="ts">
import CustomTable from './views/index.vue'
import Menu from './components/Menu.vue'
</script>

<template>
    <div class="app">
      <CustomTable />
      <Menu/>
    </div>
</template>

<style lang="scss" scoped>
.app{
  /* display: flex; */
}
</style>
