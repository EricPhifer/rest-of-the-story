<template>
  <header
    v-if="block"
    id="top"
    class="w-full h-16 flex items-center justify-between px-4 py-2 bg-[var(--color-off-white)] shadow-md"
  >
     <!-- Logo -->
     <div class="max-w-[120px] h-full flex-shrink-0">
      <RouterLink to="/home#top">
       <img
        v-if="block.logo?.asset"
        :src="urlFor(block.logo)"
        :alt="block.logo.alt || 'Site Logo'"
        class="h-full w-full object-contain"
       />
      </RouterLink>
     </div>
     
     <!-- Grand Opening Message -->
     <div class="w-7/8 pl-4 text-right">
      <PortableText
       v-if="block.grandOpeningMessage"
       :value="block.grandOpeningMessage"
      ></PortableText>
     </div>
   </header>
  </template>

<script setup>
 import { ref, onMounted } from 'vue'
 import { RouterLink } from 'vue-router'
 import { PortableText } from '@portabletext/vue'

 import { client, urlFor } from '@/sanity'
 import { navigationQuery } from '@/queries/navigation'

 // reactive holder for our nav document
 const block = ref(null)

 onMounted(async () => {
   block.value = await client.fetch(navigationQuery)
 })
</script>
