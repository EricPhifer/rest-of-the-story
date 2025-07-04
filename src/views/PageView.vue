<script setup>
  import { onMounted, ref, watch } from 'vue'
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

  const page = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const props = defineProps({
    slug: {
      type: String,
      default: 'home',
    },
  })

  function resolveComponent(type) {
    return {
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
    }[type] || null
  }

  async function fetchPage(slug) {
    loading.value = true
    error.value   = null
    page.value    = null
    try {
      const data = await client.fetch(pageQuery, { slug })
      if (!data) throw new Error('Page not found')
      page.value = data

      useHead({
        title: data.seo?.title || data.title,
        meta: [
          { name:    'description',               content: data.seo?.description || data.excerpt || '' },
          { property: 'og:title',                 content: data.seo?.title    || data.title },
          { property: 'og:description',           content: data.seo?.description || data.excerpt || '' },
          { property: 'og:url',                   content: `${window.location.origin}/${props.slug}` },
          // optional: main image if you have one
          ...(data.mainImage?.asset?.url
            ? [{ property: 'og:image', content: data.mainImage.asset.url }]
            : []),
        ]
      })
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchPage(props.slug)
  })

  // if you navigate client‐side to a different slug, re‐run the fetch
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
    <component
      v-for="block in page.content"
      :is="resolveComponent(block._type)"
      :key="block._key"
      :block="block"
    />
  </div>

  <NotFound v-else></NotFound>
</template>
