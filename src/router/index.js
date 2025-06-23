import { createRouter, createWebHistory } from 'vue-router'
import PageView from '@/views/PageView.vue'

const routes = [

  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/:slug(.*)*',
    name: 'Page',
    component: PageView
  },
  {
    path: '/legal/:slug',
    name: 'LegalPage',
    component: () => import('../views/LegalPage.vue')
  },
  {
    path: '/blog/:slug',
    name: 'BlogPost',
    component: () => import('../views/BlogPost.vue')
  },
  {
    path: '/faq',
    name: 'FaqPage',
    component: () => import('../views/FaqPage.vue')
  }

]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
