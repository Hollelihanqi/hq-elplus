<template>
  <el-cascader
      v-model="form[$attrs.prop]"
      :options="form[$attrs.options]"
  ></el-cascader>
</template>

<script lang="ts" setup>
const props = defineProps({
  form: { type: Object, default: () => {
      return {}
    }
  },
});
</script>
