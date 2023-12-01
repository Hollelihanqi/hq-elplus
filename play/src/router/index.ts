import { createRouter, createWebHistory } from "vue-router";
const routes = [
  { path: "/chart", component: () => import("@/views/chart.vue") },
  { path: "/form", component: () => import("@/views/formItem/index.vue") },
  { path: "/table", component: () => import("@/views/table.vue") },
  { path: "/staffSearch", component: () => import("@/views/staffSearch.vue") },
  { path: "/userSearch", component: () => import("@/views/TestSearch.vue") },
  { path: "/dialog", component: () => import("@/views/dialog.vue") },
  { path: "/uploaderf", component: () => import("@/views/UploaderF.vue") },
  { path: "/layoutFrom", component: () => import("@/views/layoutFrom.vue") },
  { path: "/layoutFrame", component: () => import("@/views/layout-frame.vue") },
  { path: "/layout-child-1", component: () => import("@/views/layout-router-child-1.vue") },
  { path: "/layout-child-2", component: () => import("@/views/layout-router-child-2.vue") },
  {
    path: "/layout-child-3",
    name: "layoutChild3",
    meta: { title: "测试页面3", closable: false },
    component: () => import("@/views/layout-router-child-3.vue"),
  },
  { path: "/theme", component: () => import("@/views/theme/index.vue") },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
