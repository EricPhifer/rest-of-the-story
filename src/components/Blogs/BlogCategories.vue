<script setup>
import { ref, onMounted, computed, watch, useAttrs } from 'vue'
import { client, urlFor } from '@/sanity'
import blogCategoriesQuery from '@/queries/blogCategories.js'

const props = defineProps({
  title: { type: String, default: 'Browse by Category' },
  description: { type: String, default: '' },
  categories: { type: Array, default: null },
  basePath: { type: String, default: '/blog-pages/category' },
})

const attrs = useAttrs()
const sectionClasses = computed(() => attrs.class || '')

const categories = ref([])
const loading = ref(true)

const hydrate = (arr) => {
  categories.value = Array.isArray(arr) ? arr : []
  loading.value = false
}

watch(() => props.categories, (val) => {
  if (Array.isArray(val)) hydrate(val)
})

onMounted(async () => {
  if (Array.isArray(props.categories) && props.categories.length) {
    hydrate(props.categories)
    return
  }
  try {
    categories.value = await client.fetch(blogCategoriesQuery)
  } catch (e) {
    console.warn('Category fetch failed:', e)
    categories.value = []
  } finally {
    loading.value = false
  }
})

const catUrl = (c) => `${props.basePath}/${c?.slug?.current ?? ''}`
const img = (source, w, h) => {
  if (!source) return ''
  return urlFor(source, { width: w, height: h, fit: 'crop' })
}
</script>

<template>
  <section class="text-section blog-categories" :class="sectionClasses">
    <header v-if="title" class="mb-6">
      <h2 class="text-xl md:text-2xl font-bold text-gray-900">{{ title }}</h2>
      <p v-if="description" class="mt-2 text-gray-700 max-w-2xl">{{ description }}</p>
    </header>

    <div v-if="loading" class="flex justify-center">
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
        <div v-for="n in 6" :key="'sk-' + n" class="aspect-square rounded-lg bg-gray-100 animate-pulse"></div>
      </div>
    </div>

    <p v-else-if="categories.length === 0" class="text-gray-600">
      No categories available yet.
    </p>

    <div v-else class="flex justify-center">
      <ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
        <li v-for="cat in categories" :key="cat.slug?.current || cat._id">
          <RouterLink
            class="category-card block aspect-square rounded-lg overflow-hidden border-2 border-[var(--color-primary-light)] bg-[var(--color-primary-light)] hover:border-[var(--color-accent)] hover:shadow-lg transition-all duration-200"
            :to="catUrl(cat)"
          >
            <div class="flex flex-col h-full p-4 gap-2">
              <div class="flex items-center justify-center flex-shrink-0">
                <h3 class="font-semibold text-gray-900 text-center text-lg md:text-xl lg:text-2xl">{{ cat.title }}</h3>
              </div>
              <div class="flex-grow overflow-hidden rounded-lg">
                <img
                  v-if="cat.image?.asset"
                  :src="img(cat.image, 400, 400)"
                  :alt="cat.image.alt || cat.title"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
/* Remove bullets from list */
.blog-categories :deep(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* Override text-section link styles for category cards */
.text-section.blog-categories :deep(a) {
  text-decoration: none;
  border-bottom: none;
}

.text-section.blog-categories :deep(a:hover),
.text-section.blog-categories :deep(a:focus) {
  text-decoration: none;
  border-bottom: none;
  outline: none;
}
</style>
