<!-- Accessible, responsive image hero -->
<script setup>
import { urlFor } from '@/sanity'
import { PortableText } from '@portabletext/vue'
import { computed } from 'vue'

const { block } = defineProps({
  block: { type: Object, required: true }
})

// Defensive: Some Sanity images come through as object refs vs raw url.
// urlFor() should handle both; if already a string, pass through.
const imageUrl = block.image?.asset?.url

// Responsive / reduced-motion-friendly background style
const bgStyle = computed(() => {
  if (!imageUrl) return {}
  // You can chain Sanity transforms here (e.g., .width(1600).format('webp'))
  const src = urlFor(imageUrl)
  return {
    backgroundImage: `url(${src})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // we let CSS disable fixed on small screens via media query (see <style>)
    backgroundAttachment: 'fixed',
  }
})

const headingId = `hero-${block?._key || 'section'}-heading`
</script>

<template>
  <section
    class="image-section relative w-full min-h-[60vh] md:min-h-[80vh] flex items-center justify-center text-white overflow-hidden px-4 sm:px-8"
    :style="bgStyle"
    :aria-labelledby="block.heading ? headingId : null"
    role="region"
  >
    <!-- Full-bleed darkening overlay (non-interactive) -->
    <div
      class="overlay w-full h-full sm:w-8/10 sm:h-7/10 pointer-events-none absolute inset-0 z-0 bg-[var(--color-primary-dark)] opacity-90 rounded-lg"
    ></div>

    <!-- Content -->
    <div class="relative min-w-8/10 z-10 text-center p-4 sm:px-24 max-w-3xl">
      <h2
        v-if="block.heading"
        :id="headingId"
        class="border-b-3 border-[var(--color-accent)] text-3xl md:text-6xl font-bold mb-4"
      >
        {{ block.heading }}
      </h2>

      <div
        v-if="block.body"
        class="prose prose-invert prose-base md:prose-lg max-w-none mx-auto mb-4 text-left"
      >
        <PortableText :value="block.body" />
      </div>

      <div v-if="block.button?.text && block.button?.url">
        <a
          :href="block.button.url"
          class="inline-block bg-white text-black font-semibold px-6 py-2 rounded hover:bg-gray-200 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary-dark)] focus-visible:ring-[var(--color-accent)]"
        >
          {{ block.button.text }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Disable parallax on small screens for performance & motion comfort */
@media (max-width: 767.98px) {
  .image-section {
    background-attachment: scroll !important;
  }
}

/* Respect reduced motion user preference */
@media (prefers-reduced-motion: reduce) {
  .image-section {
    background-attachment: scroll !important;
  }
}
</style>
