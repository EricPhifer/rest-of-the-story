<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import client from '@/sanity'
import pageQuery from '@/queries/pages'

import NotFound from '@/components/NotFound.vue'
import HeroSection from '@/components/page-components/HeroSection.vue'
import TextSection from '@/components/page-components/TextSection.vue'
import ImageSection from '@/components/page-components/ImageSection.vue'
import VideoSection from '@/components/page-components/VideoSection.vue'
import ButtonSection from '@/components/page-components/ButtonSection.vue'
import TextImageSection from '@/components/page-components/TextImageSection.vue'
import ThreeCardSection from '@/components/page-components/ThreeCardSection.vue'
import ContactInfoSection from '@/components/page-components/ContactInfoSection.vue'
import contactCardSection from '@/components/page-components/ContactCardSection.vue'
import formSection from '@/components/page-components/FormSection.vue'

const route = useRoute()
const page = ref(null)
const loading = ref(true)
const notFound = ref(false)

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
    contactCardSection: contactCardSection,
    formSection: formSection,
  }[type] || null
}

onMounted(async () => {
  const slug = route.params.slug || 'home'
  try {
    const result = await client.fetch(pageQuery, { slug })
    if (result) {
      page.value = result
    } else {
      notFound.value = true
    }
  } catch (err) {
    console.error('Fetch error:', err)
    notFound.value = true
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div v-if="loading">
    <p class="text-center py-10">Loading...</p>
  </div>

  <NotFound v-else-if="notFound"></NotFound>

  <div v-else>
    <h1 class="text-3xl font-bold my-4">{{ page.title }}</h1>
    <component
      v-for="block in page.content"
      :is="resolveComponent(block._type)"
      :key="block._key"
      :block="block"
    />
  </div>
</template>
