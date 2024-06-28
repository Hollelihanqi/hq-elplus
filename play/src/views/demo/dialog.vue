<template>
  <div>
    <button class="a" @click="dialogVisible = true">基础弹框</button>

    <yto-c-dialog
      v-model="dialogVisible"
      width="1000px"
      @confirm="handleConfirm"
      @cancel="handleCancel"
      :hiddenFooter="true"
    >
      <template #header> title </template>
      <yto-c-form
        id="123"
        ref="formInstance"
        :label-width="100"
        :form="commitForm"
        :form-config="formConfig"
        class="12485"
        :span="12"
      >
      </yto-c-form>

      <template #footer> title </template>
    </yto-c-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
// import { YtoDialog } from "@yto/custom";

export default defineComponent({
  setup() {
    const confirm = reactive({
      // loading: true,
      type: "warning",
      // size: 'large'
    });
    const style = {
      width: "100%",
    };
    const commitForm = ref({});
    const formConfig = [
      {
        itemType: "select",
        prop: "systemCode",
        label: "所属系统",
        options: [],
        style,
        contentClass: "w-100",
      },
      {
        itemType: "select",
        prop: "applicationCode",
        label: "所属应用",
        options: [],
        style,
        contentClass: "w-100",
      },
      {
        itemType: "select",
        prop: "menuCode",
        label: "所属页面",
        options: [],
        style,
        contentClass: "w-100",
      },
      {
        itemType: "select",
        prop: "targetType",
        label: "菜单分类",
        placeholder: "请选择",
        style,
        options: [],
        contentClass: "w-100",
      },
      {
        itemType: "select",
        prop: "ruleCategory",
        label: "规则类型",
        placeholder: "请选择",
        options: [],
        style,
        contentClass: "w-100",
      },
      {
        itemType: "input",
        prop: "ruleValue",
        label: "规则值",
        placeholder: "请输入",
        contentClass: "w-100",
      },
      {
        itemType: "input",
        prop: "callback",
        label: "回调函数",
        span: 24,
        contentClass: "w-100",
      },
    ];
    const dialogVisible = ref(false);
    const handleConfirm = (val: boolean) => {
      dialogVisible.value = false;
      console.log(val);
    };
    const handleCancel = (val: boolean) => {
      dialogVisible.value = false;
      console.log(val);
    };
    return {
      dialogVisible,
      handleConfirm,
      handleCancel,
      confirm,
      commitForm,
      formConfig,
    };
  },
});
</script>

<style scoped lang="scss">
:deep(.w-100) {
  width: 100%;
}
</style>
