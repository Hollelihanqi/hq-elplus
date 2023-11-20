<template>
  <div class="search-box">
    <!-- <yto-c-staff-search v-model="user" key="3"></yto-c-staff-search>
    <CustomLeakagewaySelect key="1" v-model="user2" multiple ref="testInstance" /> -->
    <!-- <yto-c-user-search v-model="user2" url="" :requestApi="getList"></yto-c-user-search> -->
    <TestSearch />
    <el-button @click="testInstance.testFun()">test</el-button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import CustomLeakagewaySelect from "./CustomLeakagewaySelect.vue";
import TestSearch from "./TestSearch.vue";
import { request } from "@yto/utils";

const user = ref("");
const user2 = ref("");
const testInstance = ref();
const _headers = () => {
  let token = sessionStorage.getItem("authorization") as string;
  if (token) {
    if (token.indexOf('"') !== -1) {
      const regex = /^"(.*)"$/;
      const matches: any = token.match(regex);
      token = matches[1];
    }
  }
  return {
    authorization: token,
  };
};
const getList = (keywords: string) => {
  console.log("开始调用 getList");
  console.log(keywords);
  return new Promise((resolve, reject) => {
    request
      .request({
        baseURL: "",
        url: "/category/user/searchUser",
        method: "get",
        params: {
          keyword: keywords,
        },
        headers: _headers,
      })
      .then((res: any) => {
        resolve(res.results);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};
</script>
<style lang="scss" scoped>
.search-box {
  width: 500px;
  padding: 60px;
}
</style>
