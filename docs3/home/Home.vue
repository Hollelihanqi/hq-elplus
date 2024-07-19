<!--
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2024-07-19 15:07:29
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2024-07-19 15:31:18
 * @FilePath: \yto-engine\docs3\home\home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div ref="target" class="home-page">
    <div class="banner">
      <div class="banner-desc text-center">
        <div class="text-center font-bold text-size-[48px]">技术平台部|业务UI组件库</div>
        <p>一个基于 Element Plus 的综合业务组件库，适用于 vue3 项目当中。</p>
      </div>
    </div>
    <HomeCards />
  </div>
</template>
<style lang="scss">
.home-page {
  .banner-desc {
    h1 {
      font-size: 48px;
      font-weight: 800;
      margin: 0;
      color: var(--text-color);
      font-family: Inter, sans-serif;
    }

    p {
      font-size: 16px;
      margin-top: 20px;
      color: var(--text-color-light);
    }
  }
}
</style>
