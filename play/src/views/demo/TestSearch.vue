<template>
  <div class="p-5">
    <!-- <yto-c-user-search v-model="user1"></yto-c-user-search> -->
    <el-form>
      <el-form-item label="testtwet" class="non-interactive-label">
        <textSearch2 v-model="user1" />
      </el-form-item>
    </el-form>

    <!-- <yto-c-remote-search v-model="user" remote valueKey="userCode" :requestApi="getList"></yto-c-remote-search> -->
  </div>
</template>
<script lang="ts" setup>
import { h, ref } from 'vue';
import _request from '../../request';
import textSearch2 from './textSearch2.vue';
const user1 = ref('');
const user = ref('');
const _headers = () => {
  let token = sessionStorage.getItem('authorization') as string;
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
        baseURL: '',
        url: '/api/category/user/searchUser',
        method: 'get',
        params: {
          keyword: keywords,
        },
        headers: _headers(),
      })
      .then((res: any) => {
        console.log('res_____', res);
        resolve([]);
      })
      .catch((error: any) => {
        console.log('error_____________', error);
        reject(error);
      });
  });
};
const optTemp = (item: any) => {
  return h(
    'div',
    {
      class: 'option-c',
      style: {
        display: 'flex',
        alignItems: 'center',
      },
    },
    [
      h('span', {}, `${item.userName} -`),
      h('span', {}, `${item.userCode} -`),
      h('span', {}, `${item.deptName} -`),
      h('span', {}, item.jobName),
    ]
  );
};
</script>
<style>
/* 你可以将这个样式放到你的全局样式文件或者当前组件的<style>标签中 */
.non-interactive-label .el-form-item__label {
  pointer-events: none; /* 禁用鼠标事件 */
}
</style>
