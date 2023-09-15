<template>
  <ElConfigProvider :locale="zhCn">
    <div class="table-w h-[100%] flex flex-col">
      <div v-if="$slots.tableHeader" class="table-header flex items-center">
        <slot name="tableHeader"></slot>
      </div>
      <el-table
        v-loading="requestApi ? _loading : loading"
        ref="ElTableInstance"
        class="my-el-table flex-1 w-[100%]"
        :class="{ 'header-bg-hide': !headerbgHide, 'pagination-hide-table': paginationHide }"
        :data="requestApi ? _tableData : tableData"
        v-bind="$attrs"
      >
        <!-- 默认插槽 -->
        <slot></slot>
        <template v-for="item in columns" :key="item">
          <!-- selection || index -->
          <el-table-column
            v-if="item.type === 'selection' || item.type === 'index'"
            v-bind="item"
            :align="item.align ?? 'center'"
            :reserve-selection="item.type === 'selection'"
          >
          </el-table-column>
          <!-- expand 支持 tsx 语法 && 作用域插槽 (tsx > slot) -->
          <el-table-column
            v-else-if="item.type === 'expand'"
            v-slot="scope"
            v-bind="item"
            :align="item.align ?? 'center'"
          >
            <component :is="item.render" v-if="item.render" :row="scope.row" v-bind="scope"> </component>
            <slot v-else :name="item.type" :row="scope.row"></slot>
          </el-table-column>
          <!-- other 循环递归 -->
          <TableColumn v-else :column="item">
            <template v-for="slot in Object.keys($slots)" #[slot]="scope">
              <slot :name="slot" :row="scope.row" :index="scope.$index" v-bind="scope"></slot>
            </template>
          </TableColumn>
        </template>
      </el-table>
      <el-pagination
        v-if="!paginationHide"
        v-model:page-size="paginationParams.pageSize"
        v-model:current-page="paginationParams.currentPage"
        class="my-el-pagination"
        :layout="layout"
        :total="requestApi ? _tableDataTotal : total"
        :page-sizes="pageSizes"
        v-bind="paginationOptions"
        @update:page-size="handleSizeChange"
        @update:current-page="handlePageChange"
      ></el-pagination>
    </div>
  </ElConfigProvider>
</template>

<script lang="tsx" setup name="Table">
import { PropType, ref, onMounted, defineEmits } from "vue";
import { PaginationProps, ElConfigProvider } from "element-plus";
import TableColumn from "./components/TableColumn.vue";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

export interface ColumnsItemProps {
  [propsName: string]: any;
}

type CanWrite<T> = {
  -readonly [K in keyof T]?: T[K];
};

const props = defineProps({
  tableData: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array as PropType<ColumnsItemProps[]>,
    default: () => [],
    required: true,
  },
  requestApi: {
    type: Function,
    default: null,
  },
  requestAuto: {
    type: Boolean,
    default: true,
  },
  dataKey: {
    type: String,
    default: "items",
  },
  dataCallback: {
    type: Function,
    default: null,
  },
  requestParams: {
    type: [Object, Function],
    default: () => ({}),
  },
  paginationHide: {
    // 是否隐藏分页组件
    type: Boolean,
    default: false,
  },
  paginationOptions: {
    type: Object as PropType<CanWrite<PaginationProps>>,
    default: () => ({}),
  },
  total: {
    type: Number,
    default: 0,
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default: () => [10, 30, 50, 100],
  },
  layout: {
    type: String,
    default: "total, sizes, prev, pager, next, jumper",
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  currentPageKey: {
    type: String,
    default: "page",
  },
  pageSizeKey: {
    type: String,
    default: "size",
  },
  tableChange: {
    type: Function,
    default: () => ({}),
  },
  cellEmptyText: {
    type: String,
    default: "--",
  },
  headerbgHide: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const ElTableInstance = ref();
const emits = defineEmits(["on-table"]);
const { total, pageSizes } = toRefs(props) as any;
const _loading = ref(false);
const _tableData = ref([]);
const _tableDataTotal = ref(0);
const paginationParams = reactive({
  currentPage: props.currentPage,
  pageSize: props.pageSize,
});

const getTableData = async (params = {}) => {
  _loading.value = true;
  let _requestParams = props.requestParams;
  if (typeof props.requestParams === "function") {
    _requestParams = props.requestParams();
  }
  const _params: any = {
    ..._requestParams,
    ...params,
  };
  if (!props.paginationHide) {
    _params[props.currentPageKey] = paginationParams.currentPage;
    _params[props.pageSizeKey] = paginationParams.pageSize;
  }
  try {
    let result = await props.requestApi(_params);
    _loading.value = false;
    if (props.dataCallback && typeof props.dataCallback === "function") {
      result = props.dataCallback(result);
    }
    _tableData.value = result[props.dataKey];
    _tableDataTotal.value = result.total || 0;
  } catch (error) {
    _loading.value = false;
    console.error("表格请求数据发生错误...");
    console.error(error);
  }
};

const handleSizeChange = (val: number): void => {
  paginationParams.currentPage = 1;
  emits("on-table", "size", { currentPage: 1, pageSize: val });
  if (!props.requestApi) {
    props.tableChange("size", val);
  } else {
    getTableData();
  }
};

const handlePageChange = (num: number) => {
  emits("on-table", "page", { currentPage: num, pageSize: paginationParams.pageSize });
  if (!props.requestApi) {
    props.tableChange("page", num);
  } else {
    getTableData();
  }
};

const updateTableData = (params = {}) => {
  getTableData(params);
};

const resetTableData = () => {
  paginationParams.currentPage = 1;
  paginationParams.pageSize = props.pageSize;
  getTableData();
};

const resetPagination = (obj?: { currentPage: number; pageSize: number }) => {
  paginationParams.currentPage = obj ? obj.currentPage : 1;
  paginationParams.pageSize = obj ? obj.pageSize : props.pageSize;
};

const getData = () => {
  return _tableData.value;
};

onMounted(() => {
  if (props.requestAuto && props.requestApi && typeof props.requestApi === "function") {
    getTableData();
  }
});

defineExpose({
  ElTableInstance,
  updateTableData,
  resetTableData,
  resetPagination,
  getData,
});
</script>
<style lang="scss" scoped>
.table-w {
  background: #fff;
  border-radius: 4px;
}
.table-header {
  margin-bottom: 15px;
}
:deep(.pagination-hide-table > div::before) {
  display: none;
}
:deep(.my-el-pagination) {
  display: flex;
  justify-content: flex-end;
  padding: 16px 16px 0 0;
  .btn-prev,
  .btn-next {
    border: 1px solid #dcdee0;
  }
  .el-pager {
    display: flex;
    align-items: "center";
    gap: 8px;
    padding: 0 8px;
    .number {
      border: 1px solid #dcdee0;
      &:hover {
        border: 1px solid var(--el-color-primary);
      }
    }
    .is-active {
      border: 1px solid var(--el-color-primary);
    }
  }
}
:deep(.header-bg-hide) {
  .el-table__header th {
    height: 45px;
    font-weight: bold;
    color: #252525;
    background: #fafafa;
  }
  .el-table__row {
    height: 45px;
  }
}
:deep(.my-el-table) {
  // 解决表格数据为空时样式不居中问题(仅在element-plus中)
  .el-scrollbar__view {
    height: 100%;
  }
}
</style>
