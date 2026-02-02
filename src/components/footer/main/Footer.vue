<template>
  <div v-if="footer.loaded" class="w-full z-50">
    <!-- Map Embed -->
    <Map
      v-if="footer.main.mapContent?.length"
      :mapEmbedBlocks="footer.main.mapContent[0].mapEmbedBlocks"
      class="w-full"
    ></Map>

    <footer class="w-full bg-[var(--color-secondary-dark)] text-white py-8 sm:py-12 px-4 sm:px-6">
      <div class="max-w-7xl mx-auto">
        <!-- Mobile: Stack vertically, Desktop: 3-column grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">

          <!-- Column 1: Logo & Nav Links -->
          <div class="flex flex-col items-center md:flex-row md:items-start gap-4 lg:gap-6">
            <!-- Logo -->
            <RouterLink to="/" class="inline-block flex-shrink-0">
              <img
                v-if="footer.main.logo?.asset?.url"
                :src="urlFor(footer.main.logo.asset.url)"
                alt="The Rest of the Story Logo"
                class="h-16 sm:h-20 lg:h-24"
              />
            </RouterLink>
            <!-- Nav Links -->
            <nav class="flex flex-col items-center md:items-start gap-1">
              <RouterLink
                v-for="link in footer.main.navLinks"
                :key="link._key"
                :to="`/${link.slug}`"
                class="text-base sm:text-lg uppercase hover:text-[var(--color-accent-light)] transition-colors duration-200"
              >
                {{ link.label }}
              </RouterLink>
            </nav>
          </div>

          <!-- Column 2: Contact & Social -->
          <div class="flex flex-col items-center md:items-start gap-6">
            <!-- Contact Us -->
            <div class="text-left">
              <h2 class="text-xl font-bold mb-3">Contact Us</h2>
              <ul class="list-none p-0 m-0 space-y-3">
                <li v-if="footer.main.contactInfo.address" class="flex items-start gap-2 justify-start">
                  <FontAwesomeIcon
                    :icon="['fas', `${footer.main.contactInfo.addressIcon}`]"
                    aria-hidden="true"
                    class="text-lg mt-0.5 flex-shrink-0"
                  />
                  <span class="text-sm sm:text-base text-left whitespace-pre-line leading-snug">
                    <PortableText :value="footer.main.contactInfo.address" />
                  </span>
                </li>
                <li v-if="footer.main.contactInfo.phone">
                  <a
                    :href="`tel:${footer.main.contactInfo.phone}`"
                    class="flex items-center gap-2 justify-start hover:text-[var(--color-accent-light)]"
                  >
                    <FontAwesomeIcon
                      :icon="['fas', `${footer.main.contactInfo.phoneIcon}`]"
                      aria-hidden="true"
                      class="text-lg flex-shrink-0"
                    />
                    <span class="text-sm sm:text-base">{{ footer.main.contactInfo.phone }}</span>
                  </a>
                </li>
                <li v-if="footer.main.contactInfo.email">
                  <a
                    :href="`mailto:${footer.main.contactInfo.email}`"
                    class="flex items-center gap-2 justify-start hover:text-[var(--color-accent-light)]"
                  >
                    <FontAwesomeIcon
                      :icon="['fas', `${footer.main.contactInfo.emailIcon}`]"
                      aria-hidden="true"
                      class="text-lg flex-shrink-0"
                    />
                    <span class="text-sm sm:text-base break-all">{{ footer.main.contactInfo.email }}</span>
                  </a>
                </li>
              </ul>
            </div>

            <!-- Follow Us -->
            <div class="text-left">
              <h2 class="text-xl font-bold mb-3">Follow Us</h2>
              <div class="flex justify-start gap-4">
                <a
                  v-for="item in footer.main.socialMediaLinks"
                  :key="item.url"
                  :href="item.url"
                  target="_blank"
                  rel="noopener"
                  :aria-label="item.platform"
                  class="hover:text-[var(--color-accent-light)] transition-colors"
                >
                  <FontAwesomeIcon
                    :icon="parseIcon(item.icon)"
                    aria-hidden="true"
                    class="text-3xl sm:text-4xl lg:text-5xl"
                  />
                </a>
              </div>
            </div>
          </div>

          <!-- Column 3: Blog & Newsletter -->
          <div class="flex flex-col items-center md:items-start md:col-span-2 lg:col-span-1">
            <!-- Blog CTA -->
            <div class="text-left mb-6 w-full max-w-sm">
              <h2 class="text-xl font-bold mb-2">{{ footer.main.blogSection.heading }}</h2>
              <p class="text-sm mb-4">
                {{ footer.main.blogSection.body }}
              </p>
              <RouterLink
                :to="`/${footer.main.blogSection.buttonSlug}`"
                class="inline-block px-4 py-2 rounded border border-white hover:bg-white hover:text-[var(--color-secondary-dark)] transition-colors"
              >
                {{ footer.main.blogSection.buttonText }}
              </RouterLink>
            </div>

            <!-- Newsletter -->
            <div class="text-left w-full max-w-sm">
              <h2 class="text-xl font-bold mb-3">Subscribe to our Newsletter</h2>
              <form
                :action="footer.main.newsletterForm.formAction"
                method="POST"
                target="_blank"
                class="flex flex-col gap-2"
              >
                <!-- AWeber hidden fields -->
                <input type="hidden" name="meta_web_form_id" value="940547841" />
                <input type="hidden" name="meta_split_id" value="" />
                <input type="hidden" name="listname" value="awlist6896633" />
                <input type="hidden" name="redirect" value="https://www.aweber.com/thankyou-coi.htm?m=text" />
                <input type="hidden" name="meta_adtracking" value="Simple_Subscribe" />
                <input type="hidden" name="meta_message" value="1" />
                <input type="hidden" name="meta_required" value="name,email" />

                <!-- Visible fields - stack on mobile -->
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  class="w-full px-3 py-2 text-black rounded-sm"
                  required
                />
                <input
                  type="email"
                  name="email"
                  :placeholder="footer.main.newsletterForm.placeholder"
                  class="w-full px-3 py-2 text-black rounded-sm"
                  required
                />
                <button
                  type="submit"
                  class="w-full bg-[var(--color-off-white)] text-[var(--color-black)] px-4 py-2 font-semibold hover:bg-gray-200 rounded-sm transition-colors"
                >
                  {{ footer.main.newsletterForm.buttonText }}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </footer>

    <Copyright
      v-if="footer.main.copyrightContent?.length"
      :companyName="footer.main.copyrightContent[0].companyName"
      :legalPages="footer.main.copyrightContent[0].legalPages"
      :credits="footer.main.copyrightContent[0].contributors"
      class="w-full"
    />
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { getActivePinia, setActivePinia, createPinia } from 'pinia'
  // Store
  import { useFooterStore } from '@/store/useFooterStore'
  // Icons
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  // Components
  import Map from './Map.vue'
  import AlgoliaSearchInput from './AlgoliaSearchInput.vue'
  import Copyright from '@/components/footer/copyright/Copyright.vue'
  import { urlFor } from '@/sanity'
  import { PortableText } from '@portabletext/vue'

  // Ensure Pinia is active even in tests
  if (!getActivePinia()) {
    setActivePinia(createPinia())
  }

  const footer = useFooterStore()

  // Turn "fa-brands fa-facebook" → ['fab','facebook']
  function parseIcon(str) {
    if (!str) return ['fas', 'question'] // fallback for missing icons
    const parts = str.split(' ')
    const stylePart = parts.find((s) => s.startsWith('fa-'))?.slice(3)
    const namePart  = parts.find((s) => s.startsWith('fa-') && !s.includes(stylePart))?.slice(3)
    const prefixMap = { brands: 'fab', solid: 'fas', regular: 'far' }
    return [prefixMap[stylePart] || 'fas', namePart || 'question']
  }

  // Fetch footer data on mount
  onMounted(() => {
    if (!footer.loaded && !footer.isLoading) {
      footer.fetchFooter()
    }
  })
</script>

<style scoped>
/* Override global ul styles in footer */
ul {
  list-style: none !important;
  padding-left: 0 !important;
}
ul ::marker {
  content: none;
}
</style>
