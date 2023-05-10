<template>
  <el-date-picker
    v-model="form[$attrs.prop]"
    v-bind="$attrs"
  ></el-date-picker>
</template>
<script lang="ts" setup>
// @ts-nocheck
import { ref } from "vue";
const props = defineProps({
  form: { type: Object, default: () => {} },
});
</script>
