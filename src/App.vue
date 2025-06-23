<template>
  <div class="min-h-screen bg-white text-gray-900">
    <!-- Navigation bar goes here later -->
    <router-view />
    <Map></Map>
    <Footer></Footer>
    <Copyright></Copyright>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue';
  import { client } from '@/sanity';
  import { siteSettings } from '@/queries/siteSettings';

  // Import components
  import Map from './components/footer/main/Map.vue';
  import Footer from './components/footer/main/Footer.vue';
  import Copyright from './components/footer/copyright/Copyright.vue';

  onMounted(async () => {
    const settings = await client.fetch(siteSettings)
    if (settings?.primaryColor?.hex) {
      document.documentElement.style.setProperty('--color-primary', settings.primaryColor.hex)
    }
  })
</script>