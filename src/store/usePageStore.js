export const usePageStore = defineStore('page', {
  state: () => ({
    pages: {},       // cache of fetched pages, keyed by slug
    currentPage: null,
    currentSlug: null,
    isLoading: false,
    error: null
  }),
  getters: {
    // Optionally, derive a notFound boolean for convenience:
    notFound: (state) => {
      return state.error && state.error.message === 'NotFound'
    }
  },
  actions: {
    async fetchPage(slug) {
      if (!slug) slug = 'home'  // default to 'home' if no slug provided
      // If the requested page is already cached, we could return it immediately:
      if (this.pages[slug]) {
        this.currentPage = this.pages[slug]
        this.currentSlug = slug
        this.error = null
        // Optionally, we might still decide to refetch in background for fresh data.
        // But for now, use cached and exit early or continue to refresh:
        // return
      }
      this.isLoading = true
      this.error = null
      this.currentSlug = slug
      try {
        const result = await client.fetch(pageQuery, { slug })
        if (result) {
          this.pages[slug] = result
          this.currentPage = result
        } else {
          // If no result found for slug, treat as 404
          this.currentPage = null
          // Use a sentinel error or flag
          const err = new Error('NotFound')
          this.error = err
          console.warn(`Page not found for slug "${slug}"`)
        }
      } catch (err) {
        console.error('Error fetching page data:', err)
        this.currentPage = null
        this.error = err  // store the error so UI can react
      } finally {
        this.isLoading = false
      }
    }
  }
})
