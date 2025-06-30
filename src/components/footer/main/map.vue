<!-- src/components/footer/main/Map.vue -->
<template>
  <section
    v-if="mapUrl"
    class="w-full h-[400px] relative overflow-hidden"
  >
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
const props = defineProps({
  mapUrl: String
})
</script>
