<template>
  <section class="max-w-6xl mx-auto px-4 py-12">
    <!-- Page Title -->
    <h1 class="text-3xl font-bold mb-8 text-center">
      Sitemap
    </h1>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      Loading sitemap…
    </div>

    <!-- Sitemap Grid -->
    <nav
      v-else-if="linkGroups.length"
      aria-label="Sitemap"
      class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <div
        v-for="group in linkGroups"
        :key="group.categoryTitle"
        class="border border-gray-200 p-6 rounded shadow-sm"
      >
        <h2 class="text-xl font-semibold mb-4">
          {{ group.categoryTitle }}
        </h2>
        <ul class="space-y-2">
          <li
            v-for="link in group.links"
            :key="link.internalLink?.slug?.current || link.externalUrl"
          >
            <RouterLink
              v-if="link.internalLink?.slug?.current"
              :to="`/${link.internalLink.slug.current}`"
              class="text-blue-600 hover:underline"
            >
              {{ link.label || link.internalLink.title }}
            </RouterLink>
            <a
              v-else-if="link.externalUrl"
              :href="link.externalUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-600 hover:underline"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Coming Soon / Empty State -->
    <div v-else class="text-center py-8">
      Coming Soon!
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useHead } from '@vueuse/head'     // optional
import { client } from '@/sanity'
import sitemapQuery from '@/queries/sitemap'

const title      = ref('')
const linkGroups = ref([])
const loading    = ref(true)

onMounted(async () => {
  try {
    const data = await client.fetch(sitemapQuery)
    title.value      = data.title?.trim() || ''
    linkGroups.value = data.linkGroups || []
  } catch (err) {
    // still show “Coming Soon!”, but log for debugging
    console.error('Sitemap fetch error:', err)
  } finally {
    loading.value = false
  }
})

// optional: keep document title in sync
useHead({ title: title.value || 'Coming Soon!' })
</script>

<style scoped>
/* wrap long labels nicely */
ul li a,
ul li RouterLink {
  word-break: break-word;
}
</style>
