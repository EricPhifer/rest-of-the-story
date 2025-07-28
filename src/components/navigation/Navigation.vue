<template>
  <header
    v-if="block"
    id="top"
    class="w-full h-18 md:h-24 flex items-center justify-between px-4 py-2 bg-[var(--color-off-white)] shadow-md relative"
  >
    <Logo :logo="block.logo" />

    <!-- Hamburger Icon (mobile or overflow fallback) -->
    <button
      class="md:hidden z-20"
      @click="toggleMenu"
      aria-label="Toggle navigation menu"
      :aria-expanded="menuOpen.toString()"
      aria-controls="mobile-menu"
    >
      <svg
        v-if="!menuOpen"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-primary-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-primary-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Desktop Navigation -->
    <nav
      class="navigation hidden md:flex flex-grow justify-end items-center gap-6 transition-all duration-300"
      role="navigation"
      aria-label="Main navigation"
    >
      <ul class="flex gap-4" role="list">
        <li
          v-for="(link, i) in block.links"
          :key="i"
          role="listitem"
        >
          <RouterLink
            :to="`/${link.slug}`"
            class="text-primary-600 hover:underline font-semibold text-xl"
          >
            {{ link.label }}
          </RouterLink>
        </li>
      </ul>
    </nav>

    <!-- Mobile / Overflow Menu -->
    <transition name="fade">
      <nav
        v-if="menuOpen"
        id="mobile-menu"
        class="navigation absolute top-full left-0 w-full bg-white shadow-md md:hidden z-50"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <ul class="flex flex-col divide-y divide-gray-200" role="list">
          <li
            v-for="(link, i) in block.links"
            :key="i"
            class="px-4 py-3"
            role="listitem"
          >
            <RouterLink
              :to="`/${link.slug}`"
              class="block text-primary-600 hover:underline font-medium"
              @click="menuOpen = false"
            >
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { client } from '@/sanity'
import { navigationQuery } from '@/queries/navigation'
import Logo from './Logo.vue'

const block = ref(null)
const menuOpen = ref(false)

const handleKeydown = (event) => {
  if (event.key === 'Escape' || event.key === 'Esc') {
    menuOpen.value = false
  }
}

// Attach or detach Escape key listener based on menu state
watch(menuOpen, (isOpen) => {
  if (isOpen) {
    window.addEventListener('keydown', handleKeydown)
  } else {
    window.removeEventListener('keydown', handleKeydown)
  }
})

// Clean up on unmount
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

onMounted(async () => {
  block.value = await client.fetch(navigationQuery)
})
</script>


<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
