<template>
  <div class="p-[16px]">
    <yto-c-search-container
      custom-class="p-[16px] bg-[#eeeffc]"
      :item-min-width="350"
      :model="form"
      label-width="100px"
      :is-use-form="true"
      @resize="handleResize"
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
        :style="`width:${item.formItemWidth ? item.formItemWidth : formItemWidth + 'px'};`"
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
for (let index = 0; index < 10; index++) {
  formConfig.push({
    itemType: "input",
    value: "",
    label: "测试数据" + (index + 1),
    contentClass: "w-full",
  });
}
const handleResize = (itemWidth: number) => {
  console.log("handleResize", itemWidth);
  formItemWidth.value = itemWidth;
  formConfig[1].formItemWidth = itemWidth * 2 + "px";
  // cardStyle.value = `width: ${(info.width - num * props.gap) / num}px; min-width:${props.minWidth}px`;
};
</script>
