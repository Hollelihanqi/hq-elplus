<template>
  <yto-c-table
    :columns="columns"
    :table-data="tableData"
    :total="total"
    :table-change="handleTableChange"
    row-key="id"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  >
  </yto-c-table>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const total = 60;
const paginationParams = ref({
  pageNum: 1,
  pageSize: 10,
});

// 分页选择
const handleTableChange = async (type: string, num: number) => {
  type === 'page' && (paginationParams.value.pageNum = num);
  if (type === 'size') {
    //页码重置
    paginationParams.value.pageNum = 1;
    paginationParams.value.pageSize = num;
  }
};

const tableData = [
  {
    id: 1,
    name: '魏春霈',
    age: '26岁',
    sex: '男',
    isWife: '未婚',
    dream: '妻妾成群',
  },
  {
    id: 2,
    name: '李涵祺',
    age: '26岁',
    sex: '男',
    isWife: '未婚',
    dream: '你好，我是 李涵祺',
  },
  {
    id: 3,
    name: '闫萌',
    age: '26岁',
    sex: '女',
    isWife: '已婚',
    dream: '按时下班',
    children: [
      {
        id: 31,
        name: '魏春霈',
        age: '26岁',
        sex: '男',
        isWife: '未婚',
        dream: '妻妾成群',
      },
      {
        id: 32,
        name: '李涵祺',
        age: '26岁',
        sex: '男',
        isWife: '未婚',
        dream: '你好，我是 李涵祺',
      },
    ],
  },
  {
    id: 4,
    name: '李炳儒',
    age: '26岁',
    sex: '男',
    isWife: '已婚',
    dream: '有为青年',
  },
  {
    id: 5,
    name: '柯发泽',
    age: '26岁',
    sex: '男',
    isWife: '已婚',
    dream: '天天发财',
  },
];

// 列配置
const columns = [
  {
    label: '姓名',
    prop: 'name',
  },
  {
    label: '年龄',
    prop: 'age',
  },
  {
    label: '性别',
    prop: 'sex',
  },
  {
    label: '是否已婚',
    prop: 'isWife',
  },
  {
    label: '梦想',
    prop: 'dream',
  },
];
</script>
