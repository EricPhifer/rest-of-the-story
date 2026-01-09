<script setup>
import { ref, onMounted, computed, watch, useAttrs } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { client, urlFor } from '@/sanity'
import blogCardsQuery from '@/queries/blogCards.js'

const props = defineProps({
  title: { type: String, default: 'Latest' },
  limit: { type: Number, default: 5 },
  posts: { type: Array, default: null },
  basePath: { type: String, default: '/blog-pages' },
})

const attrs = useAttrs()
const sectionClasses = computed(() => attrs.class || '')

const posts = ref([])
const loading = ref(true)

const hydrate = (arr) => {
  posts.value = Array.isArray(arr) ? arr.slice(0, props.limit) : []
  loading.value = false
}

watch(() => props.posts, (val) => {
  if (Array.isArray(val)) hydrate(val)
})

onMounted(async () => {
  // If posts are provided as a prop, use them (even if empty array)
  if (props.posts !== null) {
    hydrate(props.posts)
    return
  }
  // Otherwise fetch posts from Sanity
  try {
    posts.value = await client.fetch(blogCardsQuery, { limit: props.limit })
  } catch (e) {
    console.warn('Post fetch failed:', e)
    posts.value = []
  } finally {
    loading.value = false
  }
})

const postUrl = (p) => `${props.basePath}/${p?.slug?.current ?? ''}`
const MAX_EXCERPT_WORDS = 130

function formatExcerpt(text) {
  if (!text) return ''
  const words = String(text).trim().split(/\s+/)
  return words.slice(0, MAX_EXCERPT_WORDS).join(' ')
}

const img = (source, w, h) => {
  if (!source) return ''
  return urlFor(source, { width: w, height: h, fit: 'crop' })
}
</script>

<template>
  <section class="text-section blog-cards w-full" :class="sectionClasses">
    <header v-if="title" class="mb-6 bg-light">
      <h2>{{ title }}</h2>
    </header>

    <div v-if="loading" class="space-y-6">
      <div v-for="n in limit" :key="'sk-' + n" class="h-40 rounded-lg bg-gray-100 animate-pulse"></div>
    </div>

    <p v-else-if="posts.length === 0">
      No posts yet—check back soon.
    </p>

    <ul v-else class="blog-cards-list space-y-6">
      <li v-for="(post, index) in posts" :key="post.slug?.current || post._id" class="w-full flex justify-center">
        <article class="w-full max-w-[750px] rounded-xl bg-dark bg-[var(--color-primary-dark)] p-5 shadow-sm">
          <div
            class="flex flex-col md:flex-row gap-4"
            :class="index % 2 === 1 ? 'md:flex-row-reverse' : ''"
          >
            <RouterLink :to="postUrl(post)" class="w-full md:w-2/5">
              <div class="w-full h-40 md:h-48 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  v-if="post.mainImage?.asset"
                  :src="img(post.mainImage, 960, 640)"
                  :alt="post.mainImage.alt || post.title"
                  class="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            </RouterLink>

            <div class="w-full md:w-3/5 flex flex-col">
              <h3 class="text-lg md:text-xl lg:text-2xl border-b-3 border-(var(--color-accent-light))">{{ post.title }}</h3>
              <p v-if="post.excerpt" class="excerpt mt-2 text-sm text-white/90">
                {{ formatExcerpt(post.excerpt) }}
              </p>
              <RouterLink
                class="read-more-link mt-4 md:mt-auto self-end inline-flex items-center gap-2"
                :to="postUrl(post)"
              >
                Read More <FontAwesomeIcon :icon="['fas', 'angle-right']" aria-hidden="true" />
              </RouterLink>
            </div>
          </div>
        </article>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.excerpt {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 4;
}

.blog-cards :deep(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* Override text-section link styles for blog card links using higher specificity */
.text-section.blog-cards :deep(a) {
  text-decoration: none;
  color: inherit;
  border-bottom: none;
}

.text-section.blog-cards :deep(a:hover),
.text-section.blog-cards :deep(a:focus) {
  text-decoration: none;
  border-bottom: none;
  color: inherit;
  outline: none;
}

/* Specific styles for the Read More link */
.text-section.blog-cards :deep(.read-more-link) {
  color: white;
  font-weight: bold;
  transition: color 200ms;
}

.text-section.blog-cards :deep(.read-more-link:hover),
.text-section.blog-cards :deep(.read-more-link:focus) {
  color: var(--color-accent);
}
</style>
