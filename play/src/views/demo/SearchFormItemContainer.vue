<template>
  <div class="p-[16px] bg-white">
    <yto-c-search-container
      ref="searchContainerRef"
      custom-class="p-[16px] "
      :item-min-width="350"
      :model="form"
      label-width="100px"
      :is-collapse="true"
      :default-collapse="true"
      :collapse-line="3"
      @resize="handleResize"
      @enter-keyup="handleEnterKeyup"
    >
      <!-- <yto-c-form-items
        :form-config="formConfig"
        :form="form"
        :item-config="{
          formItemWidth: formItemWidth + 'px',
        }"
      >
      </yto-c-form-items> -->

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
</template>
<script setup lang="ts">
const form = {};
const formItemWidth = ref(350);
const formConfig: Array<any> = reactive([]);
const searchContainerRef = ref();
for (let index = 0; index < 10; index++) {
  formConfig.push({
    itemType: "input",
    value: "",
    label: "测试数据" + (index + 1),
    contentClass: "w-full",
    cols: !index ? 2 : 1,
  });
}
const handleResize = (itemWidth: number) => {
  console.log("handleResize", itemWidth);
  console.log("searchContainerRef", unref(searchContainerRef));
  // formItemWidth.value = itemWidth;
  // cardStyle.value = `width: ${(info.width - num * props.gap) / num}px; min-width:${props.minWidth}px`;
};
const handleEnterKeyup = () => {
  console.log("outer handleEnterKeyup");
};
</script>
