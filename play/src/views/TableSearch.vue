<template>
  <div class="h-full w-full">
    <yto-c-search-form v-model:search-model="filterData" :form-controls="list" @on-search="handleSearch">
    </yto-c-search-form>
  </div>
</template>
<script lang="tsx" setup>
const filterData = ref<any>({});

const handleSearch = () => {
  console.log(filterData.value);
};
const list = [
  {
    el: "input",
    label: "搜索组件",
    field: "input0",
    defaultValue: "我是默认值，重置后我还会回来的",
  },
  {
    el: "select",
    label: "搜索组件",
    field: "input1",
    options: [
      {
        label: "name",
        value: 0,
      },
      {
        label: "age",
        value: 1,
      },
    ],
  },
  {
    el: "switch",
    label: "搜索组件",
    field: "input2",
  },
  {
    el: "checkbox",
    label: "搜索组件",
    field: "input3",
  },
  {
    el: "date-picker",
    label: "搜索组件",
    field: "input4",
  },
  {
    el: "input",
    label: "搜索组件",
    field: "input5",
  },
  {
    el: "input",
    label: "搜索组件",
    field: "input6",
  },
  {
    el: "input",
    label: "搜索组件",
    field: "input7",
  },
];
</script>
