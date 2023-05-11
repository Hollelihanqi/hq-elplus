<template>
  <el-row class="dis-flex pad-tb-5" >
    <el-col v-for="(item, index) in formConfig"  :key="index" class="pad-tb-5" :span="item.span || span"   style="padding: 0 10px">
      <el-form-item
          :label="item?.label"
          :prop="item?.prop"
          :label-width="item.labelWidth"
      >
        <div :class="item.contentWidth || contentWidth ">
          <component
              v-bind="item"
              :is="getComponent(item.itemType)"
              v-if="!item?.slot"
              :prop="item?.prop"
              :form="form"
              :options="item?.options || options"
              :multiple="item?.multiple || false"
              :active-color="item?.activeColor || activeColor"
              :inactive-color="item?.inactiveColor || inactiveColor"
              :active-value="item?.activeValue || activeValue"
              :inactive-value="item?.inactiveValue || inactiveValue"
              :disabled="item?.disabled || disabled"
              :clearable="item?.clearable || clearable"
          />
          <slot  v-if="item?.slot" :name="item?.prop"/>
        </div>
      </el-form-item>
    </el-col>
    <div v-if="$slots.default" class="flex-1 dis-flex flex-align-item-center flex-justify-end " style="padding-right: 20px">
      <slot />
    </div>
  </el-row>
</template>

<script lang="ts" setup name="FormItem">
// @ts-nocheck

import itemInput from "./block/itemInput.vue";
import itemSelect from "./block/itemSelect.vue";
import itemSwitch from "./block/itemSwitch.vue";
import itemRadio from "./block/itemRadio.vue";
import itemCascader from "./block/itemCascader.vue";
import itemCheckbox from "./block/itemCheckbox.vue";
import itemDate from "./block/itemDate.vue";
import itemDateTime from "./block/itemDateTime.vue";
import itemInputNumber from "./block/itemInputNumber.vue";
import itemRate from "./block/itemRate.vue";
import itemTimePicker from "./block/itemTimePicker.vue";
import itemTimeSelect from "./block/itemTimeSelect.vue";
import {PropType} from "vue";
import { ElInput } from "element-plus"
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
    type: Array as PropType<{[key: string]: any}[]>,
    default: () => {
      return [];
    },
  },
  options: {
    type: Array as PropType<any[]>,
    default: () => {
      return [];
    },
  },
  size: {
    type: String,
    default: () => {
      return "";
    },
  },
  contentWidth:{
    type: String,
    default: () => {
      return "";
    },
  },
  span: { type: Number, default: 6 },
  labelWidth: { type: Number, default: 80 },
  form: { type: Object, default: () => {
      return{}
    }
  },
  disabled: { type: Boolean, default: false },
  clearable: { type: Boolean, default: true },
  activeColor: {
    type: String,
    default: () => {
      return "#13ce66";
    },
  },
  inactiveColor: {
    type: String,
    default: () => {
      return "";
    },
  },
  activeValue: { type: Boolean, default: true },
  inactiveValue: { type: Boolean, default: false },
});

</script>
<style lang="scss" scoped>
.dis-flex{display: flex;}
.flex-1{flex: 1}
.flex-align-item-center{align-items: center}
.flex-justify-end{justify-content: flex-end}
.pad-tb-5{padding-top: 5px;padding-bottom: 5px }
</style>

