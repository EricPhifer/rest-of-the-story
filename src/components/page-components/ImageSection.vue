<!-- This component displays a full-width image section with a heading, body text, and a button. -->
<script setup>
  import { PortableText } from '@portabletext/vue'

  const { block } = defineProps({
    block: {
      type: Object,
      required: true
    }
  })

  const imageUrl = block.image?.asset?.url
</script>

<template>
  <section
    class="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center text-white overflow-hidden"
    :style="imageUrl ? { backgroundImage: `url(${imageUrl})`, backgroundAttachment: 'fixed' } : {}"
  >
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>

    <!-- Content -->
    <div class="relative z-10 text-center px-6 max-w-3xl">
      <h2 v-if="block.heading" class="text-3xl md:text-5xl font-bold mb-4">
        {{ block.heading }}
      </h2>

      <div v-if="block.body" class="prose prose-invert prose-lg max-w-none mx-auto mb-4">
        <PortableText :value="block.body" />
      </div>

      <div v-if="block.button?.text && block.button?.url">
        <a
          :href="block.button.url"
          class="inline-block bg-white text-black font-semibold px-6 py-2 rounded hover:bg-gray-200 transition"
        >
          {{ block.button.text }}
        </a>
      </div>
    </div>
  </section>
</template>
