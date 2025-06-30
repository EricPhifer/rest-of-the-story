<!-- src/views/SiteMap.vue -->
<template>
  <section class="max-w-6xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold mb-8 text-center">{{ title }}</h1>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="(group, index) in linkGroups"
        :key="index"
        class="border border-gray-200 p-6 rounded shadow-sm"
      >
        <h2 class="text-xl font-semibold mb-4">{{ group.categoryTitle }}</h2>
        <ul class="space-y-2">
          <li
            v-for="(link, idx) in group.links"
            :key="idx"
          >
            <RouterLink
              v-if="link.internalLink"
              :to="`/${link.slug}`"
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
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { client } from '@/sanity'
import sitemapQuery from '@/queries/sitemap'

const title = ref('')
const linkGroups = ref([])

onMounted(async () => {
  const data = await client.fetch(sitemapQuery)
  title.value = data.title
  linkGroups.value = data.linkGroups || []
})
</script>
