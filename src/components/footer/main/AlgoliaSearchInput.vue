<template>
  <ais-instant-search
    :search-client="searchClient"
    index-name="production_blog_posts"
  >
    <!-- Search box widget -->
    <ais-search-box
      placeholder="Search..."
      class="mb-4"
    />

    <!-- Hits/results widget -->
    <ais-hits>
      <template #item="{ item }">
        <a :href="item.url" class="block mb-2 hover:underline">
          <h6 class="font-semibold">{{ item.title }}</h6>
          <p class="text-sm text-gray-500">{{ item.excerpt }}</p>
        </a>
      </template>
    </ais-hits>
  </ais-instant-search>
</template>

<script>
import { algoliasearch } from 'algoliasearch'

export default {
  name: 'AlgoliaSearchInput',
  data() {
    return {
      // Use your Application ID + Search-Only API Key
      searchClient: algoliasearch(
        import.meta.env.VITE_ALGOLIA_APP_ID,
        import.meta.env.VITE_ALGOLIA_SEARCH_ONLY_API_KEY
      )
    }
  }
}
</script>
