<template>
  <section
    class="copyright bg-[var(--color-secondary-dark)] text-center text-sm text-[var(--color-white)] space-y-1 py-6"
  >
    <!-- Legal Pages -->
    <div v-if="legalPages.length" class="space-x-1">
      <template 
        v-for="(page, idx) in legalPages" 
        :key="page._id || page.slug.current"
      >
        <RouterLink
          :to="`/legal/${page.slug.current}`"
          class="hover:underline"
        >
          {{ page.title }}
        </RouterLink>
        <span v-if="idx < legalPages.length - 1">|</span>
      </template>
    </div>

    <!-- Copyright Line -->
    <div>
      &copy; {{ currentYear }} {{ companyName }}. All Rights Reserved.
    </div>

    <!-- Crafted By Line -->
    <div v-if="credits.length">
      Crafted by&nbsp;
      <template v-for="(c, idx) in credits" :key="c.url">
        <a
          :href="c.url"
          class="hover:underline"
          target="_blank"
          rel="noopener"
        >
          {{ c.name }}
        </a>
        <span v-if="idx < credits.length - 2">
          , 
        </span>
        <span v-else-if="idx === credits.length - 2"> 
          &amp; 
        </span>
      </template>
    </div>
  </section>
</template>

<script setup>
  import { h } from 'vue'
  import { RouterLink } from 'vue-router'
  import { getActivePinia, setActivePinia, createPinia } from 'pinia'

  // Activate Pinia in tests, just in case
  if (!getActivePinia()) {
    setActivePinia(createPinia())
  }

  const props = defineProps({
    companyName: { type: String, required: true },
    legalPages:  { type: Array,  default: () => [] },
    credits:     { type: Array,  default: () => [] }
  })

  const { companyName, legalPages, credits } = props
  const currentYear = new Date().getFullYear()
</script>
