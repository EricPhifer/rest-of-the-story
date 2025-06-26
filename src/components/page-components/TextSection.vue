<script setup>
import { PortableText } from '@portabletext/vue'

defineProps({
  block: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="my-8 prose prose-lg max-w-none">
    <h2 v-if="block.heading" class="text-2xl font-semibold mb-4">
      {{ block.heading }}
    </h2>
    <div data-testid="portable-text">
      <PortableText :value="block.body" />
    </div>
  </section>
</template>
