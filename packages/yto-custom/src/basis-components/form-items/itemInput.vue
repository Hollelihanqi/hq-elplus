<template>
  <el-input v-bind="attrs" v-model="form[attrs.prop]" />
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
