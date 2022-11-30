<template>
    <CustomAutoCompleteList2
      popper-class="auto-complete-list"
      label="应用"
      not-free-text
      show-hover-tip
      :value-keys="['code']"
      :label-keys="['code', 'name']"
      separator=" "
      url="/basic/basic-data/applications"
      method="get"
      :params="params"
      v-bind="$attrs"
    />
  </template>
  <script lang="ts" setup>
  import { defineProps } from "vue";
  import CustomAutoCompleteList2 from "@/modelComponents/CustomAutoCompleteList2.vue";
  const props = defineProps({
    isReadonly: {
      type: Boolean,
      default: false,
    },
    params: {
      type: Object,
      default: () => {},
    },
  });
  </script>
  