// src/stores/useFooterStore.js
import { defineStore } from 'pinia'
import { client } from '@/sanity'
import footerMainQuery from '@/queries/footer'

export const useFooterStore = defineStore('footer', {
  state: () => ({
    main: {
      logo: null,
      navLinks: [],
      blogSection: {
        heading: '',
        body: '',
        buttonText: '',
        buttonSlug: ''
      },
      newsletterForm: {
        placeholder: '',
        buttonText: '',
        formAction: ''
      },
      mapContent: [],          // [ { mapUrl } ]
      contactInfo: {           // matches the contactInfo object
        address: '',
        addressIcon: '',
        phone: '',
        phoneIcon: '',
        email: '',
        emailIcon: ''
      },
      socialMediaLinks: [],    // [ { platform, url, icon } ]
      copyrightContent: []     // [ { companyName, legalPages, contributors } ]
    },
    isLoading: false,
    loaded: false,
    error: null
  }),

  actions: {
    async fetchFooter() {
      this.isLoading = true
      this.error = null

      try {
        const { main } = await client.fetch(footerMainQuery)

        if (main) {
          // Replace the whole `main` object in your store
          this.main = main
          this.loaded = true
        } else {
          console.warn('Footer query returned no data')
        }
      } catch (err) {
        console.error('Failed to load footer:', err)
        this.error = err
      } finally {
        this.isLoading = false
      }
    }
  }
})
