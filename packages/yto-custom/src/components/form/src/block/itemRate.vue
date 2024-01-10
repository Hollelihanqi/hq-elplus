<template>
  <el-rate
    v-model="form[attrs?.prop]"
    v-bind="attrs"
  ></el-rate>
</template>

<script lang="ts" setup>
import {useAttrs} from "vue";
const attrs = useAttrs() as any;
const props = defineProps({
  form: { type: Object, default: () => {
      return {}
    }
  },
});
</script>
