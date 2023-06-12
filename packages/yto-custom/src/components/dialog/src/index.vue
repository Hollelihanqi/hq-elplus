<script lang="ts" setup name="Dialog">
import { ButtonProps } from "element-plus";
import { ZoomIn, ZoomOut } from "@element-plus/icons-vue";
import type { Component } from "vue";

type MyParital<T> = {
  [P in keyof T]?: T[P];
};

type MyButtonProps = MyParital<ButtonProps> & {
  // 在这里添加自己的属性
  txt?: string;
  hidden?: boolean | undefined;
};

interface IProps {
  visible: boolean;
  headerBgColor?: string; // 头部颜色
  offset?: Array<string>;
  mimIcon?: Component; //最小化最大化按钮
  maxmin?: boolean; // 最小化最大化按钮显示隐藏

  hiddenFooter?: boolean | undefined;
  hiddenConfirm?: boolean | undefined;
  hiddenCancel?: boolean | undefined;
  confirmOption?: MyButtonProps | undefined;
  cancelOption?: MyButtonProps | undefined;
}
const props = withDefaults(defineProps<IProps>(), {
  visible: false,
  offset: () => {
    return ["auto", "20vh"];
  },
  mimIcon: ZoomIn,
  maxmin: false,
});
const $emit = defineEmits(["update:visible", "cancel", "confirm", "maxminFun", "reductionFun"]);

// -------------------------------- header start--------------------------
const maxminFun = () => {
  nextTick(() => {
    let dialogBody: HTMLElement = document.querySelector("." + "dialog-cst" + " .el-dialog__body") as HTMLElement;

    if (props.mimIcon == ZoomIn) {
      dialogBody!.style.display = "none";
      props.mimIcon = ZoomOut;
      $emit("maxminFun");
    } else {
      dialogBody!.style.display = "block";
      props.mimIcon = ZoomIn;
      $emit("reductionFun");
    }
  });
};
// -------------------------------- header end--------------------------

// -------------------------------- footer btn start--------------------------

const _confirmOption = computed(() => {
  let option: MyButtonProps = {
    type: "primary",
    size: "default",
    txt: "确认",
    hidden: false,
  };
  option = Object.assign({}, option, props.confirmOption);
  return reactive(option);
});
const _cancelOption = computed(() => {
  let option: MyButtonProps = {
    type: "default",
    size: "default",
    txt: "取消",
    hidden: false,
  };
  option = Object.assign({}, option, props.cancelOption);
  return reactive(option);
});

const _hiddenFooter = computed(() => {
  if (Reflect.has(props, "hiddenFooter") && typeof props.hiddenFooter == "boolean") return props.hiddenFooter;
  return Reflect.has(props, "hiddenFooter");
});
const _hiddenConfirm = computed(() => {
  if (Reflect.has(props, "hiddenConfirm") && typeof props.hiddenConfirm == "boolean") return props.hiddenConfirm;
  return Reflect.has(props, "hiddenConfirm");
});
const _hiddenCancel = computed(() => {
  if (Reflect.has(props, "hiddenCancel") && typeof props.hiddenCancel == "boolean") return props.hiddenCancel;
  return Reflect.has(props, "hiddenCancel");
});

console.log("props", props);

const _showConfirm = computed(() => {
  if (_hiddenConfirm.value) return false;
  const { confirmOption } = props;
  if (!confirmOption) return true;
  if (Reflect.has(confirmOption, "hidden") && typeof confirmOption.hidden == "boolean") return !confirmOption.hidden;
  return !Reflect.has(confirmOption!, "hidden");
});
const _showCancel = computed(() => {
  if (_hiddenCancel.value) return false;
  const { cancelOption } = props;
  console.log("cancelOption", cancelOption);
  if (!cancelOption) return true;
  if (Reflect.has(cancelOption, "hidden") && typeof cancelOption.hidden == "boolean") return !cancelOption.hidden;
  return !Reflect.has(cancelOption!, "hidden");
});

const handleClose = () => {
  $emit("update:visible", false);
  $emit("cancel", "cancel");
};
const handleConfirm = () => {
  $emit("update:visible", false);
  $emit("confirm", "confirm");
};
// -------------------------------- footer btn end--------------------------
</script>

<template>
  <el-dialog class="dialog-cst" v-bind="$attrs" :style="{ marginLeft: offset[0], marginTop: offset[1] }">
    <template #header>
      <slot name="header"></slot>
    </template>

    <slot />

    <template #footer>
      <slot name="footer" v-if="!_hiddenFooter">
        <el-button v-if="_showCancel" v-bind="_cancelOption" @click="handleClose">{{
          _cancelOption.txt ? _cancelOption.txt : "取消"
        }}</el-button>
        <el-button v-if="_showConfirm" v-bind="_confirmOption" @click="handleConfirm">{{
          _confirmOption.txt ? _confirmOption.txt : "确认"
        }}</el-button>
      </slot>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.my-dialog {
  :deep(.el-dialog__header) {
    margin-right: 0;
  }
}
</style>
