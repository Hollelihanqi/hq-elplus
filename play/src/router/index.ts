import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  { path: '/chart', component: () => import('@/views/chart.vue') },
  { path: '/form', component: () => import('@/views/formItem/index.vue') },
  { path: '/table', component: () => import('@/views/table/basic.vue') },
  { path: '/staffSearch', component: () => import('@/views/staffSearch.vue') },
  { path: '/dialog', component: () => import('@/views/dialog.vue') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes

})