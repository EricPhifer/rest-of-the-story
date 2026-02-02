<template>
  <section class="px-4 pt-12 pb-36">
    <!-- Hero Section -->
    <div class="relative max-w-4xl mx-auto h-32 md:h-48 w-full">
      <img
        v-if="heroImage"
        :src="urlFor(heroImage)"
        :alt="title"
        class="w-full h-full object-cover"
      />
      <div class="hero-text-bg absolute inset-0 flex items-center justify-center px-4">
        <h1
          class="text-white text-3xl md:text-5xl font-bold text-center opacity-100"
        >
          {{ title }}
        </h1>
      </div>
    </div>

    <!-- FAQs Accordion -->
    <div
      v-for="(faq, idx) in faqs"
      :key="idx"
      class="max-w-4xl mx-auto border-b border-gray-300 py-4"
    >
      <button
        @click="toggle(idx)"
        class="w-full text-left flex justify-between items-center focus:outline-none"
      >
        <span class="text-lg font-medium">{{ faq.question }}</span>
        <svg
          :class="{ 'transform rotate-180': openIndex === idx }"
          class="w-5 h-5 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <transition name="fade">
        <div
          v-if="openIndex === idx"
          class="mt-3 px-8 prose prose-lg text-gray-700 text-left"
        >
          <PortableText :value="faq.answer" />
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup>
  import { ref, onMounted, watch } from 'vue'
  import { useHead } from '@vueuse/head'
  import { client, urlFor } from '@/sanity'
  import { PortableText } from '@portabletext/vue'
  import faqPageQuery from '@/queries/faqPage'
  import { useFaqSchema } from '@/composables/useStructuredData'

  const title       = ref('')    // page heading
  const heroImage   = ref(null)  // image object for urlFor()
  const faqs        = ref([])    // list of { question, answer }
  const openIndex   = ref(null)  // accordion state

  function toggle(i) {
    openIndex.value = openIndex.value === i ? null : i
  }

  // SEO: Dynamic meta tags
  useHead(() => {
    const pageTitle = title.value || 'Frequently Asked Questions'
    const desc = 'Find answers to common questions about The Rest of the Story Consignment store.'
    const url = typeof window !== 'undefined' ? window.location.href : '/faqs'

    return {
      title: pageTitle,
      meta: [
        { name: 'description', content: desc },
        { property: 'og:title', content: pageTitle },
        { property: 'og:description', content: desc },
        { property: 'og:url', content: url }
      ],
      link: [
        { rel: 'canonical', href: url }
      ]
    }
  })

  // SEO: FAQ structured data
  watch(
    () => faqs.value,
    (faqList) => {
      if (faqList && faqList.length > 0) {
        useFaqSchema(faqList)
      }
    },
    { immediate: true }
  )

  onMounted(async () => {
    try {
      const data = await client.fetch(faqPageQuery)
      title.value     = data.title || 'Frequently Asked Questions'
      heroImage.value = data.heroImage
      faqs.value      = data.faqs || []
    } catch (err) {
      console.error('Failed to fetch FAQ page:', err)
    }
  })
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  .hero-text-bg {
    background-color: rgba(155,134,122,0.75);
  }
</style>
