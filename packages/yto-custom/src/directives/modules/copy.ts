/*
 * @Author: weichunpei
 * @Date: 2023-12-08 13:58:41
 * @LastEditors: weichunpei
 * @LastEditTime: 2024-01-12 10:31:03
 * @Description: 复制某个值至剪贴板
 * @use <div v-copy="'string'"></div>
 */

import type { Directive, DirectiveBinding } from 'vue';
import { ElMessage } from 'element-plus';
interface ElType extends HTMLElement {
  copyData: string | number;
  __handleClick__: any;
}
const copy: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    el.copyData = binding.value || el.innerHTML;
    el.addEventListener('click', handleClick);
  },
  updated(el: ElType, binding: DirectiveBinding) {
    el.copyData = binding.value || el.innerHTML;
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener('click', el.__handleClick__);
  },
};

function handleClick(this: any) {
  const input = document.createElement('input');
  console.log(this.copyData);
  input.value = this.copyData.toLocaleString();
  document.body.appendChild(input);
  input.select();
  document.execCommand('Copy');
  document.body.removeChild(input);
  ElMessage({
    type: 'success',
    message: '复制成功',
  });
}

export default copy;
