<template>
  <el-rate
    v-model="form[$attrs?.prop]"
    v-bind="$attrs"
  ></el-rate>
</template>

<script lang="ts" setup>
const props = defineProps({
  form: { type: Object, default: () => {
      return {}
    }
  },
});
</script>
