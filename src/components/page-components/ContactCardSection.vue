<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
 defineProps({ block: Object })
</script>

<template>
  <section class="py-12 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap justify-center gap-6">

        <!-- Phone Card -->
        <div v-if="block.phone" class="flex flex-col items-center text-center bg-white rounded shadow-md p-6 w-full sm:w-60">
          <FontAwesomeIcon 
            :icon="['fas', `${block.phone.icon}`]"    
            class="text-3xl text-indigo-500 mb-2"   
            aria-hidden="true" />
          <p class="font-semibold mb-1">{{ block.phone.label }}</p>
          <a :href="`tel:${block.phone.value}`" class="text-indigo-600 hover:underline break-all">
            {{ block.phone.value }}
          </a>
        </div>

        <!-- Email Card -->
        <div v-if="block.email" class="flex flex-col items-center text-center bg-white rounded shadow-md p-6 w-full sm:w-60">
          <FontAwesomeIcon 
            :icon="['fas', `${block.email.icon}`]" 
            class="text-3xl text-indigo-500 mb-2" 
            aria-hidden="true" />
          <p class="font-semibold mb-1">{{ block.email.label }}</p>
          <a :href="`mailto:${block.email.value}`" class="text-indigo-600 hover:underline break-all">
            {{ block.email.value }}
          </a>
        </div>

        <!-- Social Media Card -->
        <div v-if="block.socialMedia?.length" class="flex flex-col items-center text-center bg-white rounded shadow-md p-6 w-full sm:w-60">
          <div class="flex space-x-4 mb-3">
            <a
              v-for="(item, index) in block.socialMedia"
              :key="index"
              :href="item.url"
              target="_blank"
              rel="noopener"
              :aria-label="item.label"
              class="text-indigo-500 hover:text-indigo-700 text-2xl"
            >
              <FontAwesomeIcon 
                :icon="['fab', `${item.icon}`]">
              </FontAwesomeIcon>
            </a>
          </div>
          <p class="font-semibold">Follow Us</p>
        </div>

      </div>
    </div>
  </section>
</template>
