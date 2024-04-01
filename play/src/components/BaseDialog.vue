<template>
  <el-dialog
    :model-value="modelValue"
    :title="title"
    :width="w"
    class="my-modal"
    :close-on-click-modal="false"
    v-bind="$attrs"
    @close="handleCancel"
  >
    <slot></slot>
    <template v-if="!footerHide" #footer>
      <div class="my-dia-footer">
        <el-button v-if="!cancelBtnHide" :disabled="disabled || btnLoading" type="default" @click="handleCancel">{{
          cancelBtnText
        }}</el-button>
        <el-button
          v-if="!okBtnHide"
          type="primary"
          :disabled="disabled || okDisabled"
          :loading="btnLoading"
          @click="handleOk"
          >{{ okBtnText }}</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  w: {
    type: String,
    default: "600px",
  },
  maxh: {
    type: String,
    default: "600px",
  },
  titleAlign: {
    type: String,
    default: "",
  },
  footerHide: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  okDisabled: {
    type: Boolean,
    default: false,
  },
  btnLoading: {
    type: Boolean,
    default: false,
  },
  okBtnText: {
    type: String,
    default: "确认",
  },
  cancelBtnText: {
    type: String,
    default: "取消",
  },
  cancelBtnHide: {
    type: Boolean,
    default: false,
  },
  okBtnHide: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["update:modelValue", "on-cancel", "on-ok"]);

// modal 关闭时的回调函数
const handleCancel = () => {
  emits("on-cancel");
  emits("update:modelValue", false);
};
const handleOk = () => {
  emits("on-ok");
};
</script>
<style lang="scss">
.my-modal {
  padding: 0 !important;
  .el-dialog__header {
    position: relative;
    height: 48px !important;
    display: flex;
    align-items: center;
    background: #fff;
    padding: 0 20px;
    text-align: left;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    margin-right: 0;
  }
  .el-dialog__title {
    color: #000 !important;
  }
  .el-dialog__close {
    &:hover {
      color: #000 !important;
    }
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    .icon {
      font-weight: bold;
    }
  }
  .el-dialog__body {
    padding: 16px;
  }
  .el-dialog__headerbtn {
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    width: auto;
  }
  .el-dialog__footer {
    padding: 12px 20px;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
  }
  .my-dia-footer {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
  }
}
</style>
