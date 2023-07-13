<template>
  <div class="basic-com">
    <yto-c-remote-search
      v-model="user"
      baseURL=""
      url="/service-api/index/user/search"
      remote
      searchField="keyword"
      valueKey="userCode"
      labelKey="userName"
      :dataCallback="dataCallback"
    ></yto-c-remote-search>
  </div>
</template>
<script lang="tsx" setup>
const user = ref("");
const dataCallback = (data: any) => {
  return data.results.map((item: any) => {
    return { ...item };
  });
};
</script>
<style lang="scss" scoped>
.basic-com {
  padding: 16px;
}
</style>
