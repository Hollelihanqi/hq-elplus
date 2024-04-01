<template>
  <el-date-picker v-model="form[attrs.prop]" v-bind="attrs"></el-date-picker>
</template>
<script lang="ts" setup>
import { useAttrs } from "vue";
const attrs = useAttrs() as any;
const props = defineProps({
  form: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
</script>
