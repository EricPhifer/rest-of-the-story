<script setup>
import { PortableText } from '@portabletext/vue'

const { block } = defineProps({
  block: {
    type: Object,
    required: true
  }
})

const imageUrl = block.image?.asset?.url
const button = block.button
</script>

<template>
  <section class="bg-white py-16 md:py-24">
    <div class="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-8">
      <!-- Text Content -->
      <div class="w-full md:w-1/2 text-center md:text-left">
        <h1 v-if="block.heading" class="text-4xl md:text-5xl font-bold mb-6">
          {{ block.heading }}
        </h1>

        <div v-if="block.body" class="prose prose-lg max-w-none mb-6">
          <PortableText :value="block.body" />
        </div>

        <div v-if="button?.text && button?.url">
          <a
            :href="button.url"
            class="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            {{ button.text }}
          </a>
        </div>
      </div>

      <!-- Image -->
      <div v-if="imageUrl" class="w-full md:w-1/2">
        <img
          :src="imageUrl"
          :alt="block.heading || 'Hero image'"
          class="w-full h-auto rounded-lg shadow"
        />
      </div>
    </div>
  </section>
</template>
