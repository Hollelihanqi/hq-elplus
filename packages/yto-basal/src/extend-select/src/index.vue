<template>
    <BaseFormItem :prop="prop" :w="w" :label="label">
        <yto-select placeholder="请选择" v-bind="$attrs" :model-value="modelValue" filterable clearable
            @change="handleChange" @focus="handleFocus">
            <yto-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                <template v-if="labelKeys.length">
                    <div>
                        <span v-for="item2 in labelKeys" :key="item2">{{ item[item2] }}</span>
                    </div>
                </template>
            </yto-option>
        </yto-select>
    </BaseFormItem>
</template>
<script lang="ts" setup>
import { defineProps, PropType, watchEffect } from "vue";
import BaseFormItem from "./BaseFormItem.vue";

interface OptionItemProps {
    label: string;
    value: string | number;
    [propsName: string]: any;
}
const props = defineProps({
    label: {
        type: String,
        default: "用户",
    },
    prop: {
        type: String,
        default: "",
    },
    notFreeText: {
        // 默认支持 input 输入任何内容，如果为 true 则只能选择下拉列表中的内容
        type: Boolean,
        default: false,
    },
    options: {
        // 下拉列表固定数据，
        type: Array as PropType<OptionItemProps[]>,
        default: () => [],
    },
    filterProps: {
        // 如果传入 list 固定数据， 就必须传入过滤字段（可以支持多个）
        type: Array,
        default: () => [],
    },
    w: {
        // input 宽度
        type: String,
        default: "220px",
    },
    modelValue: {
        // 此属性是 vue3.0 默认的 v-model 双向数据绑定 prop，请在子组件上通过 v-model 进行传递
        // 因为组件内部时通过 watch 监听 v-model 的值的变化来更新组件的内部 _value；
        // 所以清除表单时一定要手动对 v-model 的值进行手动置空，否则组件下次不会更新 _value
        type: [String, Array],
        default: "",
    },
    labelKeys: {
        type: Array as PropType<string[]>,
        default: () => [],
    },
});

const handleChange = (value: any) => {
    console.log(value);
};
const handleFocus = () => { };
</script>
<style lang="scss">

</style>
  