<template>
  <component :is="renderColumn(column)"></component>
</template>

<script lang="tsx" setup>
import { useSlots } from "vue";
import { ElMessage } from "element-plus";

const props = defineProps({
  column: {
    type: Object,
    default: () => ({}),
  },
});
const slots = useSlots();
const formatEnum = (column: any, row: any) => {
  if (Array.isArray(column.enum)) {
    const target = column.enum.find((e: any) => e.value === row[column.prop]);
    return target.label || "";
  } else {
    return column.enum[row[column.prop]];
  }
};
// 复制
const handleCopyClick = (copyData = "") => {
  const input = document.createElement("input");
  console.log(copyData);
  input.value = copyData.toLocaleString();
  document.body.appendChild(input);
  input.select();
  document.execCommand("Copy");
  document.body.removeChild(input);
  ElMessage({
    type: "success",
    message: "复制成功",
  });
};

// 渲染表格数据
const renderCellData = (item: any, scope: any) => {
  return item.formatText
    ? item.formatText(scope.row)
    : item.enum
    ? formatEnum(item, scope.row)
    : (item.prop && scope.row[item.prop]) || "--";
};

const renderColumn = (column: any) => {
  return (
    <>
      {!column.hide && (
        <el-table-column show-overflow-tooltip {...column}>
          {{
            default: (scope: any) => {
              if (column._children) return column.map((child: any) => renderColumn(child));
              if (column.render) return column.render(scope);
              if (column.prop && slots[column.prop]) return slots?.[column.prop]?.(scope);
              if (column.copy)
                return (
                  <div
                    onClick={(e: any) => {
                      handleCopyClick(e.target.innerText);
                    }}
                  >
                    {renderCellData(column, scope)}
                  </div>
                );
              return renderCellData(column, scope);
            },
          }}
        </el-table-column>
      )}
    </>
  );
};
</script>
