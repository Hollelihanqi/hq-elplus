<template>
    <div
      class="my-button"
      :style="{ height: h, width: w }"
      :class="[type + '-btn', { 'plain-btn': plain }, $attrs.disabled ? 'dis-btn' : '']"
    >
      <slot></slot>
    </div>
  </template>
  <script lang="ts" setup>
  import { defineProps } from "vue";
  const props = defineProps({
    h: {
      type: String,
      default: "32px",
    },
    w: {
      type: String,
      default: "80px",
    },
    type: {
      type: String,
      default: "primary",
    },
    plain: {
      type: Boolean,
      default: false,
    },
  });
  </script>
  <style lang="scss" scope>
  .my-button {
    display: inline-block;
    text-align: center;
    line-height: 32px;
    border-radius: 2px;
    border: 1px solid transparent;
    cursor: pointer;
  }
  .primary-btn {
    background: $primary-btn-normal-color;
    border-color: $primary-btn-normal-color;
    color: #fff;
    &:hover {
      background: $primary-btn-hover-color;
      border-color: $primary-btn-hover-color;
    }
  }
  .plain-btn {
    background: #fff;
    border-color: $plain-btn-normal-color;
    color: rgba(0, 0, 0, 0.65);
    &:hover {
      border-color: $plain-btn-hover-color;
      color: $plain-btn-hover-color;
    }
  }
  .unimportant-btn {
    background: #fff;
    border-radius: 2px;
    color: rgba(0, 0, 0, 0.65);
    border: 1px solid rgba(0, 0, 0, 0.15);
    &:hover {
      color: #000;
      border-color: rgba(0, 0, 0, 0.3);
    }
  }
  .dis-btn {
    pointer-events: none;
    cursor: default;
    opacity: 0.6;
  }
  </style>
  