import { createRouter, createWebHistory } from 'vue-router'
import PageView from '@/views/PageView.vue'

const routes = [
  // 1. Root → /home
  { path: '/', redirect: '/home' },
  { path: '/about', redirect: '/home#about' },
  { path: '/consign', redirect: '/home#consign' },
  { path: '/contact', redirect: '/home#contact' },
 
  // 2. Legal pages
  {
    path: '/legal/:slug',
    name: 'LegalPage',
    component: () => import('@/views/LegalPage.vue'),
    props: true
  },

  // 3. Blog posts
  {
    path: '/blog/:slug',
    name: 'BlogPost',
    component: () => import('@/views/BlogPost.vue'),
    props: true
  },

  // 4. FAQ
  {
    path: '/faqs',
    name: 'FaqPage',
    component: () => import('@/views/FaqPage.vue')
  },

  // 5. Your catch-all for regular pages (must be last)
  {
    path: '/:pathMatch(.*)*',
    name: 'Page',
    component: PageView,
    // pass the full pathMatch as “slug” to your PageView
     props: route => {
      let slug = route.params.pathMatch
      if (Array.isArray(slug)) slug = slug.join('/')
      return { slug: slug || 'home' }
    }
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
