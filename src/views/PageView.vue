<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { client } from '@/sanity'
import pageQuery from '@/queries/pages'
import { useHead } from '@vueuse/head'

// Import components
import NotFound from '@/components/NotFound.vue'
import HeroSection from '@/components/page-components/HeroSection.vue'
import TextSection from '@/components/page-components/TextSection.vue'
import ImageSection from '@/components/page-components/ImageSection.vue'
import VideoSection from '@/components/page-components/VideoSection.vue'
import ButtonSection from '@/components/page-components/ButtonSection.vue'
import TextImageSection from '@/components/page-components/TextImageSection.vue'
import ThreeCardSection from '@/components/page-components/ThreeCardSection.vue'
import ContactInfoSection from '@/components/page-components/ContactInfoSection.vue'
import ContactCardSection from '@/components/page-components/ContactCardSection.vue'
import FormSection from '@/components/page-components/FormSection.vue'
// Blog Sections
import BlogCards from '@/components/Blogs/BlogCards.vue'
import BlogCategories from '@/components/Blogs/BlogCategories.vue'

const page = ref(null)
const error = ref(null)
const loading = ref(false)

const props = defineProps({
  slug: {
    type: String,
    default: 'home',
  },
})

const SECTION_COMPONENTS = {
  heroSection: HeroSection,
  textSection: TextSection,
  imageSection: ImageSection,
  videoSection: VideoSection,
  buttonSection: ButtonSection,
  textImageSection: TextImageSection,
  threeCardSection: ThreeCardSection,
  contactInfoSection: ContactInfoSection,
  contactCardSection: ContactCardSection,
  formSection: FormSection,
}

function resolveComponent(type) {
  return SECTION_COMPONENTS[type] || null
}

async function fetchPage(slug) {
  loading.value = true
  error.value   = null
  page.value    = null
  try {
    const data = await client.fetch(pageQuery, { slug })
    if (!data) throw new Error('Page not found')
    page.value = data
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

// reactive head so tags update without stacking
useHead(() => {
  const d = page.value
  if (!d) return { title: 'Loading…' }

  const title = d.seo?.title || d.title
  const desc  = d.seo?.description || d.excerpt || ''
  const url   = typeof window !== 'undefined' ? window.location.href : `/${props.slug}`

  // Prefer page-level mainImage, fall back to hero image if present
  const heroImg = d.content?.find?.(b => b._type === 'heroSection')?.image?.asset?.url
  const img     = d.mainImage?.asset?.url || heroImg

  return {
    title,
    meta: [
      { name: 'description', content: desc },
      { property: 'og:title', content: title },
      { property: 'og:description', content: desc },
      { property: 'og:url', content: url },
      ...(img ? [{ property: 'og:image', content: img }] : []),
    ],
  }
})

onMounted(() => {
  fetchPage(props.slug)
})

watch(
  () => props.slug,
  newSlug => fetchPage(newSlug)
)
</script>

<template>
  <div v-if="loading">
    <p class="text-center py-10">Loading...</p>
  </div>

  <div v-else-if="!error && page">
    <template v-for="block in page.content" :key="block._key">
      <!-- Standard mapped sections -->
      <component
        v-if="resolveComponent(block._type)"
        :is="resolveComponent(block._type)"
        :block="block"
      />

      <!-- Blog sections -->
      <section
        v-else-if="block._type === 'blogCardsSection' || block._type === 'blogCategoriesSection'"
        class="mx-5 my-8"
      >
        <BlogCards
          v-if="block._type === 'blogCardsSection'"
          :title="block.title"
          :limit="block.limit || 5"
          :posts="block.posts || null"
          basePath="/blog-pages"
        />
        <BlogCategories
          v-else
          :title="block.title"
          :description="block.description || ''"
          :categories="block.categories || null"
          basePath="/blog-pages/category"
        />
      </section>
    </template>
  </div>

  <NotFound v-else />
</template>
