<template>
  <el-rate
    v-model="form[$attrs?.prop]"
    v-bind="$attrs"
  ></el-rate>
</template>

<script lang="ts" setup>
// @ts-nocheck
import { PropType } from 'vue'
const props = defineProps({
  form: { type: Object as PropType<{
    [k: string]: any
    }>, default: () => {} },

});
</script>
