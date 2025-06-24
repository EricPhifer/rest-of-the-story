<script setup>
import PortableText from '@portabletext/vue'

defineProps({
  block: {
    type: Object,
    required: true
  }
})

const imageUrl = block.image?.asset?.url
const imagePosition = block.imagePosition || 'right'
</script>

<template>
  <section class="my-12">
    <div
      class="flex flex-col md:flex-row items-center gap-6"
      :class="{
        'md:flex-row-reverse': imagePosition === 'right',
        'md:flex-row': imagePosition === 'left'
      }"
    >
      <!-- Image -->
      <div v-if="imageUrl" class="w-full md:w-1/2">
        <img
          :src="imageUrl"
          :alt="block.heading || 'Section image'"
          class="rounded shadow max-w-full h-auto object-cover"
        />
      </div>

      <!-- Text -->
      <div class="w-full md:w-1/2">
        <h2 v-if="block.heading" class="text-2xl font-semibold mb-4">
          {{ block.heading }}
        </h2>

        <div v-if="block.body" class="prose max-w-none">
          <PortableText :value="block.body" />
        </div>
      </div>
    </div>
  </section>
</template>
