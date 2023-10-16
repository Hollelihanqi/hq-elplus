<template>
  <yto-c-table
    :columns="columns"
    :table-data="tableData"
    :page-size="10"
    :total="30"
    :current-page="1"
    :tableChange="handleTableChange"
  >
    <!-- <template #callStatus="scope">
      <span>{{ scope.row.status }}</span>
    </template> -->
  </yto-c-table>
</template>
<script lang="ts" setup>
const columns = [
  {
    label: "序号",
    type: "index",
    width: 80,
  },
  {
    label: "调用方编码",
    prop: "callerCode",
  },
  {
    label: "调用方名称",
    prop: "callerName",
  },
  {
    label: "调用方负责人",
    prop: "ownerStr",
  },
  {
    label: "调用状态",
    prop: "status",
  },
  {
    label: "最后调用时间",
    prop: "lastCallTime",
  },
];

const tableData = [
  {
    callerCode: 0,
    callerName: undefined,
    ownerStr: null,
    status: "",
    lastCallTime: false,
  },
  {
    callerCode: "0",
    callerName: null,
    ownerStr: undefined,
    status: true,
    lastCallTime: "2023.01.10",
  },
];
const handleTableChange = (type: string, val: number) => {
  console.log("handleTableChange", type, val);
};
</script>
