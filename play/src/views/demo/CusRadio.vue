<template>
  <div class="p-10">
    <RadioCus
      v-model="check"
      :cancel="false"
      :options="[
        { label: 'ces1', value: 0 },
        { label: 'ces2', value: 1 },
      ]"
      @change="onChange"
    ></RadioCus>
  </div>
</template>
<script setup lang="ts">
import RadioCus from "./RadioCus.vue";
const check = ref("");
const onChange = () => {
  console.log("**********check", check.value);
};
</script>
