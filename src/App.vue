<template>
  <div class="min-w-screen bg-[var(--color-off-white)] flex flex-col">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:rounded focus:bg-white focus:text-[var(--color-secondary-dark)] focus:shadow-lg"
    >
      Skip to content
    </a>
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