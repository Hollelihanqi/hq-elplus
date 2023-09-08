<template>
  <div class="search-box">
    <yto-c-staff-search v-model="user" key="3"></yto-c-staff-search>
    <CustomLeakagewaySelect key="1" v-model="user2" ref="testInstance" />
    <el-button @click="testInstance.testFun()">test</el-button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import CustomLeakagewaySelect from "./CustomLeakagewaySelect.vue";
const user = ref("");
const user2 = ref("");
const testInstance = ref();
</script>
<style lang="scss" scoped>
.search-box {
  width: 500px;
  padding: 60px;
}
</style>
