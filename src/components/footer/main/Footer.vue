<template>
  <div v-if="footer.loaded" class="w-screen z-50">
    <!-- Map Embed -->
    <Map
      v-if="footer.main.mapContent?.length"
      :mapEmbedBlocks="footer.main.mapContent[0].mapEmbedBlocks"
      class="w-full"
    ></Map>

    <footer class="w-full bg-[var(--color-secondary-dark)] text-white py-12">
      <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">

        <!-- Left: Logo, Nav Links, Search -->
        <div class="flex flex-col items-start">
          <div class="p-12 flex flex-row">
            <RouterLink to="/" class="inline-block mb-4">
              <img
                v-if="footer.main.logo?.asset?.url"
                :src="urlFor(footer.main.logo.asset.url)"
                alt="Logo"
                class="h-24"
              />
            </RouterLink>
            <nav class="nav-links flex flex-col flex-grow gap-2 mb-6 px-12 text-left">
              <RouterLink
                v-for="link in footer.main.navLinks"
                :key="link._key"
                :to="`/${link.slug}`"
                class="text-lg uppercase hover:text-[var(--color-accent-light)] hover:underline transition-colors duration-200"
              >
                {{ link.label }}
              </RouterLink>
            </nav>
          </div>
          <div>
            <h6>Find Something New</h6>
            <AlgoliaSearchInput />
          </div>
        </div>

        <!-- Center: Contact & Social -->
        <div class="contact-us flex flex-col items-start">
          <h6>Contact Us</h6>
          <div> 
            <ul class="space-y-3 text-sm">
              <li v-if="footer.main.contactInfo.address" class="flex items-start gap-2">
                <FontAwesomeIcon 
                  :icon="['fas', `${footer.main.contactInfo.addressIcon}`]" 
                  class="info text-xl mt-0.5 text-[var(--color-white)]">
                </FontAwesomeIcon>
                <span class="text-lg text-left whitespace-pre-line leading-snug">
                  {{ footer.main.contactInfo.address }}
                </span>
              </li>
              <li v-if="footer.main.contactInfo.phone" class="flex items-start gap-2">
                <a :href="`tel:${footer.main.contactInfo.phone}`" class="flex items-start gap-2">
                  <FontAwesomeIcon 
                    :icon="['fas', `${footer.main.contactInfo.phoneIcon}`]" 
                    class="info text-xl text-[var(--color-white)]">
                  </FontAwesomeIcon>
                  <span class="text-lg">
                    {{ footer.main.contactInfo.phone }}
                  </span>
                </a>
              </li>
              <li v-if="footer.main.contactInfo.email" class="flex items-start gap-2">
                <a :href="`mailto:${footer.main.contactInfo.email}`" class="flex items-start gap-2">
                  <FontAwesomeIcon 
                    :icon="['fas', `${footer.main.contactInfo.emailIcon}`]" 
                    class="info text-xl text-[var(--color-white)]">
                  </FontAwesomeIcon>
                  <span class="text-lg">
                    {{ footer.main.contactInfo.email }}
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div class="mt-6 mb-4">
            <h6>Follow Us</h6>
            <div class="flex space-x-4">
              <a
                v-for="item in footer.main.socialMediaLinks"
                :key="item.url"
                :href="item.url"
                target="_blank"
                rel="noopener"
                class="text-2xl"
                :aria-label="item.platform"
              >
                <FontAwesomeIcon 
                  :icon="parseIcon(item.icon)" 
                  class="social text-6xl text-[var(--color-white)]">
                </FontAwesomeIcon>
              </a>
            </div>
          </div>
        </div>

        <!-- Right: Blog & Newsletter -->
        <div class="flex flex-col items-start">
          <div class="flex flex-col mb-6">
            <h6>{{ footer.main.blogSection.heading }}</h6>
            <p class="text-sm mb-4 text-left">
              {{ footer.main.blogSection.body }}
            </p>
            <RouterLink
              :to="`/${footer.main.blogSection.buttonSlug}`"
              class="buttonesque px-4 py-2 rounded mb-6 border self-end"
            >
              {{ footer.main.blogSection.buttonText }}
            </RouterLink>
          </div>
          <h6>Subscribe to our Newsletter</h6>
          <form
            :action="footer.main.newsletterForm.formAction"
            method="POST"
            target="_blank"
            class="flex flex-wrap items-stretch gap-2 w-full max-w-full"
          >
            <!-- AWeber hidden fields -->
            <input 
              type="hidden" 
              name="meta_web_form_id"   
              value="940547841" />
            <input 
              type="hidden" 
              name="meta_split_id"      
              value="" />
            <input 
              type="hidden" 
              name="listname"           
              value="awlist6896633" />
            <input 
              type="hidden" 
              name="redirect"           
              value="https://www.aweber.com/thankyou-coi.htm?m=text" />
            <input 
              type="hidden" 
              name="meta_adtracking"    
              value="Simple_Subscribe" />
            <input 
              type="hidden" 
              name="meta_message"       
              value="1" />
            <input 
              type="hidden" 
              name="meta_required"      
              value="name,email" />

            <!-- Visible subscriber fields -->
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              class="bg-white flex-1 px-3 py-2 text-black"
              required
            />
            <input
              type="email"
              name="email"
              :placeholder="footer.main.newsletterForm.placeholder"
              class="bg-white flex-1 px-3 py-2 text-black"
              required
            />
            <button
              type="submit"
              class="bg-[var(--color-off-white)] text-[var(--color-black)] px-4 py-2 font-semibold hover:bg-gray-200"
            >
              {{ footer.main.newsletterForm.buttonText }}
            </button>
          </form>

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
  import { getActivePinia, setActivePinia, createPinia } from 'pinia'
  import { h } from 'vue'
  // Store
  import { useFooterStore } from '@/store/useFooterStore'
  // Icons
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  // Components
  import Map from '@/components/footer/main/Map.vue'
  import AlgoliaSearchInput from './AlgoliaSearchInput.vue'
  import Copyright from '@/components/footer/copyright/Copyright.vue'
  import { urlFor } from '@/sanity'

  // Ensure Pinia is active even in tests
  if (!getActivePinia()) {
    setActivePinia(createPinia())
  }

  // Stub <RouterLink> so tests don’t require vue-router
  const RouterLink = {
    props: { to: { type: String, required: true } },
    setup(props, { slots, attrs }) {
      return () => h('a', { ...attrs, href: props.to }, slots.default?.())
    }
  }

  const footer = useFooterStore()

  // Turn "fa-brands fa-facebook" → ['fab','facebook']
  function parseIcon(str) {
    const parts = str.split(' ')
    const stylePart = parts.find((s) => s.startsWith('fa-'))?.slice(3)
    const namePart  = parts.find((s) => s.startsWith('fa-') && !s.includes(stylePart))?.slice(3)
    const prefixMap = { brands: 'fab', solid: 'fas', regular: 'far' }
    return [prefixMap[stylePart] || 'fas', namePart]
  }

  // Fetch on mount, but only once
  if (!footer.loaded) {
    footer.fetchFooter()
  }
</script>
