<template>
    <div class="table-w" :class="paginationFixed ? 'table-bt60' : ''">
        <yto-table ref="tableRef" :data="tableData" style="width: 100%" class="my-table"
            header-cell-class-name="my-header-cell" height="20vh" v-bind="$attrs" @cell-dblclick="copyValue">
            <template v-for="(item, index) in columns" :key="index">
                <yto-table-column v-if="item.hideCell" show-overflow-tooltip v-bind="item" />
                <yto-table-column v-if="item.type" v-bind="item" />
                <yto-table-column v-if="!item.hideCell && !item.type" show-overflow-tooltip v-bind="item">
                    <template v-if="item.filteredValue && item.filteredValue.length > 0" #header>
                        <div class="flex">
                            <div class="yto-flex-1">{{ item.label }}</div>
                            <div class="flex aic">
                                <icon-copy />
                            </div>
                        </div>
                    </template>
                    <template #default="scope">
                        <slot v-if="item.slot" :name="item.slot" :index="scope.$index" :row="scope.row"></slot>
                        <template v-else-if="item.formatText">{{ item.formatText(scope.row) }}</template>
                        <template v-else>{{ item.prop && scope.row[item.prop] }}</template>
                    </template>
                </yto-table-column>
            </template>
        </yto-table>
        <yto-pagination v-if="!paginationHide" class="my-pagination"
            :class="paginationFixed ? 'pagination-box-fixed' : ''" layout="total, sizes, prev, pager, next, jumper"
            :total="total" :page-sizes="pageSizes" :page-size="pageSize" :current-page="currentPage"
            @size-change="handleSizeChange" @current-change="handleTableChange"></yto-pagination>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import IconCopy from "@/icons/IconCopy.vue"
export interface ColumnsItemProps {
    [propsName: string]: any;
}

export default defineComponent({
    components: { IconCopy },
    directives: {
        loading: {
            // 指令的定义
            mounted(el: HTMLElement) {
                console.log(el.querySelector(".el-table__empty-text"));
            },
        },
        hoverTip: {
            // 指令的定义
            mounted(el: HTMLElement) {
                console.log(el);
            },
        },
    },
    props: {
        tableData: {
            type: Array,
            default: () => [],
            required: true,
        },
        columns: {
            type: Array as PropType<ColumnsItemProps[]>,
            default: () => [],
            required: true,
        },
        paginationHide: {
            // 是否隐藏分页组件
            type: Boolean,
            default: false,
        },
        paginationFixed: {
            // 分页组件是否固定在底部
            type: Boolean,
            default: false,
        },
        total: {
            type: Number,
            default: 0,
        },
        pageSizes: {
            type: Array,
            default: () => [15, 30, 50, 100],
        },
        pageSize: {
            type: Number,
            default: 10,
        },
        currentPage: {
            type: Number,
            default: 1,
        },
        handleChange: {
            type: Function,
            default: null,
        },
    },

    setup(props) {
        const load = () => { };
        const handleTableChange = (num: number) => {
            if (props.handleChange && typeof props.handleChange === "function") {
                props.handleChange("page", num);
            }
        };
        const handleSizeChange = (val: number): void => {
            if (props.handleChange && typeof props.handleChange === "function") {
                props.handleChange("size", val);
            }
        };

        const copyValue = (row: any, column: any, cell: any, event: any) => {
            if (column.filteredValue.length === 0) return;
            let _str = "";
            column.filteredValue.forEach((item: string) => {
                _str = _str + row[item];
            })
            let inputEle = document.createElement("input");
            document.body.appendChild(inputEle)
            inputEle.value = _str;
            inputEle.select();
            document.execCommand("Copy");
            inputEle.remove();
            window._globalProperties.$message.success("复制成功");
        }

        const tableRef = ref();
        const tableClearSelection = () => {
            tableRef.value.clearSelection();
        }

        return {
            handleTableChange,
            handleSizeChange,
            load,
            copyValue,
            tableClearSelection,
            tableRef,
        };
    },
});
</script>
<style lang="scss" scoped>
.table-w {
    height: 100%;
    @extend .df;
    @extend .fdc;
}

.my-table {
    flex: 1;
}

.table-w :deep(.my-header-cell) {
    background: rgba(0, 0, 0, 0.02) !important;
    height: 48px;

    .cell {
        color: rgba(0, 0, 0, 0.85);
        border-right: 1px solid rgba(0, 0, 0, 0.06);
    }

    .cell:last-child {
        //border-right: none;
    }
}

.my-table::before {
    display: none;
}

:deep(.el-table__fixed::before) {
    display: none;
}

.my-notooltip-text {
    display: block;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

// 分页
.my-pagination {
    padding: 16px;
    @extend .df;
    justify-content: flex-end;
    align-items: center;
}

.my-pagination :deep(.el-pagination__jump) {
    margin-left: 0;
}

:deep(.el-input__inner) {
    height: 32px !important;
}

:deep(.el-pager li) {
    width: auto !important;
    min-width: 32px !important;
}

:deep(.el-pagination span:not([class*=suffix]), .el-pagination button) {
    font-size: 14px;
}

// :deep(.btn-quicknext + li.number) {
//   display: none;
// }
:deep(.el-input__inner:focus) {
    border-color: $important-color !important;
}

.table-w :deep(.el-pager .active) {
    //background: $important-color !important;
    border-color: $important-color !important;
    color: $important-color !important;

    &:hover {
        color: $important-color !important;
    }
}

.table-w :deep(.btn-prev),
.table-w :deep(.btn-next),
.table-w :deep(.el-pager li) {
    width: 32px;
    height: 32px;
    line-height: 32px;
    background: #ffffff;
    border-radius: 2px;
    border: 1px solid #dcdee0;
    padding: 0;
    margin: 0;
    margin-right: 4px;

    &:hover {
        color: $important-color !important;
    }
}

:deep(.el-pagination span:not([class*=suffix]), .el-pagination button) {
    display: inline-block;
    font-size: var(--el-pagination-font-size);
    min-width: var(--el-pagination-button-width);
    height: var(--el-pagination-button-height);
    //line-height: var(--el-pagination-button-height);
    line-height: 36px;
    vertical-align: top;
    box-sizing: border-box;
}

.pagination-box-fixed {
    position: fixed;
    bottom: 41px;
    right: 8px;
    width: calc(100% - 224px);
    background: rgba(234, 236, 251);
    z-index: 666;
    padding-top: 10px;
    padding-bottom: 10px;
}

.table-bt60 {
    padding-bottom: 55px;
}

:deep(.stext-overflow-hide .cell) {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
</style>
  