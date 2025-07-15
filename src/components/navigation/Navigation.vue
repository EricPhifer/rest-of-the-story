<template>
  <header
    v-if="block"
    id="top"
    class="w-full h-18 md:h-24 flex items-center justify-between px-4 py-2 bg-[var(--color-off-white)] shadow-md"
  >
     <Logo :logo="block.logo"></Logo>
     
     <!-- Grand Opening Message -->
     <div class="w-7/8 pl-4 text-right md:text-2xl">
      <PortableText
       v-if="block.grandOpeningMessage"
       :value="block.grandOpeningMessage"
      ></PortableText>
     </div>
   </header>
  </template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { PortableText } from '@portabletext/vue'

  import { client } from '@/sanity'
  import { navigationQuery } from '@/queries/navigation'
  import Logo from './Logo.vue'

  // reactive holder for our nav document
  const block = ref(null)

  onMounted(async () => {
    block.value = await client.fetch(navigationQuery)
  })
</script>
