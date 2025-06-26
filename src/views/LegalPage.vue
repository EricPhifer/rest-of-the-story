<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { client } from '@/sanity'
import legalPageQuery from '@/queries/legalPages'
import { PortableText } from '@portabletext/vue'

const route = useRoute()
const page = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const result = await client.fetch(legalPageQuery, { slug: route.params.slug })
    page.value = result
  } catch (err) {
    console.error(err)
    error.value = 'Page not found.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="max-w-3xl mx-auto py-12 px-4">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else>
      <h1 class="text-3xl font-bold mb-4">{{ page.title }}</h1>
      <PortableText :value="page.body" />
    </div>
  </section>
</template>
