<template>
  <el-time-picker
    v-bind="$attrs"
    v-model="form[$attrs.prop]"
  ></el-time-picker>
</template>

<script lang="ts" setup>
// @ts-nocheck
const props = defineProps({
  form: { type: Object, default: () => {} },
});
</script>
