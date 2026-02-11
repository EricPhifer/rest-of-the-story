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

  // Favicon and theme CSS vars are applied inside the store's fetchSiteSettings()
  siteSettingsStore.fetchSiteSettings()
</script>