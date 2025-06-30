<!-- src/components/footer/main/Map.vue -->
<template>
  <section
    v-if="htmlString"
    class="w-full h-[400px] relative overflow-hidden"
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
  return props.mapEmbedBlocks
    .map(block =>
      // each block has a `children` array; each child has `.text`
      block.children.map(child => child.text).join('')
    )
    .join('\n')
})
</script>