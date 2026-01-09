<!-- src/views/blog-pages/BlogCategoryPage.vue -->
<template>
  <div class="bg-[var(--color-off-white)] min-h-screen">
    <!-- Loading (category meta) -->
    <section v-if="status === 'loading'" class="container mx-auto px-2 md:px-4 py-10">
      <div class="h-40 rounded-lg bg-gray-100 animate-pulse mb-6"></div>
      <div class="h-8 w-2/3 bg-gray-200 rounded mb-3 animate-pulse"></div>
      <div class="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
    </section>

    <!-- Error / Not found -->
    <section v-else-if="status === 'error'" class="container mx-auto px-2 md:px-4 py-24 text-center">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Category not found</h1>
      <p class="text-gray-600 mb-6">We couldn’t find that category. It may have been renamed or unpublished.</p>
      <RouterLink
        to="/blog-pages/category"
        class="inline-block px-4 py-2 rounded-md bg-primary-700 text-white hover:bg-primary-800"
      >
        Back to Categories
      </RouterLink>
    </section>

    <!-- Category -->
    <section v-else class="container mx-auto px-2 md:px-4 py-10">
      <!-- Breadcrumb -->
      <nav aria-label="Breadcrumb" class="mb-4 text-left">
        <RouterLink to="/blog" class="text-sm text-primary-700 hover:underline">← All Articles</RouterLink>
        <span class="text-gray-400 mx-2">/</span>
        <RouterLink to="/blog-pages/category" class="text-sm text-primary-700 hover:underline">Categories</RouterLink>
      </nav>

      <!-- Header -->
      <header class="mb-8 text-left">
        <h1 class="text-xl md:text-2xl font-bold text-gray-900 pb-2 border-b-4 border-[var(--color-accent)]">{{ category.title }}</h1>
        <p v-if="category.description" class="text-gray-700 mt-2 max-w-3xl">
          {{ category.description }}
        </p>
      </header>

      <!-- Blog Cards for this category -->
      <BlogCards
        :posts="posts"
        :limit="posts.length"
        title=""
      />

      <!-- Load more button -->
      <div v-if="posts.length > 0 && hasMore" class="mt-8 flex justify-center">
        <button
          class="px-4 py-2 rounded-md bg-primary-700 text-white hover:bg-primary-800 disabled:opacity-50"
          :disabled="loadingMore"
          @click="loadMore"
        >
          <span v-if="!loadingMore">Load more</span>
          <span v-else>Loading…</span>
        </button>
      </div>

      <!-- Other Categories -->
      <BlogCategories
        v-if="otherCategories.length > 0"
        title="Explore Other Categories"
        :categories="otherCategories"
        class="mt-16"
      />

      <!-- Old Posts list (hidden) -->
      <div v-if="false">
        <!-- Loading posts skeleton -->
        <div v-if="loadingPosts && posts.length === 0" class="space-y-5">
          <article v-for="n in pageSize" :key="'sk-' + n" class="flex gap-4 p-4 rounded-lg bg-gray-50 animate-pulse">
            <div class="w-28 h-28 rounded-md bg-gray-200 shrink-0"></div>
            <div class="flex-1 space-y-3">
              <div class="h-5 bg-gray-200 rounded w-2/3"></div>
              <div class="h-4 bg-gray-200 rounded w-5/6"></div>
              <div class="h-4 bg-gray-200 rounded w-3/5"></div>
            </div>
          </article>
        </div>

        <!-- Empty -->
        <p v-else-if="posts.length === 0" class="text-gray-600">
          No posts in this category yet—check back soon.
        </p>

        <!-- Cards -->
        <ul v-else class="space-y-5">
          <li v-for="post in posts" :key="post.slug?.current || post._id">
            <article class="flex flex-col md:flex-row gap-4 p-4 rounded-lg bg-lime-50/70 border border-lime-100 shadow-sm">
              <RouterLink
                class="block w-full md:w-40 shrink-0"
                :to="postUrl(post)"
                :aria-label="`Open ‘${post.title}’`"
              >
                <img
                  v-if="post.mainImage?.asset?.url"
                  class="w-full md:w-40 h-40 object-cover rounded-md"
                  :src="img(post.mainImage.asset.url, 320, 320)"
                  :alt="post.mainImage.alt || post.title"
                  loading="lazy"
                />
                <div v-else class="w-full md:w-40 h-40 rounded-md bg-gray-100" aria-hidden="true"></div>
              </RouterLink>

              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <time v-if="post.publishedAt" :datetime="post.publishedAt" class="text-xs text-gray-500">
                    {{ formatDate(post.publishedAt) }}
                  </time>
                </div>

                <h2 class="text-xl font-semibold text-gray-900">
                  <RouterLink class="hover:underline" :to="postUrl(post)">{{ post.title }}</RouterLink>
                </h2>

                <p v-if="post.excerpt" class="text-gray-700 mt-2 line-clamp-3">
                  {{ post.excerpt }}
                </p>

                <RouterLink
                  class="inline-flex items-center gap-2 mt-4 text-primary-700 font-medium hover:underline"
                  :to="postUrl(post)"
                >
                  Read more <span aria-hidden="true">→</span>
                </RouterLink>
              </div>
            </article>
          </li>
        </ul>

        <!-- Load more -->
        <div v-if="posts.length > 0 && hasMore" class="mt-8">
          <button
            class="px-4 py-2 rounded-md bg-primary-700 text-white hover:bg-primary-800 disabled:opacity-50"
            :disabled="loadingMore"
            @click="loadMore"
          >
            <span v-if="!loadingMore">Load more</span>
            <span v-else>Loading…</span>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { client } from '@/sanity'
import { categoryOnly, postsForCategory } from '@/queries/blogCategories.js'
import blogCategoriesQuery from '@/queries/blogCategories.js'
import BlogCards from '@/components/Blogs/BlogCards.vue'
import BlogCategories from '@/components/Blogs/BlogCategories.vue'

const route = useRoute()

const status = ref('loading') // 'loading' | 'ready' | 'error'
const category = ref(null)
const allCategories = ref([])

const posts = ref([])
const pageSize = 10
const nextStart = ref(0)
const hasMore = ref(false)
const loadingPosts = ref(false)
const loadingMore = ref(false)

// Filter out the current category from all categories
const otherCategories = computed(() => {
  if (!category.value?._id || !allCategories.value.length) return []
  return allCategories.value.filter(cat => cat._id !== category.value._id)
})

watch(
  () => route.params.slug,
  (slug) => slug && init(String(slug)),
  { immediate: true }
)

async function init(slug) {
  status.value = 'loading'
  posts.value = []
  nextStart.value = 0
  hasMore.value = false
  try {
    // Fetch current category and all categories in parallel
    const [cat, categories] = await Promise.all([
      client.fetch(categoryOnly, { slug }),
      client.fetch(blogCategoriesQuery)
    ])

    if (!cat?._id) {
      status.value = 'error'
      category.value = null
      return
    }
    category.value = cat
    allCategories.value = categories || []
    status.value = 'ready'
    await fetchPosts() // first page
  } catch (e) {
    console.warn('Category fetch failed:', e)
    status.value = 'error'
  }
}

async function fetchPosts() {
  if (!category.value?._id) return
  loadingPosts.value = true
  try {
    const start = nextStart.value
    const end = start + pageSize
    const rows = await client.fetch(postsForCategory, {
      categoryId: category.value._id,
      start,
      end,
    })
    if (start === 0) posts.value = rows
    else posts.value = posts.value.concat(rows)

    nextStart.value = end
    // Heuristic: if we got a full page, assume there might be more.
    hasMore.value = rows.length === pageSize
  } catch (e) {
    console.warn('Posts fetch failed:', e)
  } finally {
    loadingPosts.value = false
    loadingMore.value = false
  }
}

function loadMore() {
  if (loadingMore.value || !hasMore.value) return
  loadingMore.value = true
  fetchPosts()
}

const postUrl = (p) => `/blog-pages/${p?.slug?.current ?? ''}`

function formatDate(iso) {
  if (!iso) return ''
  try {
    return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
      .format(new Date(iso))
  } catch { return '' }
}

function img(url, w, h) {
  if (!url) return ''
  const sep = url.includes('?') ? '&' : '?'
  return `${url}${sep}w=${w}&h=${h}&fit=crop&auto=format`
}
</script>

<style scoped>
 .line-clamp-3 {
   display: -webkit-box;
   -webkit-line-clamp: 3;
   -webkit-box-orient: vertical;
   overflow: hidden;
   line-clamp: 3;
 }
</style>
