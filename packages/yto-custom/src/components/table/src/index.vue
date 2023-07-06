<template>
  <ElConfigProvider :locale="zhCn">
    <div class="table-w h-[100%] flex flex-col">
      <div v-if="$slots.tableHeader" class="table-header flex items-center"></div>
      <el-table
        v-loading="loading"
        class="my-el-table"
        :style="styles"
        :data="requestApi ? _tableData : tableData"
        v-bind="$attrs"
      >
        <!-- 默认插槽 -->
        <slot></slot>
        <template v-for="item in columns" :key="item">
          <!-- selection || index -->
          <el-table-column
            v-if="item.type == 'selection' || item.type == 'index'"
            v-bind="item"
            :align="item.align ?? 'center'"
            :reserve-selection="item.type == 'selection'"
          >
          </el-table-column>
          <!-- expand 支持 tsx 语法 && 作用域插槽 (tsx > slot) -->
          <el-table-column
            v-else-if="item.type == 'expand'"
            v-slot="scope"
            v-bind="item"
            :align="item.align ?? 'center'"
          >
            <component :is="item.render" v-if="item.render" :row="scope.row"> </component>
            <slot v-else :name="item.type" :row="scope.row"></slot>
          </el-table-column>
          <!-- other 循环递归 -->
          <TableColumn v-else :column="item">
            <template v-for="slot in Object.keys($slots)" #[slot]="scope">
              <slot :name="slot" :row="scope.row"></slot>
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
import { PropType, ref, onMounted } from "vue";
import { PaginationProps, ElConfigProvider } from "element-plus";
import TableColumn from "./components/TableColumn.vue";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

export interface ColumnsItemProps {
  [propsName: string]: any;
}

type CanWrite<T> = {
  -readonly [K in keyof T]?: T[K];
};

const styles = {
  width: "100%",
  flex: 1,
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
    type: Object,
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
});

const {
  tableData,
  columns,
  cellEmptyText,
  dataKey,
  dataCallback,
  requestParams,
  paginationHide,
  paginationOptions,
  layout,
  total,
  pageSize,
  pageSizes,
  currentPage,
  requestApi,
  currentPageKey,
  pageSizeKey,
  tableChange,
  requestAuto,
} = toRefs(props) as any;
const loading = ref(false);
const _tableData = ref([]);
const _tableDataTotal = ref(0);
const paginationParams = ref({
  currentPage: currentPage,
  pageSize: pageSize,
});

const getTableData = async (params = {}) => {
  loading.value = true;
  const _params: any = {
    ...requestParams,
    ...params,
  };
  if (!paginationHide) {
    _params[currentPageKey] = paginationParams.value.currentPage;
    _params[pageSizeKey] = paginationParams.value.pageSize;
  }
  try {
    let result = await requestApi(_params);
    loading.value = false;
    if (dataCallback && typeof dataCallback === "function") {
      result = dataCallback(result);
    }
    _tableData.value = result[dataKey];
    _tableDataTotal.value = result.total || 0;
  } catch (error) {
    loading.value = false;
    console.error("表格请求数据发生错误...");
    console.error(error);
  }
};

const handleSizeChange = (val: number): void => {
  if (!requestApi) {
    tableChange("size", val);
  } else {
    getTableData();
  }
};

const handlePageChange = (num: number) => {
  if (!requestApi) {
    tableChange("page", num);
  } else {
    getTableData();
  }
};

const updateTableData = (params = {}) => {
  getTableData(params);
};

const resetTableData = () => {
  paginationParams.value.currentPage = 1;
  paginationParams.value.pageSize = props.pageSize;
  getTableData();
};

const getData = () => {
  return _tableData.value;
};

onMounted(() => {
  if (requestApi && requestAuto && typeof requestApi === "function") {
    getTableData();
  }
});

defineExpose({
  updateTableData,
  resetTableData,
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
:deep(.el-table__inner-wrapper::before) {
  display: none;
}
:deep(.my-el-pagination) {
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
</style>
<style lang="scss">
.el-card__body .table-w {
  padding: 0;
}
.el-card__body .my-el-pagination {
  margin-top: 16px;
}
</style>
