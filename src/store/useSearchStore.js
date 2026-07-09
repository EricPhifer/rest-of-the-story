import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => ({
    query: '',
    results: [],
    isSearching: false,
    error: null
  }),
  actions: {
    // Search is intentionally staged until there is enough blog/product content
    // to index (see rots-seo-implementation.md, tasks 8–9). The live search UI is
    // handled directly by <AlgoliaSearchInput> via vue-instantsearch; this store
    // is a placeholder for a future store-driven search and is not yet wired to
    // Algolia. It deliberately returns no results rather than pretending to query.
    async search(query) {
      this.query = query
      this.results = []
    }
  }
})
