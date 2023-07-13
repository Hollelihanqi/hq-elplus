<template>
  <div class="basic-com">
    <h3>自定义 option</h3>
    <yto-c-remote-search
      v-model="user"
      baseURL=""
      url="/service-api/index/user/search"
      remote
      searchField="keyword"
      valueKey="userCode"
      labelKey="userName"
      :dataCallback="dataCallback"
      :optTemp="optTemp"
    ></yto-c-remote-search>
    <h3>自定义 label</h3>
    <yto-c-remote-search
      v-model="user2"
      baseURL=""
      url="/service-api/index/user/search"
      remote
      searchField="keyword"
      valueKey="userCode"
      labelKey="selText"
      placeholder="请输入用户编号/姓名"
      :dataCallback="dataCallback2"
      :optTemp="optTemp"
    ></yto-c-remote-search>
  </div>
</template>
<script lang="tsx" setup>
const user = ref("");
const user2 = ref("");
const dataCallback = (data: any) => {
  return data.results.map((item: any) => {
    return { ...item };
  });
};

const dataCallback2 = (data: any) => {
  return data.results.map((item: any) => {
    return { ...item, selText: `${item.userName} (${item.userCode})` };
  });
};

const optTemp = (item: any) => {
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
      h("span", {}, `${item.userName} -`),
      h("span", {}, `${item.userCode} -`),
      h("span", {}, `${item.deptName} -`),
      h("span", {}, item.jobName),
    ]
  );
};
</script>
<style lang="scss" scoped>
.basic-com {
  padding: 16px;
}
</style>
