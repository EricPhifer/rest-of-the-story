<script setup>
import { PortableText } from '@portabletext/vue'
import { RouterLink } from 'vue-router'
import { urlFor } from '@/sanity'

// App version exposed via Vite/Webpack define plugin
const appVersion = __APP_VERSION__

function isVersion1(version) {
  return version.startsWith('1.')
}

function getLinkPath(url) {
  if (!url) return '/'

  // From GROQ, `url` is a slug object: { current: 'about' }
  if (typeof url === 'object' && url.current) {
    url = url.current
  }

  if (typeof url !== 'string') return '/'

  return isVersion1(appVersion)
    ? `#${url}`              // v1 scroll behavior
    : `/${url}`              // v2 route to internal page
}

const linkComponent = isVersion1(appVersion) ? 'a' : RouterLink

const { block } = defineProps({
  block: Object
})
</script>

<template>
  <section class="cards px-4 sm:px-6 lg:px-8 py-12">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <article
        v-for="(card, i) in block.cards"
        :key="i"
        role="region"
        :aria-labelledby="`three-card-heading-${i}`"
        :class="[
          'flex flex-col h-full',
        card.iconImage
          ? 'bg-[var(--color-white)] overflow-hidden'
          : 'bg-[var(--color-accent-dark)] text-[var(--color-white)]']"
      >
        <!-- icon or image -->
        <div v-if="card.iconImage?.asset?.url" class="min-h-[12rem] w-full">
          <img
            :src="urlFor(card.iconImage)"
            :alt="card.altText || card.heading || ''"
            class="w-full h-full object-cover"
          />
        </div>
        <div
          v-else-if="card.number"
          class="flex justify-center text-[var(--color-black)]"
        >
          <div
            class="bg-[var(--color-white)] w-[65px] h-[65px] p-2 border-4 border-[var(--color-accent-dark)] rounded-full drop-shadow -translate-y-4"
          >
            <span class="text-5xl">{{ card.number }}</span>
          </div>
        </div>

        <!-- content -->
        <div class="flex flex-col flex-grow p-6">
          <h2
            :id="`three-card-heading-${i}`"
            :class="[
              'text-xl font-bold mb-2',
              card.iconImage ? 'text-left text-[var(--color-primary-dark)]' : 'text-center'
            ]"
          >
            {{ card.heading }}
          </h2>

          <div 
            :class="'prose prose-sm mb-4', 
            card.iconImage ? 'text-[var(--color-black)]' : 'text-[var(--color-white)]'"
          >
            <PortableText :value="card.body" />
          </div>

          <component
            v-if="card.button?.text && card.button?.url"
            :is="linkComponent"
            :href="linkComponent === 'a' ? getLinkPath(card.button.url) : undefined"
            :to="linkComponent !== 'a' ? getLinkPath(card.button.url) : undefined"
            class="cta mt-auto inline-block"
          >
            {{ card.button.text }}
          </component>
        </div>
      </article>
    </div>
  </section>
</template>
