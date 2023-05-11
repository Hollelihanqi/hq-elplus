<template>
  <el-time-picker v-bind="$attrs" v-model="form[$attrs.prop]"></el-time-picker>
</template>

<script lang="ts" setup>
const props = defineProps({
  form: { type: Object, default: () => {
      return {}
    }
  },
});
</script>
