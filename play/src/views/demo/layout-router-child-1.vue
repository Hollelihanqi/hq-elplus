<template>
  <div class="wrapper h-full bg-white p-[16px]">
    <div>
      <span>这是第一个测试页面 </span>
      <div class="cursor-pointer" @click="handleClick">跳转到第三个</div>
    </div>
    <div class="p-[16px]">
      <yto-c-search-container
        custom-class="p-[16px] bg-[#eeeffc]"
        :item-min-width="350"
        :model="form"
        label-width="100px"
        :is-use-form="true"
        @resize="handleResize"
      >
        <el-form-item
          v-for="(item, idx) in formConfig"
          :key="idx"
          :data-cols="item.cols ? item.cols : 1"
          :label="item.label"
        >
          <el-input v-model="item.value" />
        </el-form-item>
        <template #operation>
          <el-button size="small">重置</el-button>
          <el-button size="small" type="primary">搜索</el-button>
        </template>
      </yto-c-search-container>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const handleClick = () => {
  router.push({ path: '/layout-child-3', query: { id: '' } });
};
const form = {};
const formItemWidth = ref(350);
const formConfig: Array<any> = reactive([]);
for (let index = 0; index < 10; index++) {
  formConfig.push({
    itemType: 'input',
    value: '',
    label: '测试数据一' + (index + 1),
    contentClass: 'w-full',
    cols: index == 1 ? 2 : 1,
  });
}
const handleResize = (itemWidth: number) => {
  console.log('handleResize-测试页面1', itemWidth);
  // formItemWidth.value = itemWidth;
  // cardStyle.value = `width: ${(info.width - num * props.gap) / num}px; min-width:${props.minWidth}px`;
};
</script>
<style lang="scss" scoped>
.wrapper {
}
</style>
