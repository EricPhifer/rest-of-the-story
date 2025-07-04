<script setup>
  import { urlFor } from '@/sanity';
  import { RouterLink } from 'vue-router';

  const props = defineProps({
    logo: Object
  })
</script>
<template>
    <div class="max-w-[120px] md:max-w-[160px] h-full flex-shrink-0">
      <RouterLink to="/home#top">
       <img
        v-if="logo?.asset"
        :src="urlFor(logo)"
        :alt="logo.alt || 'Logo for The Rest of the Story'"
        class="h-full w-full object-contain"
       />
      </RouterLink>
     </div>
</template>