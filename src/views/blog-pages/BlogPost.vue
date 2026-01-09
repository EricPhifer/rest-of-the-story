<!-- src/pages/BlogPost.vue -->
<template>
  <div class="bg-[var(--color-off-white)] min-h-screen">
    <!-- Loading -->
    <section v-if="status === 'loading'" class="container mx-auto px-2 md:px-4 py-10">
      <div class="h-64 rounded-lg bg-gray-100 animate-pulse mb-6"></div>
      <div class="h-8 w-3/4 bg-gray-200 rounded mb-4 animate-pulse"></div>
      <div class="space-y-3">
        <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div class="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
        <div class="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
      </div>
    </section>

    <!-- Not found / error -->
    <section v-else-if="status === 'error'" class="container mx-auto px-2 md:px-4 py-24 text-center">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Post not found</h1>
      <p class="text-gray-600 mb-6">We couldn’t find that article. It may have been moved or unpublished.</p>
      <RouterLink
        to="/blog"
        class="inline-block px-4 py-2 rounded-md bg-primary-700 text-white hover:bg-primary-800"
      >
        Back to Articles
      </RouterLink>
    </section>

    <!-- Post -->
    <article v-else class="container mx-auto px-2 md:px-4 py-10 max-w-4xl">
      <!-- Breadcrumb -->
      <nav aria-label="Breadcrumb" class="mb-6 text-left">
        <RouterLink to="/blog" class="text-sm text-primary-700 hover:underline">← All Articles</RouterLink>
        <template v-if="post.categories && post.categories.length > 0">
          <span class="text-gray-400 mx-2">/</span>
          <RouterLink
            :to="`/blog-pages/category/${post.categories[0].slug?.current}`"
            class="text-sm text-primary-700 hover:underline"
          >
            {{ post.categories[0].title }}
          </RouterLink>
        </template>
      </nav>

      <!-- Hero image -->
      <figure v-if="post?.mainImage?.asset" class="mb-6">
        <img
          class="w-full h-auto rounded-lg object-cover"
          :src="img(post.mainImage, 1440, 720)"
          :alt="post.mainImage.alt || post.title"
          loading="eager"
        />
      </figure>

      <!-- Title + meta -->
      <header class="mb-6">
        <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">{{ post.title }}</h1>

        <div class="mt-3 flex flex-wrap items-center gap-2">
          <time v-if="post.publishedAt" :datetime="post.publishedAt" class="text-sm text-gray-600">
            {{ formatDate(post.publishedAt) }}
          </time>

          <div v-if="hasCategories" class="flex flex-wrap gap-2">
            <template v-for="cat in post.categories" :key="cat.slug?.current || cat.title">
              <RouterLink
                v-if="cat.slug?.current"
                class="inline-block text-xs px-2 py-0.5 rounded-full bg-lime-200 text-lime-900 hover:underline"
                :to="`/blog-pages/category/${cat.slug.current}`"
              >
                {{ cat.title }}
              </RouterLink>
              <span
                v-else
                class="inline-block text-xs px-2 py-0.5 rounded-full bg-lime-200 text-lime-900"
              >
                {{ cat.title }}
              </span>
            </template>
          </div>
        </div>
      </header>

      <!-- Body -->
      <section class="blog-post-content prose prose-lg max-w-none text-gray-900 text-left">
        <PortableText :value="post.body" />
      </section>

      <hr class="my-10 border-dashed border-gray-200" />

      <!-- Final Note -->
      <FinalNote v-if="post.finalNote?.enabled" :note="post.finalNote" class="mt-10" />

    </article>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { PortableText } from '@portabletext/vue'
import { client, urlFor } from '@/sanity'
import { blogPostQuery } from '@/queries/blogPost.js'
import FinalNote from '@/components/Blogs/FinalNote.vue'

const route = useRoute()

const post = ref(null)
const status = ref('loading') // 'loading' | 'ready' | 'error'

async function fetchPost(slug) {
  status.value = 'loading'
  try {
    const data = await client.fetch(blogPostQuery, { slug })
    if (!data) {
      status.value = 'error'
      post.value = null
      return
    }
    post.value = data
    status.value = 'ready'
  } catch (e) {
    console.warn('Post fetch failed:', e)
    status.value = 'error'
  }
}

watch(
  () => route.params.slug,
  (slug) => slug && fetchPost(String(slug)),
  { immediate: true }
)

const hasCategories = computed(() => Array.isArray(post.value?.categories) && post.value.categories.length > 0)

function formatDate(iso) {
  try {
    return new Intl.DateTimeFormat(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
      .format(new Date(iso))
  } catch { return '' }
}

function img(source, w, h) {
  if (!source) return ''
  return urlFor(source, { width: w, height: h, fit: 'crop' })
}
</script>

<style scoped>
  /* Paragraph spacing and alignment */
  .prose :where(p):not(:where([class~="not-prose"] *)) {
    margin-block: 1em;
  }

  .blog-post-content :deep(p) {
    text-align: left !important;
  }

  /* Heading styles */
  .blog-post-content :deep(h2) {
    font-size: 1.5rem; /* 24px mobile */
    font-weight: 700;
    margin-top: 2em;
    margin-bottom: 1em;
    line-height: 1.3;
    color: var(--color-text-heading);
    border-bottom: 3px solid var(--color-accent);
    padding-bottom: 0.5rem;
    text-align: left;
  }

  @media (min-width: 768px) {
    .blog-post-content :deep(h2) {
      font-size: 1.875rem; /* 30px tablet+ */
    }
  }

  .blog-post-content :deep(h3) {
    font-size: 1.25rem; /* 20px mobile */
    font-weight: 600;
    margin-top: 1.75em;
    margin-bottom: 0.75em;
    line-height: 1.4;
    color: var(--color-text-heading);
    text-align: left;
  }

  @media (min-width: 768px) {
    .blog-post-content :deep(h3) {
      font-size: 1.5rem; /* 24px tablet+ */
    }
  }

  .blog-post-content :deep(h4) {
    font-size: 1.125rem; /* 18px mobile */
    font-weight: 600;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    line-height: 1.5;
    color: var(--color-text-heading);
    text-align: left;
  }

  @media (min-width: 768px) {
    .blog-post-content :deep(h4) {
      font-size: 1.25rem; /* 20px tablet+ */
    }
  }

  /* Lists */
  .blog-post-content :deep(ul),
  .blog-post-content :deep(ol) {
    text-align: left;
    list-style-position: inside;
  }
</style>
