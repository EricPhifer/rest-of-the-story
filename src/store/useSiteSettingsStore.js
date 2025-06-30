// useSiteSettingsStore.js
import { defineStore } from 'pinia'
import { client } from '@/sanity'
import siteSettingsQuery from '@/queries/siteSettings'

export const useSiteSettingsStore = defineStore('siteSettings', {
  state: () => ({
    settings: null, // will hold the site settings object from Sanity
    isLoading: false,
    loaded: false,
    error: null
  }),
  actions: {
   async fetchSiteSettings() {
    this.isLoading = true
    this.error = null

    try {
      const data = await client.fetch(siteSettingsQuery)
      this.settings = data || {}
      this.loaded = true
    } catch (err) {
      console.error('Failed to fetch site settings:', err)
      this.error = err
    } finally {
      this.isLoading = false
    }

    // Apply CSS variables for theme colors
    if (this.loaded && this.settings && typeof this.settings === 'object') {
      for (const [key, val] of Object.entries(this.settings)) {
        if (val?.hex && typeof val.hex === 'string') {
          document.documentElement.style.setProperty(`--color-${key}`, val.hex)
        }
      }
    }

    // ✅ Inject favicon dynamically
    const faviconUrl = this.settings?.favicon?.asset?.url
    if (faviconUrl) {
      let link = document.querySelector("link[rel~='icon']")
      if (!link) {
        link = document.createElement('link')
        link.rel = 'icon'
        document.head.appendChild(link)
      }
      link.href = faviconUrl
     }
    // ✅ Inject font CSS variables for primary & secondary typography
    const { primaryFont, secondaryFont } = this.settings || {}
    if (primaryFont) {
      document.documentElement.style.setProperty('--font-primary', primaryFont)
    }
    if (secondaryFont) {
      document.documentElement.style.setProperty('--font-secondary', secondaryFont)
    }
  }
 }
})
