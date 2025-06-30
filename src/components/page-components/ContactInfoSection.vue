<!-- src/components/ContactInformationSection.vue -->
<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
 defineProps({
   block: Object
 })
</script>

<template>
  <section class="py-12 bg-gray-50 text-gray-900">
    <div class="max-w-4xl mx-auto px-4">
      <h2 class="text-2xl font-semibold mb-6">Contact Information</h2>

      <!-- Store Hours -->
      <div class="mb-6">
        <h3 class="text-lg font-medium mb-2">Store Hours</h3>
        <ul class="space-y-1">
          <li v-for="(entry, index) in block.storeHours" :key="index">
            <span class="font-medium">{{ entry.days }}:</span>
            {{ entry.open }} – {{ entry.close }}
          </li>
        </ul>
      </div>

      <!-- Address -->
      <div class="mb-4 flex items-start gap-3">
        <span class="text-xl">
          <FontAwesomeIcon :icon="['fas', `${block.addressIcon}`]" ></FontAwesomeIcon>
        </span>
        <p>{{ block.address }}</p>
      </div>

      <!-- Phone -->
      <div class="mb-4 flex items-start gap-3">
        <span class="text-xl">
          <FontAwesomeIcon :icon="['fas', `${block.phoneIcon}`]"></FontAwesomeIcon>
        </span>
        <a :href="`tel:${block.phone}`" class="hover:underline">{{ block.phone }}</a>
      </div>

      <!-- Email -->
      <div class="flex items-start gap-3">
        <span class="text-xl">
          <FontAwesomeIcon :icon="['fas', `${block.emailIcon}`]"></FontAwesomeIcon>
        </span>
        <a :href="`mailto:${block.email}`" class="hover:underline">{{ block.email }}</a>
      </div>
    </div>
  </section>
</template>
