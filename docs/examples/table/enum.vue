<template>
  <yto-c-table
    :columns="columns"
    :table-data="tableData"
    :total="total"
    :current-page="paginationParams.pageNum"
    :page-size="paginationParams.pageSize"
    :handle-change="handleTableChange"
  ></yto-c-table>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const total = 60;
const paginationParams = ref({
  pageNum: 1,
  pageSize: 10,
});

// 分页选择
const handleTableChange = async (type: string, num: number) => {
  type === "page" && (paginationParams.value.pageNum = num);
  if (type === "size") {
    //页码重置
    paginationParams.value.pageNum = 1;
    paginationParams.value.pageSize = num;
  }
};

const statusEnum = {
  disabled: "禁用",
  enable: "启用",
  other: "其它",
};

const levelEnum = [
  { label: "高级", value: 1 },
  { label: "中级", value: 2 },
  { label: "低级", value: 3 },
];

// 列配置
const columns = [
  {
    label: "调用方编码",
    prop: "callerCode",
  },
  {
    label: "调用方名称",
    copy: true,
    prop: "callerName",
  },
  {
    label: "等级",
    prop: "level",
    enum: levelEnum,
  },
  {
    label: "调用状态",
    prop: "status",
    enum: statusEnum,
  },
  {
    label: "最后调用时间",
    prop: "lastCallTime",
  },
];

const tableData = [
  {
    callerCode: "YTO-5464564",
    callerName: "CALL-NAME",
    level: 1,
    status: "disabled",
    lastCallTime: "2023.01.10",
  },
  {
    callerCode: "YTO-5464564",
    callerName: "CALL-NAME",
    level: 2,
    status: "enable",
    lastCallTime: "2023.01.10",
  },
  {
    callerCode: "YTO-5464564",
    callerName: "CALL-NAME",
    level: 3,
    status: "other",
    lastCallTime: "2023.01.10",
  },
];
</script>
