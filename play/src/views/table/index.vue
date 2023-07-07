<!--
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2023-02-28 20:59:36
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2023-03-31 15:59:23
 * @FilePath: \xlfk-vite-vue3\src\views\complianceManagement\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="table-box">
    <yto-c-table :columns="columns" :request-api="getList"> </yto-c-table>
  </div>
</template>
<script lang="tsx" setup>
import { getList } from "./api";

// 表格配置项
const columns = [
  {
    label: "ID",
    prop: "id",
  },
  {
    label: "标签",
    prop: "name",
  },
  {
    label: "描述",
    prop: "desc",
  },
];
</script>
<style lang="scss" scoped>
.table-box {
  height: 100%;
  :deep(.table-w) {
    padding: 16px;
  }
}
</style>
