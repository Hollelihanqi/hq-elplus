<template>
  <div class="p-5">
    <yto-c-user-search v-model="user1"></yto-c-user-search>
    <!-- <yto-c-remote-search v-model="user" remote valueKey="userCode" :requestApi="getList"></yto-c-remote-search> -->
  </div>
</template>
<script lang="ts" setup>
import { h, ref } from "vue";
import _request from "../request";

const user1 = ref("");
const user = ref("");
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
const getList = async (keywords: string) => {
  return new Promise((resolve, reject) => {
    _request
      .request({
        baseURL: "",
        url: "/api/category/user/searchUser",
        method: "get",
        params: {
          keyword: keywords,
        },
        headers: _headers(),
      })
      .then((res: any) => {
        console.log("res_____", res);
        resolve([]);
      })
      .catch((error: any) => {
        console.log("error_____________", error);
        reject(error);
      });
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
