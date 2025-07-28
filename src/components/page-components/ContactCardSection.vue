<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps({
  block: {
    type: Object,
    required: true
  }
})

// Helper to split e.g. "fa-solid fa-phone" → ["fa-solid","fa-phone"]
function parseIcon(iconClass) {
  return iconClass.split(' ')
}
</script>

<template>
  <section class="contact-cards pt-0 pb-24">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap gap-6 justify-center">

        <!-- SOCIAL (FOLLOW US) CARD -->
        <div
          v-if="block.socialMedia?.length"
          class="flex flex-col items-center text-center bg-[var(--color-accent-light)] rounded-lg px-6 py-8 flex-grow"
        >
          <p class="uppercase font-semibold mb-3 inline-block border-b-3 border-[var(--color-secondary-dark)] pb-1 text-xl">
            {{ block.socialLabel || 'Follow Us' }}
          </p>
          <div class="flex space-x-4 mt-3">
            <a
              v-for="(item, i) in block.socialMedia"
              :key="i"
              :href="item.url"
              target="_blank"
              rel="noopener"
              :aria-label="item.label"
              class="social-icon text-3xl text-[var(--color-secondary-dark)] hover:text-gray-900"
            >
              <FontAwesomeIcon :icon="parseIcon(item.icon)" aria-hidden="true" class="text-5xl hover:color-[var(--color-secondary-light)] hover:no-underline"/>
            </a>
          </div>
        </div>

        <!-- PHONE (CALL US) CARD -->
        <div
          v-if="block.phone"
          class="flex flex-col items-center text-center bg-[var(--color-accent-light)] rounded-lg px-6 py-8 flex-grow w-full sm:w-60"
        >
          <p class="uppercase font-semibold mb-3 inline-block border-b-3 border-[var(--color-secondary-dark)] pb-1 text-xl">
            {{ block.phone.label }}
          </p>
          <div class="flex items-center space-x-2 mt-3">
            <FontAwesomeIcon
              :icon="parseIcon(block.phone.icon)"
              class="text-2xl text-[var(--color-secondary-dark)]"
              aria-hidden="true"
            />
            <a
              :href="`tel:${block.phone.value}`"
              class="text-[var(--color-secondary-dark)] text-xl break-all"
            >
              {{ block.phone.value }}
            </a>
          </div>
        </div>

        <!-- EMAIL (EMAIL US) CARD -->
        <div
          v-if="block.email"
          class="flex flex-col items-center text-center max-w-3xl bg-[var(--color-accent-light)] rounded-lg px-6 py-12 flex-grow"
        >
          <p class="uppercase font-semibold mb-3 inline-block border-b-3 border-[var(--color-secondary-dark)] pb-1 text-xl">
            {{ block.email.label }}
          </p>
          <div class="flex items-center space-x-2 mt-3">
            <FontAwesomeIcon
              :icon="parseIcon(block.email.icon)"
              class="text-2xl text-[var(--color-secondary-dark)]"
              aria-hidden="true"
            />
            <a
              :href="`mailto:${block.email.value}`"
              class="text-[var(--color-secondary-dark)] text-xl break-all"
            >
              {{ block.email.value }}
            </a>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>


