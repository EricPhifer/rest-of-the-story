<template>
  <div class="bg-[var(--color-off-white)] flex flex-col">
    <!-- Navigation bar goes here later -->
    <main class="min-h-screen flex-grow">
      <router-view />
    </main>
    <Footer></Footer>
  </div>
</template>

<script setup>
  // Import components
  import Footer from './components/footer/main/Footer.vue';
  import { useSiteSettingsStore } from '@/store/useSiteSettingsStore'

  const siteSettingsStore = useSiteSettingsStore()
  
  siteSettingsStore.fetchSiteSettings().then(() => {
    const url = siteSettingsStore.settings?.favicon?.asset?.url
    if (url) {
      let link = document.querySelector("link[rel~='icon']")
      if (!link) {
        link = document.createElement('link')
        link.rel = 'icon'
        document.head.appendChild(link)
      }
      link.href = url
    }
  })
</script>