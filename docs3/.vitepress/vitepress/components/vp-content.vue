<!--
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2024-07-16 10:57:36
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2024-07-19 13:27:01
 * @FilePath: \yto-engine\docs3\.vitepress\vitepress\components\vp-content.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { computed, nextTick, onUpdated, ref, watch } from "vue";
import nprogress from "nprogress";
import { useData, useRoute } from "vitepress";
import { useSidebar } from "../composables/sidebar";
import VPHeroContent from "./vp-hero-content.vue";
import VPDocContent from "./vp-doc-content.vue";
import VPNotFound from "./vp-not-found.vue";
import VPFooter from "./globals/vp-footer.vue";

const { frontmatter, page } = useData();
const route = useRoute();
console.log("route", route);
console.log("page", page);
const isNotFound = computed(() => route.component === VPNotFound);
const isHeroPost = computed(() => frontmatter.value.page === true);
const { hasSidebar } = useSidebar();

const props = defineProps<{ isSidebarOpen: boolean }>();

const shouldUpdateProgress = ref(true);

watch(
  () => props.isSidebarOpen,
  (val) => {
    // delay the flag update since watch is called before onUpdated
    nextTick(() => {
      shouldUpdateProgress.value = !val;
    });
  }
);

onUpdated(() => {
  if (shouldUpdateProgress.value) {
    nprogress.done();
  }
});
</script>

<template>
  <main id="page-content" :class="{ 'page-content': true, 'has-sidebar': hasSidebar }">
    <VPNotFound v-if="isNotFound" />
    <!-- <div v-if="isNotFound">isNotFoundTrain</div> -->
    <VPHeroContent v-else-if="isHeroPost" />
    <VPDocContent v-else>
      <template #content-top><slot name="content-top" /></template>
      <template #content-bottom><slot name="content-bottom" /></template>
    </VPDocContent>
    <!-- <VPFooter v-if="!isHeroPost" /> -->
  </main>
</template>
