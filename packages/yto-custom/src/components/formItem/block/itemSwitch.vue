<template>
  <el-switch v-bind="$attrs" v-model="form[$attrs.prop]"></el-switch>
</template>

<script lang="ts" setup>
// @ts-nocheck
const props = defineProps({
  form: { type: Object, default: () => {} },
});
</script>
