<template>
  <teleport to="body">
    <el-dialog :width="width" :close-on-click-modal="false" :modal="true" :title="title" v-model="visible">
      <slot />
      <template #footer>
        <el-button @click="visible = false">取消</el-button>
        <template v-if="hiddenAction == false">
          <el-button @click="handlerReset">重置</el-button>
          <el-button type="primary" @click="$emit('save')">保存</el-button>
        </template>
      </template>
    </el-dialog>
  </teleport>
</template>

<script lang="ts" setup>
import { ref, unref, watch } from 'vue';
import { ElDialog, ElButton } from 'element-plus'
import 'element-plus/es/components/dialog/style/css'
import 'element-plus/es/components/button/style/css'

const $emit = defineEmits(['reset', 'save', 'update:modelValue']);
const props = defineProps({
  title: String,
  width: String,
  form: Object,
  hiddenAction: Boolean,
  modelValue: Boolean
});

const visible = ref<boolean>(props.modelValue as boolean)

function handlerReset() {
  if (props.form) {
    unref(props.form).resetFields()
  }
}
watch(() => props.modelValue, (value: boolean) => visible.value = value)
watch(() => visible.value, value => $emit('update:modelValue', value))
</script>

<style scoped>
.el-dialog .el-dialog__header {
  border-bottom: 1px solid rgba(0, 0, 0, .06);
}

.el-dialog .el-dialog__footer {
  border-top: 1px solid rgba(0, 0, 0, .06);
}
</style>