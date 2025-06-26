<script setup>
import { PortableText } from '@portabletext/vue'
defineProps({
  block: Object
})
</script>

<template>
  <section class="my-12 px-4 max-w-7xl mx-auto">
    <div class="grid md:grid-cols-3 gap-8">
      <div
        v-for="(card, index) in block.cards"
        :key="index"
        class="flex flex-col items-center text-center p-6 border border-gray-200 rounded-lg shadow-sm bg-white"
      >
        <div class="mb-4">
          <img
            v-if="card.iconImage?.asset?.url"
            :src="card.iconImage.asset.url"
            alt=""
            class="h-16 w-16 object-contain mx-auto"
          />
          <div
            v-else-if="card.number"
            class="text-3xl font-bold text-indigo-600"
          >
            {{ card.number }}
          </div>
        </div>
        <h3 class="text-xl font-semibold mb-2">{{ card.heading }}</h3>
        <div data-testid="body" class="prose prose-sm max-w-none mb-4">
          <PortableText :value="card.body" />
        </div>
        <a
          v-if="card.button?.text && card.button?.url"
          :href="card.button.url"
          class="mt-auto inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          {{ card.button.text }}
        </a>
      </div>
    </div>
  </section>
</template>
