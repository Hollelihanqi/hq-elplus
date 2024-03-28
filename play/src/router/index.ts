/*
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2023-12-11 14:08:36
 * @LastEditTime: 2024-03-19 16:01:40
 */
/*
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2023-12-05 09:29:05
 * @LastEditTime: 2023-12-07 16:06:43
 */
import { createRouter, createWebHistory } from "vue-router";
const routes = [
  { path: "/chart", component: () => import("@/views/demo/chart.vue") },
  { path: "/form", component: () => import("@/views/form/index.vue") },
  { path: "/table", component: () => import("@/views/demo/table.vue") },
  { path: "/staffSearch", component: () => import("@/views/demo/staffSearch.vue") },
  { path: "/userSearch", component: () => import("@/views/demo/TestSearch.vue") },
  { path: "/dialog", component: () => import("@/views/demo/dialog.vue") },
  { path: "/dialog2", component: () => import("@/views/demo/dialog2.vue") },
  { path: "/uploaderf", component: () => import("@/views/demo/UploaderF.vue") },
  { path: "/layoutFrom", component: () => import("@/views/demo/layoutFrom.vue") },
  { path: "/layoutFrame", component: () => import("@/views/layout-frame.vue") },
  {
    path: "/layout-child-1",
    meta: { title: "测试页面1" },
    component: () => import("@/views/demo/layout-router-child-1.vue"),
  },
  { path: "/layout-child-2", component: () => import("@/views/demo/layout-router-child-2.vue") },
  {
    path: "/layout-child-3",
    name: "layoutChild3",
    meta: { title: "测试页面3", closable: false },
    component: () => import("@/views/demo/layout-router-child-3.vue"),
  },
  { path: "/theme", component: () => import("@/views/theme/index.vue") },
  { path: "/customFieldContainer", component: () => import("@/views/demo/CustomFieldContainer.vue") },
  { path: "/customFieldConfig", component: () => import("@/views/demo/customFieldDemo.vue") },
  { path: "/searchContainer", component: () => import("@/views/demo/FormContainer.vue") },
  { path: "/adaptionContainer", component: () => import("@/views/demo/AdaptionContainer.vue") },
  { path: "/ellipsisTag", component: () => import("@/views/demo/EllipsisTag.vue") },
  { path: "/searchFormItemContainer", component: () => import("@/views/demo/SearchFormItemContainer.vue") },
  { path: "/tableSearch", component: () => import("@/views/demo/TableSearch.vue") },
  { path: "/tareaTag", component: () => import("@/views/demo/TareaTag.vue") },
  { path: "/cusRadio", component: () => import("@/views/demo/CusRadio.vue") },
  { path: "/selectRemote", component: () => import("@/views/demo/CustomProvinceAreaSelect.vue") },
  { path: "/timeLine", component: () => import("@/views/demo/TimeLineDemo.vue") },
  { path: "/searchForm", component: () => import("@/views/demo/search-from.vue") },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
