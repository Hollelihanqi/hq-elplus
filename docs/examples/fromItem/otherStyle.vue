<template>
  <div style="padding: 0 10px">
    <el-form :form="form">
      <yto-c-form-items
          :form="form"
          :form-config="formConfig"
          :span="12"
          clearable
      >
      </yto-c-form-items>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import {ElForm} from "element-plus";

const form = reactive({});
const formConfig = [
  { itemType: "input", prop: "name", label: "文本框",contentWidth:"test" },
];
</script>

<style scoped lang="scss">
:deep(.test){
  width: 100%;
  background: red;
}
</style>
