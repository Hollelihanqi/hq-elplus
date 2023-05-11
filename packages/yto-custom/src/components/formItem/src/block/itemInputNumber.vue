<template>
  <el-input-number v-model="form[$attrs.prop]" v-bind="$attrs" :type="$attrs.type || 'datetime'"></el-input-number>
</template>

<script lang="ts" setup>
const props = defineProps({
  form: { type: Object, default: () => {
      return {}
    }
  },
});
</script>
