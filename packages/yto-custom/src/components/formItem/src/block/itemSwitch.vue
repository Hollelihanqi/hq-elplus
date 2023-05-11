<template>
  <el-switch v-bind="$attrs" v-model="form[$attrs.prop]"></el-switch>
</template>

<script lang="ts" setup>
const props = defineProps({
  form: { type: Object, default: () => {
      return {}
    }
  },
});
</script>
