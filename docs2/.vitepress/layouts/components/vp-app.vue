<script setup lang="ts">
import { onMounted } from "vue";
import nprogress from "nprogress";
import { isClient, useEventListener, useToggle } from "@vueuse/core";
import { useSidebar } from "../composables/sidebar";
import { useToggleWidgets } from "../composables/toggle-widgets";
import VPNav from "./vp-nav.vue";
import VPSubNav from "./vp-subnav.vue";
import VPSidebar from "./vp-sidebar.vue";
import VPContent from "./vp-content.vue";

const breakpoints = {
  sm: 480,
  md: 768,
  lg: 960,
  xlg: 1280,
  xxl: 1440,
};
const [isSidebarOpen, toggleSidebar] = useToggle(false);
const { hasSidebar } = useSidebar();

useToggleWidgets(isSidebarOpen, () => {
  if (!isClient) return;
  if (window.outerWidth >= breakpoints.lg) {
    toggleSidebar(false);
  }
});

useEventListener("keydown", (e) => {
  if (!isClient) return;
  if (e.key === "Escape" && isSidebarOpen.value) {
    toggleSidebar(false);
    document.querySelector<HTMLButtonElement>(".sidebar-button")?.focus();
  }
});

onMounted(async () => {
  if (!isClient) return;
  window.addEventListener(
    "click",
    (e) => {
      const link = (e.target as HTMLElement).closest("a");
      if (!link) return;

      const { protocol, hostname, pathname, target } = link;
      const currentUrl = window.location;
      const extMatch = pathname.match(/\.\w+$/);
      // only intercept inbound links
      if (
        !e.ctrlKey &&
        !e.shiftKey &&
        !e.altKey &&
        !e.metaKey &&
        target !== `_blank` &&
        protocol === currentUrl.protocol &&
        hostname === currentUrl.hostname &&
        !(extMatch && extMatch[0] !== ".html")
      ) {
        e.preventDefault();
        if (pathname !== currentUrl.pathname) {
          nprogress.start();
        }
      }
    },
    { capture: true }
  );

  // if (lang.value === 'zh-CN') {
  //   if (isMirrorUrl()) return

  //   if (userPrefer.value) {
  //     // no alert in the next 90 days
  //     if (
  //       dayjs
  //         .unix(Number(userPrefer.value))
  //         .add(90, 'day')
  //         .diff(dayjs(), 'day', true) > 0
  //     )
  //       return
  //   }
  //   try {
  //     await ElMessageBox.confirm(
  //       '建议大陆用户访问部署在国内的站点，是否跳转？',
  //       '提示',
  //       {
  //         confirmButtonText: '跳转',
  //         cancelButtonText: '取消',
  //       }
  //     )
  //     const toLang = '/zh-CN/'
  //     location.href = `https://element-plus.gitee.io${toLang}${location.pathname.slice(
  //       toLang.length
  //     )}`
  //   } catch {
  //     userPrefer.value = String(dayjs().unix())
  //   }
  // }
  // unregister sw
  // navigator?.serviceWorker?.getRegistrations().then((registrations) => {
  //   for (const registration of registrations) {
  //     registration.unregister();
  //   }
  // });
});
</script>

<template>
  <div class="App">
    <VPNav />
    <VPSubNav v-if="hasSidebar" :is-sidebar-open="isSidebarOpen" @open-menu="toggleSidebar(true)" />
    <VPSidebar :open="isSidebarOpen" @close="toggleSidebar(false)">
      <template #top> </template>
      <template #bottom>
        <slot name="sidebar-bottom" />
      </template>
    </VPSidebar>
    <VPContent :is-sidebar-open="isSidebarOpen">
      <template #content-top>
        <slot name="content-top" />
      </template>
      <template #content-bottom>
        <slot name="content-bottom" />
      </template>
      <template #aside-top>
        <slot name="aside-top" />
      </template>
      <template #aside-mid>
        <slot name="aside-mid" />
      </template>
      <template #aside-bottom>
        <slot name="aside-bottom" />
      </template>
    </VPContent>
    <Debug />
  </div>
</template>
