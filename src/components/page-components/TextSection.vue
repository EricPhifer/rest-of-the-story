<script setup>
import { PortableText } from '@portabletext/vue'

// pull in the block prop
const { block } = defineProps({
  block: {
    type: Object,
    required: true
  }
})

// build an ID for aria-labelledby (falls back if no heading)
const headingId = block.heading
  ? block.heading
      .toString()
      .toLowerCase()
      .replace(/[^\w]+/g, '-')
      .slice(0, 40)
  : undefined
</script>

<template>
  <section
    class="text-section max-w-4xl"
    role="region"
    :aria-labelledby="headingId"
  >
    <!-- heading -->
    <h2
      v-if="block.heading"
      :id="headingId"
    >
      {{ block.heading }}
    </h2>

    <!-- body -->
    <div
      data-testid="portable-text"
      class="prose prose-lg"
    >
      <PortableText :value="block.body" />
    </div>
  </section>
</template>
