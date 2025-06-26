<!-- src/components/footer/main/Footer.vue -->
<template>
  <footer class="bg-[#2C3E3F] text-white py-12">
    <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">

      <!-- Left: Logo, Nav Links, Search -->
      <div>
        <router-link to="/" class="inline-block mb-4">
          <img
            v-if="footer.main.logo?.asset?.url"
            :src="footer.main.logo.asset.url"
            alt="Logo"
            class="h-16"
          />
        </router-link>
        <nav class="space-x-4 mb-6">
          <router-link
            v-for="(link, index) in footer.main.navLinks"
            :key="index"
            :to="`/${link.internalLink.slug.current}`"
            class="hover:underline"
          >
            {{ link.label }}
          </router-link>
        </nav>
        <div>
          <p class="mb-2 font-semibold">Find Something New</p>
          <AlgoliaSearchInput />
        </div>
      </div>

      <!-- Center: Contact & Social -->
      <div>
        <p class="font-semibold uppercase mb-4">Contact Us</p>
        <ul class="space-y-2 text-sm">
          <li v-if="footer.contact.address">
            <i class="fa-solid fa-map-marker-alt mr-2"></i>{{ footer.contact.address }}
          </li>
          <li v-if="footer.contact.phone">
            <i class="fa-solid fa-phone mr-2"></i>{{ footer.contact.phone }}
          </li>
          <li v-if="footer.contact.email">
            <i class="fa-solid fa-envelope mr-2"></i>{{ footer.contact.email }}
          </li>
        </ul>

        <p class="mt-6 font-semibold uppercase mb-2">Follow Us</p>
        <div class="flex space-x-4">
          <a
            v-for="(item, index) in footer.social"
            :key="index"
            :href="item.url"
            target="_blank"
            rel="noopener"
            :aria-label="item.label"
            class="text-2xl"
          >
            <i :class="`fab fa-${item.icon}`"></i>
          </a>
        </div>
      </div>

      <!-- Right: Blog & Newsletter -->
      <div>
        <p class="font-semibold uppercase mb-4">{{ footer.main.blogSection.heading }}</p>
        <p class="text-sm mb-4">{{ footer.main.blogSection.body }}</p>
        <a
          :href="footer.main.blogSection.button.url"
          class="bg-[#D1E7D6] text-gray-800 px-4 py-2 rounded mb-6 inline-block font-semibold hover:bg-[#c4ddcc]"
        >
          {{ footer.main.blogSection.button.text }}
        </a>

        <p class="font-semibold uppercase mb-2">Subscribe to our Newsletter</p>
        <form
          :action="footer.main.newsletterForm.formAction"
          method="POST"
          target="_blank"
          class="flex"
        >
          <input
            type="email"
            name="email"
            :placeholder="footer.main.newsletterForm.placeholder"
            class="flex-1 px-3 py-2 rounded-l text-black"
            required
          />
          <button
            type="submit"
            class="bg-white text-gray-800 px-4 py-2 rounded-r font-semibold hover:bg-gray-200"
          >
            {{ footer.main.newsletterForm.buttonText }}
          </button>
        </form>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { client } from '@/sanity'
import footerMainQuery from '@/queries/footer'
import AlgoliaSearchInput from './AlgoliaSearchInput.vue'

// Rename the ref to exactly "footer" so the template's `footer.xxx` works
const footer = ref({
  main: {
    logo: null,
    navLinks: [],
    blogSection: {
      heading: '',
      body: '',
      button: { text: '', url: '' }
    },
    // This was accidentally nested under blogSection before:
    newsletterForm: {
      placeholder: '',
      buttonText: '',
      formAction: ''
    }
  },
  contact: {
    address: '',
    phone: '',
    email: ''
  },
  social: []
})

onMounted(async () => {
  try {
    const data = await client.fetch(footerMainQuery)
    footer.value = data
  } catch (err) {
    console.error('Failed to load footer:', err)
  }
})
</script>
