<!-- src/components/NotFound.vue -->
<template>
  <div class="text-center py-20 text-gray-600">
    <h1 class="text-4xl font-bold text-red-500">
      404
    </h1>
    <p class="mt-2 text-xl">
      Sorry, the page you’re looking for doesn’t exist.
    </p>
    <RouterLink to="/" class="text-blue-500 underline mt-4 inline-block">
      Go home
    </RouterLink>
  </div>
</template>
<script setup>
  import { RouterLink } from 'vue-router';
</script>
