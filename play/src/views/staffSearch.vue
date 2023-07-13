<template>
  <div class="search-box">
    <yto-c-staff-search v-model="user"></yto-c-staff-search>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const user = ref("");
</script>
<style lang="scss" scoped>
.search-box {
  width: 500px;
  padding: 60px;
}
</style>
