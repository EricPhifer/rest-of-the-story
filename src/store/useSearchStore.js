import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => ({
    query: '',
    results: [],
    isSearching: false,
    error: null
  }),
  actions: {
    // TODO: Implement with Algolia client during search integration
    async search(query) {
      this.query = query
      if (!query) {
        this.results = []
        return
      }
      this.isSearching = true
      this.error = null
      try {
        this.results = []
      } catch (err) {
        console.error('Search query failed:', err)
        this.error = err
      } finally {
        this.isSearching = false
      }
    }
  }
})
