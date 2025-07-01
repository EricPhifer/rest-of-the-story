<script setup>
  import { PortableText } from '@portabletext/vue'
  import { urlFor } from '@/sanity'

  // pull in the block prop
  const { block } = defineProps({
    block: Object
  })
</script>

<template>
  <section class="cards">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <article
        v-for="(card, i) in block.cards"
        :key="i"
        role="region"
        :aria-labelledby="`three-card-heading-${i}`"
        :class="card.iconImage ? 
        'overflow-hidden bg-[var(--color-white)]' : 
        'bg-[var(--color-accent-dark)] text-[var(--color-white)]'"
      >
        <!-- image at top, covers full card width -->
        <div v-if="card.iconImage?.asset?.url" class="h-48 w-full">
          <img
            :src="urlFor(card.iconImage)"
            :alt="card.altText || card.heading || ''"
            class="w-full h-full object-cover"
          />
        </div>
        <div v-else-if="card.number" class="flex justify-center text-[var(--color-black)]">
          <div class="bg-white w-[65px] h-[65px] p-2 border-3 border-[var(--color-accent-dark)] rounded-full drop-shadow -translate-y-4">
            <span class="text-5xl">{{ card.number }}</span>
          </div>
        </div>
        <span v-else></span>

        <!-- content -->
        <div 
          :class="'flex flex-col flex-grow p-6', 
          card.iconImage ? 
          'text-[var(--color-primary-dark)]' : 
          ''"
        >
          <!-- heading -->
          <h3 :class="card.iconImage ? 'text-left text-[var(--color-primary-dark)]' : 'text-center'" :id="`three-card-heading-${i}`">
            {{ card.heading }}
          </h3>

          <!-- body -->
          <div class="prose prose-sm">
            <PortableText :value="card.body" />
          </div>

          <!-- CTA -->
          <RouterLink
            v-if="card.button?.text && card.button?.url"
            :to="card.button.url"
            class="cta"
          >
            {{ card.button.text }}
          </RouterLink>
        </div>
      </article>
    </div>
  </section>
</template>
