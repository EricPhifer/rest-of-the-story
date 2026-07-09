<template>
  <header
    v-if="block"
    id="top"
    class="w-full h-18 md:h-24 flex items-center justify-between px-4 py-2 bg-[var(--color-background)] shadow-md relative"
  >
    <Logo :logo="block.logo" />

    <!-- Right-side controls: desktop nav + search + hamburger -->
    <div class="flex items-center gap-2 md:gap-4">
      <!-- Desktop Navigation -->
      <nav
        class="navigation hidden md:flex items-center gap-6"
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
              class="text-[var(--color-text)] hover:underline font-semibold text-xl"
            >
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <!-- Search: a single, always-mounted #autocomplete (no teleport). On mobile
           the widget renders as a compact button that opens a fullscreen modal, so
           it's always visible here. On desktop it's an inline input that collapses
           behind the toggle. -->
      <!-- Site search: the widget itself is a compact button that opens a
           fullscreen search modal in one click (no separate toggle needed). -->
      <div class="flex items-center">
        <AlgoliaSearch />
      </div>

      <!-- Light/dark toggle -->
      <button
        type="button"
        class="p-1.5 rounded-full text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
        :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="toggleTheme"
      >
        <FontAwesomeIcon :icon="['fas', theme === 'dark' ? 'sun' : 'moon']" class="text-xl" />
      </button>

      <!-- Hamburger Icon (mobile) -->
      <button
        ref="hamburgerRef"
        class="md:hidden z-20 p-1"
        @click="toggleMenu"
        aria-label="Toggle navigation menu"
        :aria-expanded="menuOpen.toString()"
        aria-controls="mobile-menu"
      >
        <svg
          v-if="!menuOpen"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-[var(--color-text)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-[var(--color-text)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile / Overflow Menu (nav links) -->
    <transition name="fade">
      <nav
        v-if="menuOpen"
        id="mobile-menu"
        ref="mobileMenuRef"
        class="navigation absolute top-full left-0 w-full bg-[var(--color-surface)] shadow-md md:hidden z-50"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <ul class="flex flex-col divide-y divide-[var(--color-border)]" role="list">
          <li
            v-for="(link, i) in block.links"
            :key="i"
            class="px-4 py-3"
            role="listitem"
          >
            <RouterLink
              :to="`/${link.slug}`"
              class="block text-[var(--color-text)] hover:underline font-medium"
              @click="closeMenu({ restoreFocus: false })"
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
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { client } from '@/sanity'
import { navigationQuery } from '@/queries/navigation'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Logo from './Logo.vue'
import AlgoliaSearch from '@/components/search/AlgoliaSearch.vue'
import { useTheme } from '@/composables/useTheme'

const { theme, toggle: toggleTheme } = useTheme()

const block = ref(null)
const menuOpen = ref(false)
const hamburgerRef = ref(null)
const mobileMenuRef = ref(null)

function menuFocusables() {
  if (!mobileMenuRef.value) return []
  return [...mobileMenuRef.value.querySelectorAll('a[href], button:not([disabled])')]
}

const openMenu = async () => {
  menuOpen.value = true
  await nextTick()
  menuFocusables()[0]?.focus()
}

const closeMenu = ({ restoreFocus = true } = {}) => {
  if (!menuOpen.value) return
  menuOpen.value = false
  if (restoreFocus) hamburgerRef.value?.focus()
}

const toggleMenu = () => {
  menuOpen.value ? closeMenu() : openMenu()
}

const handleKeydown = (event) => {
  if (event.key === 'Escape' || event.key === 'Esc') {
    closeMenu()
    return
  }
  // Trap Tab within the open mobile menu.
  if (menuOpen.value && event.key === 'Tab') {
    const items = menuFocusables()
    if (!items.length) return
    const first = items[0]
    const last = items[items.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }
}

onMounted(async () => {
  window.addEventListener('keydown', handleKeydown)
  block.value = await client.fetch(navigationQuery)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
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
