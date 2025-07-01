export const useSearchStore = defineStore('search', {
  state: () => ({
    query: '',
    results: [],
    isSearching: false,
    error: null
    // maybe include other info: e.g. facets, pagination, etc. depending on search needs
  }),
  actions: {
    async search(query) {
      this.query = query
      if (!query) {
        this.results = []
        return
      }
      this.isSearching = true
      this.error = null
      try {
        // Example for Algolia:
        // Use algoliasearch client (assuming it's set up elsewhere or via environment config)
        const algoliaClient = /* initialize Algolia client with app id/key */
        const index = algoliaClient.initIndex('your_index_name')
        const res = await index.search(query)
        this.results = res.hits || []
      } catch (err) {
        console.error('Search query failed:', err)
        this.error = err
      } finally {
        this.isSearching = false
      }
    }
  }
})
