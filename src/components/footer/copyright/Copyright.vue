<script setup>
 import { useRoute, useRouter } from 'vue-router'

 defineProps({
   companyName: String,
   legalPages: Array,
   credits: Array
 })

 const currentYear = new Date().getFullYear()

 const router = useRouter()
 const route = useRoute()

 const getInternalLink = (slug) => {
   return router.resolve({ name: 'page', params: { slug } }).href
 }
</script>

<template>
  <section class="text-center text-sm text-white-200 space-y-1 mt-8">
    <!-- Legal Pages -->
    <div>
      <template v-for="(page, index) in legalPages" :key="page._key || page._id">
        <RouterLink
          :to="`/${page.slug.current}`"
          class="hover:underline"
        >
          {{ page.title }}
        </RouterLink>
        <span v-if="index < legalPages.length - 1"> | </span>
      </template>
    </div>

    <!-- Copyright Line -->
    <div>
      &copy; {{ currentYear }} {{ companyName }}. All Rights Reserved.
    </div>

    <!-- Crafted By Line -->
    <div>
      Crafted by
      <template v-for="(credit, index) in credits" :key="credit.url">
        <a
          :href="credit.url"
          class="hover:underline"
          target="_blank"
          rel="noopener"
        >
          {{ credit.name }}
        </a>
        <span v-if="index < credits.length - 2">, </span>
        <span v-else-if="index === credits.length - 2"> &amp; </span>
      </template>
    </div>
  </section>
</template>
