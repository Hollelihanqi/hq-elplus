<script setup lang="ts">
import { computed } from "vue";
import { inBrowser, useData } from "vitepress";

import VPNavbarThemeToggler from "./vp-theme-toggler.vue";

// defineProps<{
//   fullScreen: boolean;
// }>();

defineEmits(["toggle"]);

const { theme, page } = useData();

const currentLink = computed(() => {
  // if (!inBrowser) {
  //   return `/${page.value?.frontmatter?.lang || ""}/`;
  // }
  // const existLangIndex = theme.value.langs.findIndex((lang) => window?.location?.pathname.startsWith(`/${lang}`));

  return "/" 
});
</script>

<template>
  <div class="navbar-wrapper">
    <div class="header-container">
      <div class="logo-container">
        技术平台部业务组件库
      </div>
      <div class="content">
        <VPNavbarThemeToggler class="theme-toggler" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.logo-container {
  display: flex;
  align-items: center;
  height: var(--header-height);
  > a {
    height: 28px;
    width: 128px;
  }
  .logo {
    position: relative;
    height: 100%;
  }
}
.dark {
  .logo {
    filter: drop-shadow(2px 2px 6px #409eff);
  }
}
</style>
