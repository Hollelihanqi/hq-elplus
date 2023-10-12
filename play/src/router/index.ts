import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  { path: '/chart', component: () => import('@/views/chart.vue') },
  { path: '/form', component: () => import('@/views/formItem/index.vue') },
  { path: '/table', component: () => import('@/views/table/index.vue') },
  { path: '/staffSearch', component: () => import('@/views/staffSearch.vue') },
  { path: '/userSearch', component: () => import('@/views/TestSearch.vue') },
  { path: '/dialog', component: () => import('@/views/dialog.vue') },
  { path: '/layout-frame', component: () => import('@/views/layout-frame.vue') },
  {
    path: '/layout-router', component: () => import('@/views/layout-router.vue'),
    children: [
      {
        path: 'child-1',
        component: () => import('@/views/layout-router-child-1.vue')
      },
      {
        path: 'child-2',
        component: () => import('@/views/layout-router-child-2.vue')
      }
    ]
  },
  {
    path: '/layout-child-1',
    component: () => import('@/views/layout-router-child-1.vue')
  },
  {
    path: '/layout-child-2',
    component: () => import('@/views/layout-router-child-2.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes

})