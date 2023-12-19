<template>
  <div class="flex flex-wrap">
    <slot></slot>
    <div class="flex-1 text-right">
      <slot name="operation"></slot>
    </div>
  </div>
</template>
<script setup lang="ts" name="FormContainer"></script>