<template>
  <div class="table-w h-[100%] flex flex-col">
    <div v-if="$slots.tableHeader || toolBar" class="table-header flex items-center">
      <div class="flex-1 flex items-center">
        <slot name="tableHeader"></slot>
        <div v-if="toolBar" :class="`flex justify-end px-[8px] ${$slots.tableHeader ? '' : 'flex-1'}`">
          <el-button :icon="Setting" circle @click="handleSetting" />
        </div>
      </div>
    </div>
    <el-table
      ref="ElTableInstance"
      v-loading="requestApi ? _loading : loading"
      class="my-el-table w-[100%]"
      :class="{ 'pagination-hide-table': !cpaginationShow, 'flex-1': !isDataEmpty || !_showSummary }"
      :data="_tdata"
      :default-sort="_defaultSort"
      v-bind="$attrs"
      @sort-change="handleSortChange"
    >
      <!-- 默认插槽 -->
      <slot></slot>

      <template v-if="isDataEmpty" #append>
        <slot name="append"></slot>
      </template>
      <template #empty>
        <slot name="empty"></slot>
      </template>

      <template v-for="item in _columns" :key="item">
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

      <slot name="inAction"></slot>
    </el-table>
    <div v-if="_showSummary" class="flex-1 opacity-0 h-0 phd"></div>
    <el-pagination
      v-if="cpaginationShow"
      v-model:page-size="paginationParams.pageSize"
      v-model:current-page="paginationParams.currentPage"
      class="my-el-pagination"
      :layout="layout"
      :total="_total"
      :page-sizes="pageSizes"
      v-bind="paginationOptions"
      @update:page-size="handleSizeChange"
      @update:current-page="handlePageChange"
    ></el-pagination>
  </div>
  <SettingV ref="SettingInstance" :columns="setColumns" @on-save="HandleSetSave" />
</template>

<script lang="tsx" setup name="Table">
import { ref, onMounted, defineEmits } from 'vue';
import { Props } from './props';
import TableColumn from './components/TableColumn.vue';
import SettingV from './components/Setting.vue';
import { Setting } from '@element-plus/icons-vue';
import useController from './use-controller';
export interface ColumnsItemProps {
  [propsName: string]: any;
}

const props = defineProps(Props);
const { _columns, setColumns, SettingInstance, handleSetting, HandleSetSave } = useController(props);

const ElTableInstance = ref();
const emits = defineEmits(['on-table']);
// const { total, pageSizes } = toRefs(props) as any;
const _loading = ref(false);
const _tableData = ref<any>([]);
const _tableDataTotal = ref(0);
const _showSummary = ref(false);

const paginationParams = reactive({
  currentPage: props.currentPage,
  pageSize: props.pageSize,
});

let _sortItem: any = null;
const _sortFormat = (item?: any) => {
  if (item && item.order) {
    return {
      sortField: item.prop,
      sortBy: item.order === 'descending' ? 'desc' : 'asc',
    };
  }
  return {};
};

const _total = computed(() => {
  return props.requestApi ? _tableDataTotal.value : props.total;
});

const _tdata = computed(() => {
  return props.requestApi ? _tableData.value : props.tableData;
});

const _lastPage = computed(() => {
  return Math.ceil(_tableDataTotal.value / paginationParams.pageSize) || 1;
});

const _defaultSort = computed(() => {
  return props.defaultSort && typeof props.defaultSort === 'function'
    ? props.defaultSort()
    : props.defaultSort
    ? props.defaultSort
    : {
        prop: '',
        order: '',
      };
});

const isDataEmpty = computed(() => {
  return props.requestApi ? _tableData.value.length : props.tableData.length;
});

const cpaginationShow = computed(() => {
  // 返回一个布尔值，当不隐藏分页，或者自动隐藏且页面尺寸小于总数时显示
  return !(props.paginationHide || (props.paginationHideAuto && props.pageSize >= _total.value));
});

const _sortFun = props.sortFormat || _sortFormat;
const _sortFieldFormat = (sort?: any) => {
  const curSort = sort || _sortItem || _defaultSort.value;
  if (curSort) {
    return _sortFun(curSort);
  }
  return {};
};

const getTableData = async (params = {}) => {
  if (!props.requestApi || typeof props.requestApi !== 'function') return;
  _loading.value = props.requestLoadingHide ? false : true;
  let _requestParams = props.requestParams;
  if (typeof props.requestParams === 'function') {
    _requestParams = props.requestParams();
  }
  const _params: any = {
    ..._sortFieldFormat(),
    ..._requestParams,
    ...params,
  };
  if (!props.paginationHide) {
    _params[props.currentPageKey] =
      props.pageLimit === 0 ? paginationParams.currentPage - 1 : paginationParams.currentPage;
    _params[props.pageSizeKey] = paginationParams.pageSize;
  }
  try {
    let result = (await props.requestApi(_params)) || [];
    _loading.value = false;
    if (props.dataCallback && typeof props.dataCallback === 'function') {
      result = props.dataCallback(result);
    }
    if (Array.isArray(result)) {
      _tableData.value = result;
      _tableDataTotal.value = 0;
    } else {
      _tableData.value = result[props.dataKey] || [];
      _tableDataTotal.value = result.total || 0;
    }
    await nextTick();
    props.dataUpdateAfter(_params, result);
  } catch (error) {
    _loading.value = false;
    console.error('表格请求数据发生错误...');
    console.error(error);
    return Promise.reject(error);
  }
};

const handlePaginationChange = (type: 'size' | 'page' | 'sort', num: number): void => {
  if (type === 'size') {
    paginationParams.currentPage = 1; // 只有在改变大小时才重置当前页码
    paginationParams.pageSize = num;
  }

  emits(
    'on-table',
    type,
    {
      currentPage: paginationParams.currentPage,
      pageSize: type === 'size' ? num : paginationParams.pageSize,
    },
    _sortItem
  );

  // 如果不需要通过API请求数据，则直接调用tableChange
  if (props.tableChange && typeof props.tableChange === 'function') {
    props.tableChange(type, num);
  }

  // 如果设置为调用API，则获取表格数据
  // if (props.tableActionIsCallApi &&  _total.value !== _tdata.value.length) {
  //   getTableData();
  // }
  if (props.tableActionIsCallApi) {
    getTableData();
  }
};

// 用于分页大小变化
const handleSizeChange = (num: number): void => {
  handlePaginationChange('size', num);
};

// 用于分页页码变化
const handlePageChange = (num: number) => {
  handlePaginationChange('page', num);
};

// 用于表格排序
const handleSortChange = (item: { prop: string; order: string; column: any }) => {
  _sortItem = item && item.order ? item : null;
  paginationParams.currentPage = 1;
  emits('on-table', 'sort', item);
  // 为了兼容以前旧的 api
  if (props.tableChange && typeof props.tableChange === 'function') {
    props.tableChange('sort', item);
  }
  // 如果设置为调用API，则获取表格数据
  if (props.tableActionIsCallApi && !props.tableChange) {
    getTableData(_sortFieldFormat(item));
  }
};

const updateTableData = (params = {}) => {
  getTableData(params);
};

const resetTableData = (params = {}) => {
  paginationParams.currentPage = 1;
  paginationParams.pageSize = props.pageSize;
  getTableData(params);
};

const resetPage = () => {
  paginationParams.currentPage = 1;
  paginationParams.pageSize = props.pageSize;
};

const updatePage = (obj: { currentPage?: number; pageSize?: number }) => {
  paginationParams.currentPage = obj?.currentPage || 1;
  paginationParams.pageSize = obj?.pageSize || props.pageSize;
};

const getData = () => {
  return _tableData.value;
};

watch(
  () => _tdata.value,
  () => {
    if (
      !_tdata.value.length &&
      _lastPage.value === paginationParams.currentPage - 1 &&
      paginationParams.currentPage > 1
    ) {
      updatePage({ ...paginationParams, currentPage: paginationParams.currentPage - 1 });
      updateTableData();
    }
  }
);

onMounted(() => {
  _showSummary.value = ElTableInstance.value?.showSummary;
  if (props.requestAuto) {
    getTableData();
  }
});

defineExpose({
  ElTableInstance,
  updateTableData,
  resetTableData,
  resetPage,
  updatePage,
  getData,
  setting: handleSetting,
  tableData: _tdata,
});
</script>
<style lang="scss">
@import './index.scss';
</style>
