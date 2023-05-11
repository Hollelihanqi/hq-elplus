<template>
  <el-time-select v-bind="$attrs" v-model="form[$attrs.prop]" start="08:30" step="00:15" end="18:30"></el-time-select>
</template>

<script lang="ts" setup>
const props = defineProps({
  form: { type: Object, default: () => {
      return {}
    }
  },
});
</script>
