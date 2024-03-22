<template>
  <el-cascader v-model="form[attrs.prop]" :options="form[attrs.options]"></el-cascader>
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
