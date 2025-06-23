<!-- src/components/Map.vue -->
<template>
  <section class="w-full h-[400px] relative overflow-hidden" v-if="mapUrl">
    <iframe
      class="absolute top-0 left-0 w-full h-full border-0"
      :src="mapUrl"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </section>
</template>

<script setup>
 defineProps({
   mapUrl: String
 });
</script>
