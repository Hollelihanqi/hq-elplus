<template>
  <ElDrawer v-model="dialogVisible" direction="rtl" title="列筛选" size="360px" class="p-0 iel-drawer__bodyp0">
    <div class="h-[32px] w-full search-box flex items-center pl-[26px]">
      <el-icon><Search /></el-icon>
      <el-input placeholder="搜索" class="flex-1 h-full"> </el-input>
    </div>
    <div class="pl-[16px] pt-[12px]">
      <!-- <span class="text-[#262626] text-[14px] leading-[20px]">选定字段</span>
      <span class="text-[#262626] text-[14px] leading-[20px]">可用字段</span> -->
    </div>

    <div class="pl-[16px] flex flex-col">
      <template v-for="item in setColumns">
        <el-checkbox
          v-model="item.checked"
          :checked="item.checked"
          size="large"
          :disabled="item.disabled"
          @change="handleChange"
        >
          <span>{{ item.label }}</span>
        </el-checkbox>
      </template>
    </div>
    <template #footer>
      <div class="flex items-center justify-end">
        <el-button type="default" @click="handleSCancel">取消</el-button>
        <el-button type="primary" @click="handleSReture">恢复默认</el-button>
        <el-button type="primary" @click="handleSSave">保存</el-button>
      </div>
    </template>
  </ElDrawer>
</template>
<script lang="ts" setup>
import { ElDrawer } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import type { TableProps, ColumnsItemProps } from "../interface";
import { useRoute } from "vue-router";

const props = defineProps({
  tprops: {
    type: Object as PropType<TableProps>,
    default: null,
  },
});
const emits = defineEmits(["on-save"]);

interface setColumnsProps {
  label: string;
  prop: string;
  checked: boolean;
  disabled: boolean;
}
const setColumns = ref<any>([]);
const dialogVisible = ref(false);
const actionDialog = (): void => {
  getShowHideColumns();
  dialogVisible.value = true;
};
const _route = useRoute();

const handleChange = () => {
  console.log(setColumns.value);
};

const handleSCancel = () => {
  dialogVisible.value = false;
  setColumns.value = [];
};
const handleSSave = () => {
  emits("on-save", setColumns.value);
  props.tprops.tableKey && window.localStorage.setItem(props.tprops.tableKey, JSON.stringify(setColumns.value));
};
const handleSReture = () => {
  //
};

const getShowHideColumns = () => {
  const isChecked = (prop: string) => {
    const { showHideFields } = props.tprops as any;
    if (Array.isArray(showHideFields) && showHideFields.includes(prop)) {
      return {
        checked: showHideFields.includes(prop),
        prop,
      };
    }
    if (showHideFields?.fields && showHideFields?.showFields && showHideFields.fields.includes(prop)) {
      return {
        checked: showHideFields.fields.includes(prop) && showHideFields.showFields.includes(prop),
        prop,
      };
    }
    return true;
  };
  setColumns.value = props.tprops?.columns.map((item: ColumnsItemProps) => {
    const isColumnChecked = isChecked(item.prop as string);
    const checkedValue = typeof isColumnChecked === "boolean" ? isColumnChecked : isColumnChecked.checked;
    return {
      label: item.label,
      prop: item.prop,
      checked: checkedValue,
      disabled: isColumnChecked === true ? true : false,
    };
  });
};
const getCacheColumns = () => {
  let columns = window.localStorage.getItem(_route.path) as any;
  if (!columns) return;
  try {
    columns = JSON.parse(columns);
    // _columns.value = columns;
  } catch (error) {
    console.error("getCacheColumns 解析失败--", error);
  }
};

onBeforeMount(() => {
  //   getShowHideColumns();
});
defineExpose({
  actionDialog,
});
</script>
<style lang="scss">
.iel-drawer__bodyp0 {
  .el-drawer__body {
    padding: 0;
    border-bottom: 1px solid #dcdfe6;
  }
  .el-drawer__footer {
    padding: 12px 16px;
  }
  .search-box {
    border: 1px solid #dcdfe6;
    border-left: 0;
    border-right: 0;
    .el-input {
      border: none;
      box-shadow: none;
    }
    .el-input__wrapper {
      box-shadow: none;
    }
  }
}
</style>
