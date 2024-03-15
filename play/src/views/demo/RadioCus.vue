<template>
  <div class="p-10">
    <yto-c-radio
      v-model="check"
      :options="[
        { label: '单间', value: 0 },
        { label: '标间', value: 1 },
      ]"
      :disabled="false"
      @change="onChange"
    ></yto-c-radio>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const check = ref("");
const onChange = () => {};
</script>
