<template>
  <div class="wrapper bg-white h-full">
    <div>
      <span @click="handleClick('333')">第三个测试页面</span>
      <span @click="handleClick('333-end')">第三个测试页面-end</span>
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
import { useRoute, useRouter } from "vue-router";
import { toPathFormat } from "gold-core";

const route = useRoute();
const router = useRouter();
const handleClick = (id: string) => {
  router.push({ path: "/layout-child-2", query: { id } });
};
const form = {};
const formItemWidth = ref(350);
const formConfig: Array<any> = reactive([]);
for (let index = 0; index < 10; index++) {
  formConfig.push({
    itemType: "input",
    value: "",
    label: "测试数据三" + (index + 1),
    contentClass: "w-full",
    cols: index == 1 ? 2 : 1,
  });
}
const handleResize = (itemWidth: number) => {
  console.log("handleResize-测试页面3", itemWidth);
  // formItemWidth.value = itemWidth;
  // cardStyle.value = `width: ${(info.width - num * props.gap) / num}px; min-width:${props.minWidth}px`;
};
onMounted(() => {
  // console.log("watch--onMounted", toPathFormat(route.query.iFrameUrl));
});
</script>
<style lang="scss" scoped>
.wrapper {
}
</style>
