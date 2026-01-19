<template>
  <section class="sitemap-page bg-[var(--color-off-white)] min-h-screen py-12 px-4">
    <div class="max-w-5xl mx-auto">
      <!-- Page Title -->
      <h1 class="text-3xl font-bold mb-2 text-center text-[var(--color-black)]">
        Sitemap
      </h1>
      <p class="text-center text-[var(--color-primary-dark)] mb-10">
        Browse all pages on our website
      </p>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-8 text-[var(--color-primary-dark)]">
        Loading sitemap...
      </div>

      <!-- Auto-Generated Sitemap Grid -->
      <nav
        v-else
        aria-label="Sitemap"
        class="grid md:grid-cols-2 gap-6"
      >
        <!-- Main Pages -->
        <div v-if="siteData.pages?.length" class="sitemap-card">
          <h2 class="sitemap-heading">Main Pages</h2>
          <ul class="sitemap-list">
            <li v-for="page in siteData.pages" :key="page.slug">
              <RouterLink :to="`/${page.slug}`" class="sitemap-link">
                {{ page.title }}
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/faqs" class="sitemap-link">
                Frequently Asked Questions
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Blog Categories -->
        <div v-if="siteData.categories?.length" class="sitemap-card">
          <h2 class="sitemap-heading">Blog Categories</h2>
          <ul class="sitemap-list">
            <li>
              <RouterLink to="/blog-pages/category" class="sitemap-link">
                All Categories
              </RouterLink>
            </li>
            <li v-for="cat in siteData.categories" :key="cat.slug">
              <RouterLink :to="`/blog-pages/category/${cat.slug}`" class="sitemap-link">
                {{ cat.title }}
                <span v-if="cat.postCount" class="post-count">({{ cat.postCount }})</span>
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Blog Articles -->
        <div v-if="siteData.posts?.length" class="sitemap-card md:col-span-2">
          <h2 class="sitemap-heading">Blog Articles</h2>
          <ul class="sitemap-list grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6">
            <li v-for="post in siteData.posts" :key="post.slug">
              <RouterLink :to="`/blog-pages/${post.slug}`" class="sitemap-link">
                {{ post.title }}
              </RouterLink>
              <span v-if="post.publishedAt" class="post-date">
                {{ formatDate(post.publishedAt) }}
              </span>
            </li>
          </ul>
        </div>

        <!-- Legal Pages -->
        <div v-if="siteData.legalPages?.length" class="sitemap-card md:col-span-2">
          <h2 class="sitemap-heading">Legal</h2>
          <ul class="sitemap-list flex flex-wrap gap-x-8 gap-y-2">
            <li v-for="page in siteData.legalPages" :key="page.slug">
              <RouterLink :to="`/legal/${page.slug}`" class="sitemap-link">
                {{ page.title }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Empty State -->
      <div v-if="!loading && isEmpty" class="text-center py-8 text-[var(--color-primary-dark)]">
        No pages found.
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useHead } from '@vueuse/head'
import { client } from '@/sanity'
import autoSitemapQuery from '@/queries/autoSitemap'

const siteData = ref({
  pages: [],
  posts: [],
  categories: [],
  legalPages: []
})
const loading = ref(true)

const isEmpty = computed(() => {
  return !siteData.value.pages?.length &&
         !siteData.value.posts?.length &&
         !siteData.value.categories?.length &&
         !siteData.value.legalPages?.length
})

// SEO: Meta tags for sitemap page
useHead({
  title: 'Sitemap | The Rest of the Story Consignment',
  meta: [
    { name: 'description', content: 'Browse all pages, blog articles, and categories on The Rest of the Story Consignment website.' },
    { property: 'og:title', content: 'Sitemap' },
    { property: 'og:description', content: 'Browse all pages on The Rest of the Story Consignment website.' }
  ],
  link: [
    { rel: 'canonical', href: 'https://therestofthestory.store/sitemap' }
  ]
})

onMounted(async () => {
  try {
    const data = await client.fetch(autoSitemapQuery)
    siteData.value = {
      pages: data.pages || [],
      posts: data.posts || [],
      categories: data.categories || [],
      legalPages: data.legalPages || []
    }
  } catch (err) {
    console.error('Sitemap fetch error:', err)
  } finally {
    loading.value = false
  }
})

function formatDate(iso) {
  if (!iso) return ''
  try {
    return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
      .format(new Date(iso))
  } catch {
    return ''
  }
}
</script>

<style scoped>
.sitemap-card {
  background: var(--color-white);
  border-left: 4px solid var(--color-accent);
  padding: 1.5rem;
  border-radius: 0.25rem;
}

.sitemap-heading {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-secondary-dark);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-primary-light);
}

.sitemap-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sitemap-list li {
  margin: 0;
  padding: 0.375rem 0;
}

.sitemap-link {
  color: var(--color-secondary-dark);
  text-decoration: none;
  transition: color 0.15s ease;
  border-bottom: none;
}

.sitemap-link:hover {
  color: var(--color-accent-dark);
  border-bottom: 1px solid var(--color-accent-dark);
}

.post-count {
  color: var(--color-primary-dark);
  font-size: 0.875rem;
  margin-left: 0.25rem;
}

.post-date {
  display: block;
  color: var(--color-primary-dark);
  font-size: 0.75rem;
  margin-top: 0.125rem;
}
</style>
