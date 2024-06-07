<template>
  <div class="search-box flex items-center flex-col">
    <!-- <CustomLeakagewaySelect key="1" v-model="user2" multiple ref="testInstance" /> -->
    <CustomProvinceAreaSelect
      ref="SelectInstance"
      v-model="regions"
      :model-item="true"
      multiple
      @change="handleTestChange"
    />
    <!-- <TestSearch /> -->
    <el-button @click="handleChange">test</el-button>
    <div>
      <el-button @click="handleChange2">test2</el-button>
      <el-select ref="ElSelectInstance"></el-select>
    </div>
    <el-button @click="handleChange3">test3</el-button>
    <el-button @click="handleChange4">test4</el-button>
  </div>
  <!-- <el-form ref="FormInstanceRef" :model="formModel" :rules="rules" label-width="80px" label-position="right">
    <el-form-item label="标准字段" prop="country">
      <CustomCountrySelect
        v-model="formModel.country"
        model-item
        label-key="name"
        stag="selevtv2"
        @change="handleChange"
      />
    </el-form-item>
  </el-form> -->
  <!-- <el-button @click="handleSubmit">Submit</el-button> -->
  <AddHandlePersonal ref="AddHandlePersonalInstance" />
</template>
<script lang="ts" setup>
import { ref } from "vue";
import CustomLeakagewaySelect from "./CustomLeakagewaySelect.vue";
import CustomRuleCategoryName from "../components/CustomRuleCategoryName.vue";
import CustomCountrySelect from "./CustomCountrySelect.vue";
import TestSearch from "./TestSearch.vue";
import { request } from "@/utils";
import CustomProvinceAreaSelect from "./CustomProvinceAreaSelect.vue";
import AddHandlePersonal from "@/components/AddHandlePersonal.vue";
const FormInstanceRef = ref();
const ElSelectInstance = ref();
const SelectInstance = ref();
const formModel = ref<any>({ country: {} });
const regions = ref([]);
const validatePass = (rule: any, value: any, callback: any) => {
  if (value && value.length) {
    callback();
  } else {
    callback(new Error("请输入"));
  }
};

const AddHandlePersonalInstance = ref();

const rules = {
  columns: [{ required: true, validator: validatePass, trigger: ["change", "blur"] }],
};

const selOptions = [
  { userCode: "1231313", userName: "lihanqi" },
  { userCode: "12313132", userName: "lihanqi2" },
  { userCode: "12313133", userName: "lihanqi3" },
  { userCode: "12313134", userName: "lihanqi4" },
  { userCode: "12313135", userName: "lihanqi5" },
  { userCode: "12313136", userName: "lihanqi6" },
];

const _selected = ref([]);
const handleChange = (value: any) => {
  const _states = SelectInstance.value.getSelected();
  // _states.states.selected.push(
  //   { value: { userCode: "1231313", userName: "lihanqi" }, isDisabled: false, currentLabel: "lihanqi" },
  //   { value: { userCode: "12313132", userName: "lihanqi2" }, isDisabled: false, currentLabel: "lihanqi2" }
  // );
  SelectInstance.value.setOptions(selOptions);
  // regions.value = ["1231313", "12313133"];
  regions.value = [
    { userCode: "1231313", userName: "lihanqi" },
    { userCode: "12313132", userName: "lihanqi2" },
  ];
  _states.setSelected();
  // setTimeout(() => {
  //   _selected.value = JSON.parse(JSON.stringify(_states.states.selected));
  //   console.log(_states.states.selected);
  // }, 2000);
};

const handleTestChange = (value) => {
  console.log("changege", value);

  const _states = SelectInstance.value.getSelected();

  setTimeout(() => {
    const _tags = SelectInstance.value
      .getSelected()
      .showTagList.filter((item: any) => item.currentLabel)
      .map((item: any) => item.value);
    console.log(JSON.parse(JSON.stringify(_tags)));
    SelectInstance.value.clearOptions();
    SelectInstance.value.setOptions([...selOptions, ..._tags]);
    _states.states.selected = [];
    regions.value = [
      { userCode: "1231313", userName: "lihanqi" },
      { userCode: "12313132", userName: "lihanqi2" },
      ..._tags,
    ];
    _states.setSelected()
  }, 300);

  // setTimeout(() => {
  //   const _selected = _states.states.selected.filter((item: any) => item.currentLabel);
  //   console.log("lihanqi", _selected);
  //   for (let key of _states.states.cachedOptions.keys()) {
  //     console.log("rrrr", key); // 输出 'a' 'b' 'c'
  //     selOptions.push(key);
  //   }
  //   SelectInstance.value.setOptions(selOptions);
  //   regions.value = [
  //     { userCode: "1231313", userName: "lihanqi" },
  //     { userCode: "12313132", userName: "lihanqi2" },
  //     ..._selected,
  //   ];
  // }, 300);

  // SelectInstance.value.setOptions(selOptions);
  // regions.value = [
  //   { userCode: "1231313", userName: "lihanqi" },
  //   { userCode: "12313132", userName: "lihanqi2" },
  // ];
};
const handleChange2 = () => {
  console.log(regions.value);
  console.log(ElSelectInstance.value);
};

const handleChange3 = () => {
  const _states = SelectInstance.value.getSelected();
  _states.setSelected();
};

const handleChange4 = () => {
  const _states = SelectInstance.value.getSelected();
  console.log(_states);
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
