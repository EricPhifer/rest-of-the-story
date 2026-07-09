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

  const siteSettingsStore = useSiteSettingsStore()

  // Favicon and theme CSS vars are applied inside the store's fetchSiteSettings()
  siteSettingsStore.fetchSiteSettings()
</script>