<template>
  <el-select-v2 v-model="form[attrs['prop']]" v-bind="attrs" :options="form[attrs['options']]" />
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
