<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { client } from '@/sanity'
import pageQuery from '@/queries/pages'
import { useHead } from '@vueuse/head'
import { useLocalBusinessSchema, truncateForDescription } from '@/composables/useStructuredData'

// Homepage title fallback when the Sanity `seo.title` field is empty.
// A CMS-set seo.title always wins over this.
const HOME_TITLE =
  'The Rest of the Story | Kids & Maternity Consignment in Elizabeth, CO'

// Homepage <h1>: keyword + location. Passed to the hero so it renders as the
// single H1 while the CMS hero heading (the brand tagline) drops to a subhead.
const HOME_H1 = 'Kids & Maternity Consignment in Elizabeth, CO'

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

// A hero section supplies the page's <h1>. When a page has no hero heading,
// render an sr-only <h1> from the page title so every page has exactly one.
const hasHeroHeading = computed(() =>
  (page.value?.content || []).some(b => b._type === 'heroSection' && b.heading)
)

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

// Fallback meta description: plain text pulled from the page's section bodies
// (hero subtitle, text sections) when no seo.description/excerpt is set. Avoids
// shipping an empty <meta name="description"> on pages that don't set one.
function deriveDescription(content) {
  if (!Array.isArray(content)) return ''
  const parts = []
  for (const block of content) {
    if (!Array.isArray(block?.body)) continue
    const text = block.body
      .filter(b => b?._type === 'block' && Array.isArray(b.children))
      .map(b => b.children.filter(c => c?._type === 'span').map(c => c.text).join(''))
      .join(' ')
      .trim()
    if (text) parts.push(text)
    if (parts.join(' ').length >= 160) break
  }
  return truncateForDescription(parts.join(' ').trim(), 160)
}

// LocalBusiness (ConsignmentShop) JSON-LD — homepage only.
useLocalBusinessSchema(() => props.slug === 'home')

// reactive head so tags update without stacking
useHead(() => {
  const d = page.value
  if (!d) return { title: 'Loading…' }

  const SITE = 'https://therestofthestory.store'
  const isHome = props.slug === 'home'
  const title = d.seo?.title || (isHome ? HOME_TITLE : d.title)
  const desc  = d.seo?.description || d.excerpt || deriveDescription(d.content)
  // Per-page canonical (also used for og:url). Without this, every page inherited
  // the static homepage canonical and looked like a duplicate of the home page.
  const canonical = isHome ? `${SITE}/` : `${SITE}/${props.slug}`

  // Prefer page-level mainImage, fall back to hero image if present
  const heroImg = d.content?.find?.(b => b._type === 'heroSection')?.image?.asset?.url
  const img     = d.mainImage?.asset?.url || heroImg

  return {
    title,
    meta: [
      { name: 'description', content: desc },
      { property: 'og:title', content: title },
      { property: 'og:description', content: desc },
      { property: 'og:url', content: canonical },
      ...(img ? [{ property: 'og:image', content: img }] : []),
    ],
    link: [
      { rel: 'canonical', href: canonical },
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
    <h1 v-if="!hasHeroHeading && page.title" class="sr-only">{{ page.title }}</h1>
    <template v-for="block in page.content" :key="block._key">
      <!-- Standard mapped sections -->
      <component
        v-if="resolveComponent(block._type)"
        :is="resolveComponent(block._type)"
        :block="block"
        v-bind="block._type === 'heroSection' && slug === 'home'
          ? { seoHeading: HOME_H1 }
          : {}"
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
