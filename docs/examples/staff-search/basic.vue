<template>
  <div class="basic-com">
    <yto-c-staff-search v-model="user"></yto-c-staff-search>
  </div>
</template>
<script lang="tsx" setup>
import { ref, watch } from "vue";
import { ElMessage } from "element-plus";
const user = ref<any>("");
watch(
  () => user.value,
  () => {
    ElMessage.success(user.value);
  }
);
</script>
<style lang="scss" scoped>
.basic-com {
  padding: 16px;
}
</style>
