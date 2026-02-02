<script setup>
  import { computed, ref, onMounted } from 'vue'
  import { PortableText } from '@portabletext/vue'
  import { urlFor } from '@/sanity'

  const { block } = defineProps({
    block: {
      type: Object,
      required: true
    }
  })

  const imageSource = block.image
  const imagePosition = block.imagePosition

  // Track detected aspect ratio
  const detectedAspectRatio = ref(null)

  // Get image dimensions from Sanity metadata if available
  const imageDimensions = computed(() => {
    const metadata = imageSource?.asset?.metadata?.dimensions
    if (metadata?.width && metadata?.height) {
      return { width: metadata.width, height: metadata.height }
    }
    return null
  })

  // Calculate aspect ratio: > 1 = landscape, < 1 = portrait, ~1 = square
  const aspectRatio = computed(() => {
    if (detectedAspectRatio.value) return detectedAspectRatio.value
    if (imageDimensions.value) {
      return imageDimensions.value.width / imageDimensions.value.height
    }
    return 1.5 // Default to landscape assumption
  })

  // Determine image type based on aspect ratio
  const imageType = computed(() => {
    const ratio = aspectRatio.value
    if (ratio >= 0.9 && ratio <= 1.1) return 'square'
    if (ratio < 0.9) return 'portrait'
    return 'landscape'
  })

  // Allow Sanity override via imageFit field (optional)
  const imageFit = computed(() => {
    return block.imageFit || 'auto' // 'auto', 'cover', 'contain'
  })

  // Generate optimized image URL
  const optimizedImageUrl = computed(() => {
    if (!imageSource?.asset) return null
    return urlFor(imageSource, { maxWidth: 800 })
  })

  const sectionId = computed(() => {
    const heading = block.heading?.toLowerCase() || ''
    if (heading.startsWith('what is consignment')) return 'consign'
    if (heading.startsWith("we've been there")) return 'about'
    return null
  })

  // Detect aspect ratio from loaded image if metadata not available
  function onImageLoad(event) {
    const img = event.target
    if (img.naturalWidth && img.naturalHeight) {
      detectedAspectRatio.value = img.naturalWidth / img.naturalHeight
    }
  }
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
      <!-- Image Container - adaptive based on aspect ratio -->
      <div
        v-if="optimizedImageUrl"
        class="w-full md:w-1/2 flex items-center justify-center"
      >
        <div
          class="image-container w-full flex items-center justify-center"
          :class="{
            'square-image': imageType === 'square',
            'portrait-image': imageType === 'portrait',
            'landscape-image': imageType === 'landscape'
          }"
        >
          <img
            :src="optimizedImageUrl"
            :alt="block.altText || block.heading || 'Section image'"
            class="rounded shadow"
            :class="{
              'object-contain': imageFit === 'contain' || (imageFit === 'auto' && imageType === 'square'),
              'object-cover': imageFit === 'cover' || (imageFit === 'auto' && imageType !== 'square'),
              'square-img': imageType === 'square',
              'portrait-img': imageType === 'portrait',
              'landscape-img': imageType === 'landscape'
            }"
            @load="onImageLoad"
          />
        </div>
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

<style scoped>
/* Base container styles */
.image-container {
  overflow: hidden;
}

/* Square images (QR codes, logos, etc.) - contain and center */
.square-image {
  max-width: 400px;
  max-height: 400px;
}
.square-img {
  max-width: 100%;
  max-height: 400px;
  width: auto;
  height: auto;
}

/* Portrait images - constrain height, preserve ratio */
.portrait-image {
  max-height: 500px;
}
.portrait-img {
  max-height: 500px;
  width: auto;
  height: auto;
  max-width: 100%;
}

/* Landscape images - fill width, natural height */
.landscape-image {
  width: 100%;
  max-height: 450px;
}
.landscape-img {
  width: 100%;
  height: auto;
  max-height: 450px;
}
</style>
