import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  { path: '/chart', component: () => import('@/views/chart.vue') },
  { path: '/form', component: () => import('@/views/formItem/index.vue') },
  { path: '/table', component: () => import('@/views/table/index.vue') },
  { path: '/staffSearch', component: () => import('@/views/staffSearch.vue') },
  { path: '/userSearch', component: () => import('@/views/TestSearch.vue') },
  { path: '/dialog', component: () => import('@/views/dialog.vue') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes

})