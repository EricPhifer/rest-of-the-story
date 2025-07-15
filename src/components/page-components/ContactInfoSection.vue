<!-- src/components/ContactInformationSection.vue -->
<script setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { PortableText } from '@portabletext/vue';

  const { block } = defineProps({
    block: {
      type: Object,
      required: true
    }
  })
</script>

<template>
  <section 
    id="contact"
    class="contact my-24 py-12 text-gray-900 overflow-x-hidden"
    role="region"
    aria-labelledby="contact-heading"
  >
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl font-semibold mb-8" id="contact-heading">Contact Us</h2>

      <!-- two-column on lg+, single-column on sm/md -->
      <div class="grid grid-cols-1  sm:grid-cols-2 gap-16">
        <!-- Store Hours (left column) -->
        <div>
          <h3 class="text-lg font-bold mb-4 text-left">
            Store Hours
          </h3>
          <ul class="space-y-2">
            <li
              v-for="(entry, idx) in block.hours"
              :key="idx"
              class="flex flex-wrap gap-x-2"
            >
              <span class="font-bold">{{ entry.days }}:</span>
              <span v-if="entry.closed">Closed</span>
              <template v-else>
                <span>{{ entry.open }} – {{ entry.close }}</span>
              </template>
              <span
                v-if="entry.note"
                class="italic text-sm text-gray-600"
              >
                ({{ entry.note }})
              </span>
            </li>
          </ul>
        </div>

        <!-- Contact Entries (right column) -->
        <div class="grid grid-cols-1 gap-10">
          <div
            v-for="(contact, idx) in block.contacts"
            :key="idx"
            class="space-y-4 text-base sm:text-lg lg:text-xl"
          >
            <div class="flex items-start gap-3">
              <span class="text-lg sm:text-xl md:text-2xl text-gray-700" aria-hidden="true">
                <FontAwesomeIcon :icon="['fas', contact.addressIcon]" />
              </span>
              <div class="text-left">
                <PortableText 
                  :value="contact.address"
                ></PortableText>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <span class="text-lg sm:text-xl md:text-2xl text-gray-700" aria-hidden="true">
                <FontAwesomeIcon :icon="['fas', contact.phoneIcon]" />
              </span>
              <a
                :href="`tel:${contact.phone}`"
                class="hover:underline py-0.5"
              >
                {{ contact.phone }}
              </a>
            </div>

            <div class="flex items-start gap-3">
              <span class="text-lg sm:text-xl md:text-2xl text-gray-700" aria-hidden="true">
                <FontAwesomeIcon :icon="['fas', contact.emailIcon]" />
              </span>
              <a
                :href="`mailto:${contact.email}`"
                class="hover:underline py-0.5"
              >
                {{ contact.email }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
