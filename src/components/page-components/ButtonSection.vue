<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  block: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section 
    class="my-12 px-4 sm:px-6 lg:px-12"
    role="region"
    aria-labelledby="button-section-heading"
  >
    <h2 id="button-section-heading" class="sr-only">Actions</h2>
    <div class="flex flex-wrap gap-4 justify-center">
      <template v-for="(btn, i) in block.buttons" :key="i">
        <!-- Internal Link -->
        <RouterLink
          v-if="btn.internalLink?.slug?.current"
          :to="{ name: 'Page', params: { slug: btn.internalLink.slug.current } }"
          class="btn-cta block w-full sm:inline-block sm:w-auto px-5 py-3 text-center"
          :aria-label="`Go to ${btn.text}`"
        >
          {{ btn.text }}
        </RouterLink>

        <!-- External Link -->
        <a
          v-else
          :href="btn.url"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-cta block w-full sm:inline-block sm:w-auto px-5 py-3 text-center"
          :aria-label="`Open external link: ${btn.text}`"
        >
          {{ btn.text }}
        </a>
      </template>
    </div>
  </section>
</template>
