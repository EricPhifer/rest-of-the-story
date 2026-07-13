<!-- src/components/footer/main/Map.vue -->
<template>
  <section
    v-if="htmlString"
    class="w-full h-[400px] relative overflow-hidden"
    role="region"
    aria-label="Store location map"
  >
    <div class="absolute inset-0" v-html="htmlString"></div>
  </section>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    mapEmbedBlocks: {
      type: Array,
      default: () => []
    }
  })
  
  // Pull out the text from each block’s children and join into one HTML string
  const htmlString = computed(() => {
    const raw = props.mapEmbedBlocks
      .map(block =>
        // each block has a `children` array; each child has `.text`
        block.children.map(child => child.text).join('')
      )
      .join('\n')
    if (!raw) return ''
    // The Google Maps embed pulls ~450KB of Maps JS. It lives in the footer,
    // well below the fold, so let the browser defer it with native iframe
    // lazy-loading — keeps that payload off the initial (LCP) load path.
    // Only inject on an <iframe> that doesn't already declare loading=.
    return raw.replace(/<iframe(?![^>]*\bloading=)/gi, '<iframe loading="lazy"')
  })
</script>