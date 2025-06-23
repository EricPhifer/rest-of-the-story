<!-- src/views/FaqPage.vue -->
<template>
 <section class="max-w-4xl mx-auto px-4 py-12">
   <!-- Hero Section -->
  <div class="relative h-64 md:h-96 w-full">
    <img
      v-if="heroImage"
      :src="heroImage"
      alt="FAQ Hero"
      class="w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <h1 class="text-white text-3xl md:text-5xl font-bold text-center">Frequently Asked Questions</h1>
    </div>
  </div>

   <div v-for="(faq, index) in faqs" :key="index" class="border-b border-gray-300 py-4">
     <button
       @click="toggle(index)"
       class="w-full text-left flex justify-between items-center focus:outline-none"
     >
       <span class="text-lg font-medium">{{ faq.question }}</span>
       <svg
         :class="{'transform rotate-180': openIndex === index}"
         class="w-5 h-5 transition-transform duration-300"
         fill="none"
         stroke="currentColor"
         viewBox="0 0 24 24"
       >
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
       </svg>
     </button>

     <transition name="fade">
       <div v-if="openIndex === index" class="mt-3 text-gray-700">
         <p>{{ faq.answer }}</p>
       </div>
     </transition>
   </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { client } from '@/sanity'
import faqPageQuery from '../queries/faqPageQuery'

const faqs = ref([])
const openIndex = ref(null)
const heroImage = ref(null)

const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index
}

onMounted(async () => {
  const data = await client.fetch(faqPageQuery)
  faqs.value = data.faqs || []
  heroImage.value = data.heroImage?.asset?.url || ''
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
