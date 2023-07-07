import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  { path: '/chart', component: () => import('@/views/chart.vue') },
  { path: '/form', component: () => import('@/views/formItem/index.vue') },
  { path: '/table', component: () => import('@/views/table.vue') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes

})