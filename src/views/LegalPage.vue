<script setup>
  import { onMounted, ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { client } from '@/sanity'
  import legalPageQuery from '@/queries/legalPages'
  import { PortableText } from '@portabletext/vue'

  const route   = useRoute()
  const page    = ref(null)
  const loading = ref(true)
  const error   = ref(null)

  async function fetchPage() {
    loading.value = true
    error.value   = null
    try {
      const result = await client.fetch(legalPageQuery, { slug: route.params.slug })
      if (!result) {
        error.value = 'Page not found.'
      } else {
        page.value = result
      }
    } catch (err) {
      console.error(err)
      error.value = 'Page not found.'
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchPage)
  // If you navigate between legal pages without full reload:
  watch(() => route.params.slug, fetchPage)
</script>

<template>
  <section class="legal-pages max-w-3xl mx-auto py-12 px-4">
    <div v-if="loading">Loading…</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div class="my-12" v-else>
      <h1 
        class="text-3xl font-bold mb-12 p-3 border-4 border-[var(--color-accent)]"
      >
        {{ page.title }}
      </h1>
      <div class="text-left leading-relaxed">
        <PortableText 
          :value="page.body"
        ></PortableText>
      </div>  
    </div>
  </section>
</template>
