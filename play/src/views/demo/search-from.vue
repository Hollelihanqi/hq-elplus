<template>
  <div>
    <yto-c-search-from
      v-model:search-model="filterData"
      :form-controls="list"
      @on-search="handleSearch"
    ></yto-c-search-from>
  </div>
</template>
<script lang="tsx" setup>
// import { SearchFormControlProps } from "@/components/SearchForm/index";
import CustomStaffSelect from '@/cusComponents/CustomStaffSelect.vue';
import { getToken } from '@/utils';
const filterData = ref<any>({});
import type { SearchFormControlProps } from '@yto/custom';

const handleSearch = () => {
  console.log(filterData.value);
};
const list: SearchFormControlProps[] = [
  {
    el: 'input',
    label: '搜索组件',
    field: 'input0',
    defaultValue: '我是默认值，重置后我还会回来的',
  },
  {
    el: 'select',
    label: '搜索组件',
    field: 'input1',
    options: [
      {
        label: 'name',
        value: 0,
      },
      {
        label: 'age',
        value: 1,
      },
    ],
  },
  {
    el: 'switch',
    label: '搜索组件',
    field: 'input2',
  },
  {
    el: 'checkbox',
    label: '搜索组件',
    field: 'input3',
  },
  {
    el: 'date-picker',
    label: '搜索组件',
    field: 'input4',
  },
  {
    el: 'input',
    label: '搜索组件',
    field: 'input5',
  },
  {
    label: '远程搜索',
    field: 'input6',
    render: (_value: any) => <CustomStaffSelect v-model={_value.value} />,
  },
  {
    el: 'select',
    label: '远程搜索2',
    isRemote: true,
    field: 'input7',
    remoteProps: {
      url: '/api/v2/allopttag',
      valueKey: 'id',
      labelKey: 'name',
      isRemoteSearch: false,
      requestParams: {
        page: 1,
        size: 100,
      },
      requestHeaders: {
        authorization: getToken(),
      },
    },
  },
];
</script>
