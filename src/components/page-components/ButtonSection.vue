<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  block: {
    type: Object,
    required: true
  }
})

const router = useRouter()

function navigateInternal(ref) {
  if (ref && ref.slug?.current) {
    router.push({ name: 'Page', params: { slug: ref.slug.current } })
  }
}
</script>

<template>
  <section class="my-10 flex justify-center">
    <div class="flex flex-wrap gap-4 justify-center">
      <template v-for="(btn, index) in block.buttons" :key="index">
        <button
          v-if="btn.internalLink"
          @click="navigateInternal(btn.internalLink)"
          class="px-5 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
        >
          {{ btn.text }}
        </button>

        <a
          v-else-if="btn.url"
          :href="btn.url"
          target="_blank"
          rel="noopener"
          class="px-5 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
        >
          {{ btn.text }}
        </a>
      </template>
    </div>
  </section>
</template>
