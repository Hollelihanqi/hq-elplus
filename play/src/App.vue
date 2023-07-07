<script setup lang="ts"></script>

<template>
  <div class="app">
    <router-link style="margin-right: 10px" to="/form">form</router-link>
    <router-link style="margin-right: 10px" to="/chart">chart</router-link>
    <router-link style="margin-right: 10px" to="/table">table</router-link>
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
