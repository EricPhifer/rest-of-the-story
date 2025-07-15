import { defineStore } from 'pinia'
import { client } from '@/sanity'
import footerMainQuery from '@/queries/footer'

export const useFooterStore = defineStore('footer', {
  state: () => ({
    main: null,
    isLoading: false,
    loaded: false,
    error: null,
  }),

  // ---- Getters for each piece of data your footer needs ----
  getters: {
    logoUrl:    (state) => state.main?.logo?.asset?.url || '',
    navLinks:   (state) => state.main?.navLinks || [],

    mapEmbedBlocks:     (state) => state.main?.mapContent?.[0]?.mapEmbedBlocks || '',

    blogSection:      (state) => state.main?.blogSection || {},
    newsletterForm:   (state) => state.main?.newsletterForm || {},

    contactInfo:      (state) => state.main?.contactInfo || {},
    socialMediaLinks: (state) => state.main?.socialMediaLinks || [],

    copyright:        (state) => state.main?.copyrightContent?.[0] || {},
  },

  // ---- One action to fetch the entire footer ----
  actions: {
    async fetchFooter() {
      this.isLoading = true
      this.error = null
      try {
        const { main } = await client.fetch(footerMainQuery)
        if (!main) {
          console.warn('No footer document found')
          return
        }
        this.main   = main
        this.loaded = true
      } catch (err) {
        console.error('Failed to load footer:', err)
        this.error = err
      } finally {
        this.isLoading = false
      }
    }
  }
})
