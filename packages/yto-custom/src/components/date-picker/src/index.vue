<!--
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2024-05-17 13:40:10
 * @LastEditTime: 2024-05-17 14:44:32
-->
<template>
  <el-date-picker
    v-model="timer"
    :type="type"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :default-time="[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)]"
  />
</template>
<script lang="ts" setup name="DataPicker">
type DateModelType = number | string | Date;
interface IProps {
  start: DateModelType;
  end: DateModelType;
  type?: "daterange" | "datetimerange";
}
const props = withDefaults(defineProps<IProps>(), {
  start: "",
  end: "",
  type: "daterange",
});
const emit = defineEmits(["update:start", "update:end"]);
const timer: any = computed({
  get: () => [props.start, props.end],
  set: (val) => {
    emit("update:start", val?.length > 1 ? val[0] : "");
    emit("update:end", val?.length > 1 ? val[1] : "");
  },
});
</script>
