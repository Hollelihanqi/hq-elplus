<!--
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2024-03-20 17:08:07
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2024-05-08 09:47:24
 * @FilePath: \yto-engine\play\src\views\demo\table.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <yto-c-table :columns="columns" :table-data="tableData" :total="total" tool-bar :show-hide-fields="showHideFields">
    <template #tableHeader>
      <el-button @click="_show = !_show">显示列</el-button>
    </template>
  </yto-c-table>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const total = 60;
const paginationParams = ref({
  pageNum: 1,
  pageSize: 10,
});

const showHideFields = ["name", "sex"];
// 分页选择
const handleTableChange = async (type: string, num: number) => {
  type === "page" && (paginationParams.value.pageNum = num);
  if (type === "size") {
    //页码重置
    paginationParams.value.pageNum = 1;
    paginationParams.value.pageSize = num;
  }
};

const tableData = [
  {
    id: 1,
    name: "魏春霈",
    age: "26岁",
    sex: "男",
    isWife: "未婚",
    dream: "妻妾成群",
  },
  {
    id: 2,
    name: "李涵祺",
    age: "26岁",
    sex: "男",
    isWife: "未婚",
    dream: "你好，我是 李涵祺",
  },
  {
    id: 3,
    name: "闫萌",
    age: "26岁",
    sex: "女",
    isWife: "已婚",
    dream: "按时下班",
  },
  {
    id: 4,
    name: "李炳儒",
    age: "26岁",
    sex: "男",
    isWife: "已婚",
    dream: "有为青年",
  },
  {
    id: 5,
    name: "柯发泽",
    age: "26岁",
    sex: "男",
    isWife: "已婚",
    dream: "天天发财",
  },
];

const _show = ref(false);
// 列配置
const columns = [
  {
    label: "姓名",
    prop: "name",
    width: 100,
    // hide: () => _show.value,
  },
  {
    label: "年龄年龄",
    prop: "age",
    align: "right",
    sortable: "custom",
  },
  {
    label: "性别",
    prop: "sex",
  },
  {
    label: "是否已婚",
    prop: "isWife",
  },
  {
    label: "梦想",
    prop: "dream",
    hide: () => _show.value,
  },
];
</script>
