<template>
  <el-date-picker v-model="form[$attrs.prop]" v-bind="$attrs" type="datetime"></el-date-picker>
</template>
<script lang="ts" setup>
// @ts-nocheck
const props = defineProps({
  form: { type: Object, default: () => {} },
});
</script>
