<template>
  <el-radio-group v-model="form[attrs['prop']]" v-bind="attrs">
    <el-radio v-for="item in attrs['options']" :key="item?.value" :label="item?.value">{{ item?.label }}</el-radio>
  </el-radio-group>
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
