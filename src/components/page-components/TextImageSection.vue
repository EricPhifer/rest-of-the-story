<script setup>
  import { computed } from 'vue'
  import { PortableText } from '@portabletext/vue'
  import { urlFor } from '@/sanity'

  const { block } = defineProps({
    block: {
      type: Object,
      required: true
    }
  })

  const imageUrl = block.image?.asset?.url
  const imagePosition = block.imagePosition

  const sectionId = computed(() => {
  const heading = block.heading?.toLowerCase() || ''
  if (heading.startsWith('what is consignment')) return 'consign'
  if (heading.startsWith("we've been there")) return 'about'
  return null
})
</script>

<template>
  <section 
    :id="sectionId || undefined"
    class="text-section my-36 py-24 mx-6 sm:mx-12 bg-[var(--color-primary-light)]"
    role="region"
    aria-labelledby="section-heading"
  >
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
          :src="urlFor(imageUrl)"
          :alt="block.altText || block.heading || 'Section image'"
          class="rounded shadow w-full h-auto object-cover"
        />
      </div>

      <!-- Text -->
      <div class="w-full md:w-1/2">
        <h2 v-if="block.heading" id="section-heading">
          {{ block.heading }}
        </h2>

        <div v-if="block.body" class="prose max-w-none">
          <PortableText :value="block.body" />
        </div>
      </div>
    </div>
  </section>
</template>
