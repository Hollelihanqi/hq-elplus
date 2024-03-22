<!--
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2023-03-02 17:03:44
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2023-03-10 13:31:43
 * @FilePath: \xlfk-vite-vue3\src\views\complianceManagement\components\Create.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <BaseDialog v-model="dialogVisible" title="新增处理人" w="600px" @on-ok="handleSubmit" @on-cancel="handleCancel">
    <el-form ref="FormInstanceRef" :model="formModel" :rules="rules" label-width="100" label-position="right">
      <el-form-item label="责任安全区" prop="regions">
        <CustomProvinceAreaSelect v-model="formModel.regions" model-item multiple />
      </el-form-item>
    </el-form>
  </BaseDialog>
</template>
<script lang="ts" setup>
import BaseDialog from "./BaseDialog.vue";
import { FormInstance } from "element-plus";
import CustomProvinceAreaSelect from "./CustomProvinceAreaSelect.vue";
const emits = defineEmits(["on-confirm"]);
const dialogVisible = ref(false);
const FormInstanceRef = ref<FormInstance>();
const defaultValue = { regions: [] };

let formModel = reactive<any>({ ...defaultValue });
const rules = {
  regions: [{ required: true, message: "请输入", trigger: ["blur", "change"] }],
  user: [{ required: true, message: "请输入", trigger: ["blur", "change"] }],
};

const actionDialog = (): void => {
  dialogVisible.value = true;
};

const handleSubmit = (): void => {
  FormInstanceRef.value?.validate((valid) => {
    if (valid) {
      const { user, regions } = formModel;
      const { userCode, userName } = user;
      const regionCodes = regions.map((item: any) => item.id);
      const regionNames = regions.map((item: any) => item.name);
      const params: any = {
        userCode,
        userName,
        regionCodes,
        regionNames,
      };
      console.log(params);
      emits("on-confirm", params, () => {
        window._message.success(params.id ? "编辑成功" : "新增成功");
        dialogVisible.value = false;
      });
    }
  });
};
const handleCancel = (): void => {
  FormInstanceRef.value?.clearValidate();
  FormInstanceRef.value?.resetFields();
  formModel = reactive<any>({ ...defaultValue });
};
defineExpose({
  actionDialog,
});
</script>
