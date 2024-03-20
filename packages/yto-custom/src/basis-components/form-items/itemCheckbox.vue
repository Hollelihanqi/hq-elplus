<template>
  <el-checkbox-group v-model="form[attrs.prop]" v-bind="attrs">
    <el-checkbox v-for="item in attrs.options" :key="item.value" v-bind="item" :label="item.value">
      {{ item.label }}
    </el-checkbox>
  </el-checkbox-group>
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
