export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    mainMenu: [],   // array of menu link objects, e.g. { label, slug }
    isLoading: false,
    loaded: false,
    error: null
  }),
  actions: {
    async fetchMainMenu() {
      this.isLoading = true
      this.error = null
      try {
        // Example: fetch pages marked to show in nav
        const data = await client.fetch(groq`*[_type == "page" && showInNavbar]{
                         "label": title, "slug": slug.current, order
                       } | order(order asc)`)
        this.mainMenu = data || []
        this.loaded = true
      } catch (err) {
        console.error('Failed to load main menu:', err)
        this.error = err
      } finally {
        this.isLoading = false
      }
    }
  }
})
