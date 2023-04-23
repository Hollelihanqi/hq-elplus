<template>
  <el-input
    v-bind="$attrs"
    v-model="form[$attrs.prop]"
  />
</template>
<script lang="ts" setup>
// @ts-nocheck
const props = defineProps({
  form: { type: Object, default: () => {} },
});
</script>
