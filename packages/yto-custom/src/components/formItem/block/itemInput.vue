<template>
  <el-input v-bind="$attrs" v-model="form[$attrs.prop]" />
</template>
<script lang="ts" setup>
const props = defineProps({
  form: { type: Object, default: () => {
      return {}
    }
  },
});
</script>
