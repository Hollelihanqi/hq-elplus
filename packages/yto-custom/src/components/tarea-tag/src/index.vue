<template>
  <div
    ref="editDiv"
    class="custom-edit-div"
    :class="{ 'red-b': !valid, 'focus-border': isFocus && valid }"
    @click="handleEditDClick"
  >
    <el-tag
      v-for="(item, index) in tags"
      :key="index"
      :type="item.valid ? '' : 'danger'"
      closable
      @close="handleTagClose(index)"
    >
      {{ item.text }}
    </el-tag>
    <el-input
      v-if="tags.length"
      ref="editInput"
      v-model="inputText"
      type="textarea"
      autosize
      v-bind="$attrs"
      @blur="handleWBlur"
      @focus="handleWFocus"
    ></el-input>
    <el-input
      v-else
      ref="editInput"
      v-model="inputText"
      type="textarea"
      autosize
      :placeholder="placeholder"
      v-bind="$attrs"
      @blur="handleWBlur"
      @focus="handleWFocus"
    ></el-input>
  </div>
</template>
<script lang="ts" setup name="TareaTag">
import { List } from "immutable";
const props = defineProps({
  modelValue: {
    type: [Array, String],
    default: () => [],
  },
  placeholder: {
    type: String,
    default: "",
  },
  regular: {
    type: [RegExp, Function],
    default: null,
  },
  required: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["update:modelValue", "on-updated"]);
const editDiv = ref();
const editInput = ref();
const valid = ref(true);
const isFocus = ref(false);
const tags = ref<any>([]);
const inputText = ref("");

watch(
  () => tags.value,
  (newValue: any) => {
    const _v = newValue.map((item: any) => item.text);
    emits("update:modelValue", _v.length ? _v : "");
    emits("on-updated", _v);
  }
);

const handleEditDClick = () => {
  editInput.value.focus();
  isFocus.value = true;
};

const handleTagClose = (idx: number) => {
  let _tags = List(tags.value);
  _tags = _tags.remove(idx);
  tags.value = _tags.toArray();
  valided();
};

const handleWBlur = () => {
  isFocus.value = false;
  if (inputText.value || tags.value.length) {
    checkText();
  } else if (props.required && !inputText.value) {
    valid.value = false;
  } else {
    valid.value = true;
  }
};

const handleWFocus = () => {
  isFocus.value = true;
  valid.value = true;
};

const formatInputText = () => {
  return inputText.value.replace(/[\n\r\s,，]+/g, ",");
};

const checkText = () => {
  const formattedText = formatInputText();
  let textArray = formattedText.split(",");
  inputText.value = "";
  // 用于验证文本项的函数
  const validateItem = (item: string) => {
    if (!item) return null;
    const isValid =
      props.regular instanceof RegExp
        ? props.regular.test(item)
        : typeof props.regular === "function"
        ? props.regular(item)
        : true;
    return {
      text: item,
      valid: isValid,
    };
  };

  // 使用 map 来创建一个新数组，并过滤掉所有 null 值
  const newTags = textArray.map(validateItem).filter(Boolean);
  // 更新 tags 值
  tags.value = [...tags.value, ...newTags];

  valided(); // 更新验证状态
};
const valided = () => {
  if (props.required && !tags.value.length) {
    valid.value = false;
    return;
  }
  valid.value = tags.value.every((item: any) => item.valid);
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
