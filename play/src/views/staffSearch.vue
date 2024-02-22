<template>
  <div class="search-box flex items-center">
    <!-- <yto-c-staff-search v-model="user" key="3"></yto-c-staff-search>
    <CustomLeakagewaySelect key="1" v-model="user2" multiple ref="testInstance" /> -->
    <!-- <yto-c-user-search v-model="user2" url="" :requestApi="getList"></yto-c-user-search> -->
    <!-- <TestSearch /> -->
    <!-- <el-button @click="testInstance.testFun()">test</el-button> -->
  </div>
  <el-form ref="FormInstanceRef" :model="formModel" :rules="rules" label-width="80px" label-position="right">
    <el-form-item label="标准字段" prop="country">
      <CustomCountrySelect
        v-model="formModel.country"
        model-item
        label-key="name"
        stag="selevtv2"
        @change="handleChange"
      />
    </el-form-item>
  </el-form>
  <el-button @click="handleSubmit">Submit</el-button>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import CustomLeakagewaySelect from "./CustomLeakagewaySelect.vue";
import CustomRuleCategoryName from "../components/CustomRuleCategoryName.vue";
import CustomCountrySelect from "./CustomCountrySelect.vue";
import TestSearch from "./TestSearch.vue";
import { request } from "@/utils";

const FormInstanceRef = ref();
const formModel = ref<any>({ country: {} });

const validatePass = (rule: any, value: any, callback: any) => {
  if (value && value.length) {
    callback();
  } else {
    callback(new Error("请输入"));
  }
};

const rules = {
  columns: [{ required: true, validator: validatePass, trigger: ["change", "blur"] }],
};

const handleChange = (value: any) => {
  console.log(value);
};

const handleSubmit = (): void => {
  FormInstanceRef.value?.validate((valid: any) => {
    if (valid) {
      const params: any = {
        ...formModel.value,
      };
      console.log(params);
      // createItem(params).then(() => {
      //   YtoTableInstance.value.updateTableData()
      //   dialogVisible.value = false
      //   window._message({
      //     message: formModel.value.id ? "编辑成功" : "新建成功",
      //     type: "success",
      //   })
      // })
    }
  });
};

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
