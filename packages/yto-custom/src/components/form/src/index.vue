<template>
  <el-form v-bind="$attrs" ref="myForm" :model="form">
    <div v-if="layoutAuto" class="dis-flex flex-wrap">
      <el-form-item
        v-for="item in formConfig"
        v-bind="item?.formItemBinds"
        :key="item.prop"
        :label="item?.label"
        :prop="item?.prop"
        :label-width="item.labelWidth"
        class="mx-[10px]"
      >
        <div :class="item.contentClass">
          <component
            v-bind="item"
            :is="getComponent(item.itemType)"
            v-if="!$slots[item.prop]"
            :prop="item?.prop"
            :form="form"
            :options="item?.options || itemConfig.options"
            :multiple="item?.multiple || false"
            :active-color="item?.activeColor || itemConfig.activeColor"
            :inactive-color="item?.inactiveColor || itemConfig.inactiveColor"
            :active-value="item?.activeValue || itemConfig.activeValue"
            :inactive-value="item?.inactiveValue || itemConfig.inactiveValue"
            :disabled="item?.disabled || itemConfig.disabled"
            :clearable="item?.clearable || itemConfig.clearable"
          />
          <slot v-if="$slots[item.prop]" :name="item?.prop" />
        </div>
      </el-form-item>
      <div
        v-if="$slots.default"
        class="flex-1 dis-flex flex-align-item-center flex-justify-end"
        style="padding-right: 20px"
      >
        <slot />
      </div>
    </div>

    <el-row v-if="!layoutAuto" class="dis-flex pad-tb-5">
      <el-col
        v-for="(item, index) in formConfig"
        :key="index"
        class="pad-tb-5"
        :span="item.span || span"
        style="padding: 0 10px"
      >
        <el-form-item
          :label="item?.label"
          :prop="item?.prop"
          :label-width="item.labelWidth"
          v-bind="item?.formItemBinds"
        >
          <div :class="item.contentClass">
            <component
              v-bind="item"
              :is="getComponent(item.itemType)"
              v-if="!$slots[item.prop]"
              :prop="item?.prop"
              :form="form"
              :options="item?.options || itemConfig.options"
              :multiple="item?.multiple || false"
              :active-color="item?.activeColor || itemConfig.activeColor"
              :inactive-color="item?.inactiveColor || itemConfig.inactiveColor"
              :active-value="item?.activeValue || itemConfig.activeValue"
              :inactive-value="item?.inactiveValue || itemConfig.inactiveValue"
              :disabled="item?.disabled || itemConfig.disabled"
              :clearable="item?.clearable || itemConfig.clearable"
            />
            <slot v-if="$slots[item.prop]" :name="item?.prop" />
          </div>
        </el-form-item>
      </el-col>
      <div
        v-if="$slots.default"
        class="flex-1 dis-flex flex-align-item-center flex-justify-end"
        style="padding-right: 20px"
      >
        <slot />
      </div>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup name="Form">
// @ts-nocheck

import itemInput from "../../../basis-components/form-items/itemInput.vue";
import itemSelect from "../../../basis-components/form-items/itemSelect.vue";
import itemSwitch from "../../../basis-components/form-items/itemSwitch.vue";
import itemRadio from "../../../basis-components/form-items/itemRadio.vue";
import itemCascader from "../../../basis-components/form-items/itemCascader.vue";
import itemCheckbox from "../../../basis-components/form-items/itemCheckbox.vue";
import itemDate from "../../../basis-components/form-items/itemDate.vue";
import itemDateTime from "../../../basis-components/form-items/itemDateTime.vue";
import itemInputNumber from "../../../basis-components/form-items/itemInputNumber.vue";
import itemRate from "../../../basis-components/form-items/itemRate.vue";
import itemTimePicker from "../../../basis-components/form-items/itemTimePicker.vue";
import itemTimeSelect from "../../../basis-components/form-items/itemTimeSelect.vue";
import { ElInput } from "element-plus";
import { PropType } from "vue";
interface Obj {
  [key: string]: any;
}
const types: Obj = {
  input: itemInput,
  select: itemSelect,
  switch: itemSwitch,
  radio: itemRadio,
  cascader: itemCascader,
  checkbox: itemCheckbox,
  date: itemDate,
  dateTime: itemDateTime,
  inputNumber: itemInputNumber,
  rate: itemRate,
  timePicker: itemTimePicker,
  timeSelect: itemTimeSelect,
};
const getComponent = (type: string) => {
  return types[type];
};
const props = defineProps({
  formConfig: {
    type: Array as PropType<{ [key: string]: any }[]>,
    default: () => {
      return [];
    },
  },
  layoutAuto: { type: Boolean, default: false },
  size: {
    type: String,
    default: () => {
      return "";
    },
  },
  span: { type: Number, default: 6 },
  form: {
    type: Object,
    default: () => {
      return {};
    },
  },
  itemConfig: {
    type: Object,
    default: () => {
      return {
        options: [],
        contentClass: "",
        disabled: false,
        clearable: true,
        activeColor: "#13ce66",
        inactiveColor: "",
        activeValue: true,
        inactiveValue: false,
      };
    },
  },
});

const myForm = ref();
defineExpose({
  myForm,
});
</script>
<style lang="scss" scoped>
.dis-flex {
  display: flex;
}
.flex-1 {
  flex: 1;
}
.flex-align-item-center {
  align-items: center;
}
.flex-justify-end {
  justify-content: flex-end;
}
.pad-tb-5 {
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>
