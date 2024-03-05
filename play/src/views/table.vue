<template>
  <div class="flex flex-col overflow-hidden p-[16px]">
    <yto-c-table
      ref="YtoTableInstance"
      :columns="columns"
      :request-api="getList"
      show-summary
      :tool-bar="false"
      :show-hide-fields="ShowHiddenFieldKeys2"
    >
      <!-- <template #callStatus="scope">
      <span>{{ scope.row.status }}</span>
    </template> -->
      <!-- <template #append>
        <div class="bg-yellow-500 h-[50px]">total</div>
      </template> -->
      <template #tableHeader>
        <div>
          <el-button @click="settting">设置</el-button>
        </div>
      </template>
    </yto-c-table>
  </div>
</template>
<script lang="tsx" setup>
import { TableProps } from "@yto/custom";
import request from "../request";
const ShowHiddenFieldKeys = ["id", "title", "level", "status"];
const ShowHiddenFieldKeys2 = {
  fields: ["id", "title", "level", "status"],
  showFields: ["id", "title", "level"],
};

const YtoTableInstance = ref();
const settting = () => {
  YtoTableInstance.value.setting();
};
const columns = [
  {
    label: "事件编号",
    prop: "id",
    width: 160,
    copy: true,
  },
  {
    label: "事件名称",
    prop: "title",
  },
  { label: "事件类型", prop: "source", width: 120 },
  { label: "上报来源", prop: "cate", width: 120 },
  {
    label: "泄漏途径",
    prop: "leakages_way",
    width: 120,
  },
  {
    label: "事件等级",
    prop: "level",
    sortable: "custom",
    align: "right",
    width: 120,
  },
  {
    label: "状态",
    prop: "status",
    align: "center",
    width: 100,
  },
  {
    label: "创建人",
    prop: "report_person",
    width: 100,
  },
  { label: "创建时间", prop: "c_time", width: 170 },
  {
    label: "逾期统计",
    width: 180,
  },
  { label: "操作", prop: "action", fixed: "right", align: "center" },
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

const getList = (params = {}) => {
  const _params = {};
  return request.request({
    url: "/v2/incident",
    params,
  });
  // return Promise.resolve({ items: [], total: 0 });
};
const getList2 = (params = {}) => {
  const _params = {};
  return request.request({
    url: "v2/alert/detail",
    method: "POST",
    data: {
      searchOrgCode: 999999,
      hash: "26bf78636b742dc58a05ce36674213cb",
      pageNum: 0,
      pageSize: 20,
    },
  });
};

const dataCallback = (data: any) => {
  console.log(data);
  return {
    items: tableData,
  };
};
</script>
