<template>
  <el-input-number v-model="form[attrs.prop]" v-bind="attrs" :type="attrs.type || 'datetime'"></el-input-number>
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue';
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
