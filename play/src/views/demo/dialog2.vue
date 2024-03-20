<template>
  <div id="container">
    <button class="a" @click="show">函数样弹框</button>
    <br />
    <button class="a" @click="show2">函数样弹框2222</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { YtoDialog } from '@yto/custom';

console.log('YtoDialog', YtoDialog);

export default defineComponent({
  setup() {
    const dialogVisible = ref(false);
    const show = () => {
      YtoDialog.$creator(
        {
          // visible: true,
          closeOnClickModal: false,
          modelValue: true,
          confirmOption: {
            txt: '确认按钮',
            confirmCallback: () => {
              console.log('确认按钮的 confirmCallback 回调');
              return Promise.resolve(true);
            },
          },
          cancelOption: {
            txt: '关闭',
            cancelCallback: () => {
              console.log('取消按钮的 cancelCallback 回调');
              return Promise.resolve(true);
            },
          },
          title: '我是函数弹框',
        },
        ['show']
      );
    };

    const show2 = () => {
      const container = document.getElementById('container');

      YtoDialog.$creator(
        {
          appendTo: container,
          // visible: true,
          modelValue: true,
          confirmOption: {
            txt: '确认按钮222',
            confirmCallback: () => {
              console.log('确认按钮的 confirmCallback 回调');
              return Promise.resolve(true);
            },
          },
          cancelOption: {
            txt: '关闭',
            cancelCallback: () => {
              console.log('取消按钮的 cancelCallback 回调');
              return Promise.resolve(true);
            },
          },
          title: '我是函数弹框22222',
        },
        ['show2']
      );
    };

    // ["aaaa", "bbb"].forEach((str) => {
    //   YtoDialog.$creator({
    //     closeOnClickModal: false,
    //     modelValue: true,
    //     confirmOption: {
    //       txt: "确认按钮",
    //       confirmCallback: () => {
    //         console.log("确认按钮的 confirmCallback 回调");
    //         return Promise.resolve(true);
    //       },
    //     },
    //     cancelOption: {
    //       txt: "关闭",
    //       cancelCallback: () => {
    //         console.log("取消按钮的 cancelCallback 回调");
    //         return Promise.resolve(true);
    //       },
    //     },
    //     title: `${str}`,
    //   });
    // });

    return {
      show,
      show2,
    };
  },
});
</script>

<style scoped lang="scss">
:deep(.w-100) {
  width: 100%;
}
</style>
