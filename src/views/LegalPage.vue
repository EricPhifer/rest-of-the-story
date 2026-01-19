<script setup>
  import { onMounted, ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { useHead } from '@vueuse/head'
  import { client } from '@/sanity'
  import legalPageQuery from '@/queries/legalPages'
  import { PortableText } from '@portabletext/vue'
  import { truncateForDescription } from '@/composables/useStructuredData'

  const route   = useRoute()
  const page    = ref(null)
  const loading = ref(true)
  const error   = ref(null)

  // SEO: Dynamic meta tags
  useHead(() => {
    const p = page.value
    if (!p) return { title: 'Loading...' }

    const title = p.title
    const desc = truncateForDescription(extractTextFromBody(p.body))
    const url = typeof window !== 'undefined' ? window.location.href : `/legal/${p.slug?.current}`

    return {
      title,
      meta: [
        { name: 'description', content: desc },
        { property: 'og:title', content: title },
        { property: 'og:description', content: desc },
        { property: 'og:url', content: url }
      ],
      link: [
        { rel: 'canonical', href: url }
      ]
    }
  })

  function extractTextFromBody(body) {
    if (!body || !Array.isArray(body)) return ''
    return body
      .filter(block => block._type === 'block')
      .map(block => {
        if (!block.children) return ''
        return block.children
          .filter(child => child._type === 'span')
          .map(span => span.text)
          .join('')
      })
      .join(' ')
      .slice(0, 300)
  }

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
