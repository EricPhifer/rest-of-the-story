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
    components: {
      default: () => import('@/views/LegalPage.vue')
    }
  },
  {
    path: '/blog/:slug',
    name: 'BlogPost',
    components: {
      default: () => import('@/views/BlogPost.vue')
    }
  },
  {
    path: '/faq',
    name: 'FaqPage',
    components: {
      default: () => import('@/views/FaqPage.vue')
    }
  }

]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
