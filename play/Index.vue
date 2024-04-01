<!--
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2023-02-28 20:59:36
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2023-03-31 15:59:23
 * @FilePath: \xlfk-vite-vue3\src\views\complianceManagement\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="view-w h-[100%] w-[100%]">
    <ProTable
      ref="ProTableInstance"
      :columns="columns"
      :request-api="getList"
      :search-col="{ xs: 1, sm: 2, md: 4, lg: 4, xl: 4 }"
    >
      <template #tableHeader>
        <el-button type="primary" @click="C2.actionDialog()">新增</el-button>
      </template>
      <template #action="scope">
        <el-button type="primary" link @click="handleView(scope.row)">查看</el-button>
      </template>
    </ProTable>
  </div>
  <Create ref="C2" />
  <EditTitle ref="C1" :form-model="formModel" />
</template>
<script lang="tsx" setup>
import ProTable from "@/components/ProTable/index.vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { EVENTLSTATUS, EVENTLEVEL_JSON, OVERDUE_TYPE } from "@/common/constants";
import Create from "./components/Create.vue";
import { getList } from "./api";
import { postMessageSend } from "@/utils";
import EditTitle from "./components/EditTitle.vue";
import { EditPen } from "@element-plus/icons-vue";
import _useRouter from "@/hooks/useRouter";

const { query, router } = _useRouter();
const C1 = ref();
const C2 = ref();
const formModel = reactive<any>({});
const ProTableInstance = ref<any>(null);
const requestParams = ref<any>({});

const handleView = (row: ColumnProps) => {
  if (window.self === window.top) {
    router.push({ path: "/new/eventManagementDetail", query: { id: row.id } });
  } else {
    postMessageSend(JSON.stringify({ path: "/eventManagementDetail", query: { id: row.id } }));
  }
};

onBeforeMount(() => {
  if (query.status) {
    requestParams.value.status = query.status;
  }
  if (query.startEndTime) {
    requestParams.value.startEndTime = query.startEndTime;
  }
});

const defaultStatus = () => {
  if (requestParams.value.status) {
    return requestParams.value.status.split(",").map(Number);
  }
  return [];
};
const defaultDateTimeRange = () => {
  if (requestParams.value.startEndTime) {
    if (typeof requestParams.value.startEndTime === "string") {
      return requestParams.value.startEndTime.split(",");
    }
    return requestParams.value.startEndTime;
  }
  return [];
};

onMounted(() => {
  window.addEventListener("message", (event) => {
    let action = "update";
    let params: any = {};
    if (event.data.action) {
      if (Object.keys(event.data.query).length) {
        if (event.data.query && event.data.query.status) {
          params.status = event.data.query.status.toString();
        }
        if (event.data.query && event.data.query.startEndTime) {
          params.startEndTime = event.data.query.startEndTime;
        }
      } else {
        params = {};
      }
    }
    requestParams.value = params;
    if (action === "update") {
      ProTableInstance.value.reset();
    }
  });
});

provide("tableInstance", ProTableInstance);

// 表格配置项
const columns: ColumnProps[] = [
  { label: "事件编号", prop: "id", width: 160, copy: true, search: { el: "input", key: "search" } },
  {
    label: "事件名称",
    prop: "title",
    render(scope) {
      return (
        <div class="flex items-center gap-2">
          <span>{scope.row.title}</span>
          <el-icon
            class="cursor-pointer"
            color="#3a7dff"
            onClick={() => {
              formModel.title = scope.row.title;
              formModel.id = scope.row.id;
              C1.value.actionDialog();
            }}
          >
            <EditPen />
          </el-icon>
        </div>
      );
    },
    search: {
      el: "input",
      key: "title",
      props: {
        clearable: true,
      },
    },
  },
  { label: "事件类型", prop: "source", width: 120 },
  { label: "上报来源", prop: "cate", width: 120 },
  {
    label: "泄漏途径",
    prop: "leakages_way",
    width: 120,
    render(scope) {
      return scope.row.leakages_way?.toString() || "--";
    },
    search: {
      el: "select",
      key: "leakages",
      remote: true,
      props: {
        remote: false,
        multiple: true,
        collapseTags: true,
      },
      remoteProps: {
        url: "/v2/risks_leakageway",
        isRemoteSearch: false,
        valueKey: "id",
        labelKey: "name",
        w: "100%",
      },
    },
  },
  {
    label: "商家",
    isShow: false,
    search: {
      el: "input",
      key: "seller_code",
      props: {
        clearable: true,
      },
    },
  },
  {
    label: "涉及运单",
    isShow: false,
    search: {
      el: "input",
      key: "waybill",
      props: {
        clearable: true,
      },
    },
  },
  {
    label: "事件等级",
    prop: "level",
    align: "center",
    width: 100,
    render: (scope) => {
      if (scope.row.level === null) return "--";
      const obj = EVENTLEVEL_JSON[scope.row.level];
      return (
        <el-tooltip
          class="box-item"
          effect="light"
          content={obj?.subText || obj?.label}
          showArrow={false}
          placement="bottom-start"
          popper-class="my-popper-class"
        >
          <base-tag effect="dark" cor={obj?.color}>
            {obj?.label}
          </base-tag>
        </el-tooltip>
      );
    },
  },
  {
    label: "状态",
    prop: "status",
    align: "center",
    width: 100,
    search: { el: "select", defaultValue: defaultStatus, props: { multiple: true } },
    enum: EVENTLSTATUS,
  },
  {
    label: "创建人",
    prop: "report_person",
    width: 100,
    search: {
      el: "select",
      remote: true,
      props: {
        placeholder: "请输入用户编号/姓名",
      },
      remoteProps: {
        url: "/v2/searchEmployees",
        fieldName: "search",
        valueKey: "id",
        labelKey: "selText",
        w: "100%",
        dataCallback: (data: any) => {
          return data.map((item: any) => {
            return { ...item, selText: `${item.name} (${item.id})` };
          });
        },
        optTemp: (item: any) => {
          return h(
            "div",
            {
              class: "option-c",
              style: {
                display: "flex",
                alignItems: "center",
              },
            },
            [
              h("span", {}, `${item.name} -`),
              h("span", {}, `${item.id} -`),
              h("span", {}, `${item.region_name} -`),
              h("span", {}, item.depart),
            ]
          );
        },
      },
    },
  },
  { label: "创建时间", prop: "c_time", width: 170 },
  {
    label: "逾期统计",
    width: 180,
    // 逾期统计 1:时效内 2:调查逾期 3:整改逾期 4:调查、整改都逾期
    render: (scope) => {
      if (scope.row.is_overdue === 1) {
        return <base-tag effect="plain">时效内</base-tag>;
      } else if (scope.row.is_overdue === 2 || scope.row.is_overdue === 3) {
        return (
          <base-tag effect="plain" type="danger">
            {scope.row.is_overdue === 2 ? "调查逾期" : "整改逾期"}
          </base-tag>
        );
      } else if (scope.row.is_overdue === 4) {
        return (
          <div class="flex gap-1">
            <base-tag effect="plain" type="danger">
              调查逾期
            </base-tag>
            <base-tag effect="plain" type="danger">
              整改逾期
            </base-tag>
          </div>
        );
      } else {
        return "--";
      }
    },
  },
  {
    label: "涉及网点",
    isShow: false,
    search: {
      el: "select",
      remote: true,
      key: "org_code",
      props: {
        placeholder: "请输入部门编号/网点编码",
      },
      remoteProps: {
        url: "/v2/searchDeparts",
        fieldName: "search",
        valueKey: "id",
        labelKey: "name",
        w: "100%",
        optTemp: (item: any) => {
          return h(
            "div",
            {
              class: "option-c",
              style: {
                display: "flex",
                alignItems: "center",
              },
            },
            [h("span", {}, `${item.name} -`), h("span", {}, `${item.id} -`), h("span", {}, `${item.region_name} -`)]
          );
        },
      },
    },
  },
  {
    label: "时间范围",
    isShow: false,
    search: {
      defaultValue: defaultDateTimeRange,
      el: "date-picker",
      key: "dateTimeRange",
      span: 2,
      props: {
        type: "datetimerange",
        clearable: true,
      },
    },
  },
  {
    label: "逾期统计",
    isShow: false,
    enum: OVERDUE_TYPE,
    search: {
      el: "select",
      key: "is_overdue",
      props: {
        multiple: true,
      },
    },
  },
  { label: "操作", prop: "action", width: 100, fixed: "right", align: "center" },
];
</script>
<style lang="scss">
/* .el-message-box {
    .el-input::after {
      display: inline-block;
      content: "条";
      padding-left: 8px;
    }
  }
  .my-popper-class {
    top: -10px !important;
    height: 28px;
    background: #fff2b2 !important;
    border: none !important;
    & > span {
      color: #343434;
    }
  } */
</style>
