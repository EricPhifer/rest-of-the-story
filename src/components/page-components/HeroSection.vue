<script setup>
import { PortableText } from '@portabletext/vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  block: {
    type: Object,
    required: true
  }
})

const imageUrl = props.block.image?.asset?.url
const button   = props.block.button
</script>

<template>
  <section
    v-if="imageUrl"
    :style="`background-image: url(${imageUrl})`"
    class="hero relative h-[60vh] md:h-[80vh] bg-center bg-cover bg-no-repeat overflow-hidden"
    role="region"
    aria-labelledby="hero-heading"
  >
    <!-- decorative overlay -->
    <div class="absolute inset-0 bg-[var(--color-secondary-dark)]/40" aria-hidden="true" />

    <!-- content: full-size flex centering -->
    <div class="relative z-10 flex items-center justify-center h-full w-full px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center text-center">
        <!-- heading -->
        <PortableText
          v-if="block.heading"
          :value="block.heading"
          id="hero-heading"
          class="text-3xl md:text-5xl font-bold mb-4 text-white"
        >
          {{ block.heading }}
        </PortableText>

        <!-- body copy -->
        <div class="subtitle max-w-2xl mb-6 text-white">
          <PortableText :value="block.body" />
        </div>

        <!-- call-to-action -->
        <RouterLink
          v-if="button?.text && button?.url"
          :to="button.url"
          class="cta inline-block"
        >
          {{ button.text }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>
