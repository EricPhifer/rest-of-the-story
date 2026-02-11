<template>
  <div v-if="algoliasearch">
    <ais-instant-search
      :search-client="searchClient"
      :index-name="indexName"
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
  </div>
  <div v-else>
    <p>Search feature coming soon!</p>
  </div>
</template>

<script>
  import { algoliasearch } from 'algoliasearch'

  const appId = import.meta.env.VITE_ALGOLIA_APP_ID
  const apiKey = import.meta.env.VITE_ALGOLIA_SEARCH_KEY
  const indexName = import.meta.env.VITE_ALGOLIA_INDEX_NAME

  export default {
    name: 'AlgoliaSearchInput',
    data() {
      return {
        // Use your Application ID + Search-Only API Key
        searchClient: algoliasearch(
          appId,
          apiKey
        )
      }
    }
  }
</script>
