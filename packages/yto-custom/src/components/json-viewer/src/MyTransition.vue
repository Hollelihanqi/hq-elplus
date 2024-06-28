<!--
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2024-06-28 13:55:59
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2024-06-28 14:50:01
 * @FilePath: \yto-engine\packages\yto-custom\src\components\json-viewer\src\MyTransition.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <Transition>
    <slot></slot>
  </Transition>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease-out;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
