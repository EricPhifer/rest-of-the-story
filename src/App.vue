<template>
  <div class="min-w-screen bg-[var(--color-off-white)] flex flex-col">
    <Navigation></Navigation>
    <main class="min-h-screen flex-grow">
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