<template>
  <el-select-v2 v-model="form[$attrs.prop]" v-bind="$attrs" :options="form[$attrs.options]" />
</template>

<script lang="ts" setup>
// @ts-nocheck
const props = defineProps({
  form: { type: Object, default: () => {} },
});
</script>
