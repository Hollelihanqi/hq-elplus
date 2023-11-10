<script setup lang="ts">
import { useSidebar } from "../composables/sidebar";
import VpNavbar from "./vp-navbar.vue";

const { hasSidebar } = useSidebar();
</script>

<template>
  <header :class="{ navbar: true, 'has-sidebar': hasSidebar }">
    <VpNavbar />
  </header>
</template>
