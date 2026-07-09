<template>
  <div class="w-full bg-[var(--color-background)] flex flex-col">
    <a href="#main" class="skip-link">Skip to content</a>
    <Navigation></Navigation>
    <main id="main" tabindex="-1" class="min-h-screen flex-grow">
      <router-view />
    </main>
    <Footer></Footer>
  </div>
</template>

<script setup>
  // Import components
  import Navigation from './components/navigation/Navigation.vue';
  import { useSiteSettingsStore } from '@/store/useSiteSettingsStore'
  import Footer from './components/footer/main/Footer.vue';
  import { useHead } from '@vueuse/head'

  // Global title template: every page tab gets the brand + location for SEO.
  // Pages whose title already includes the brand (e.g. the homepage) are left
  // untouched, and a page can still fully override via its Sanity seo.title.
  const BRAND = 'The Rest of the Story'
  useHead({
    titleTemplate: (title) => {
      if (!title || title === 'Loading…') {
        return `${BRAND} | Kids & Maternity Consignment in Elizabeth, CO`
      }
      if (title.includes(BRAND)) return title
      return `${title} | ${BRAND}, Elizabeth CO`
    },
  })

  const siteSettingsStore = useSiteSettingsStore()

  // Favicon and theme CSS vars are applied inside the store's fetchSiteSettings()
  siteSettingsStore.fetchSiteSettings()
</script>