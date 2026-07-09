import { ref } from 'vue'

// Shared, app-wide theme state. The inline script in index.html has already
// stamped <html data-theme="..."> (stored preference, else the OS setting)
// before paint, so we initialize from that.
const STORAGE_KEY = 'theme'

const theme = ref(
  (typeof document !== 'undefined' && document.documentElement.dataset.theme) || 'light'
)

function apply(next) {
  theme.value = next
  document.documentElement.dataset.theme = next
  try {
    localStorage.setItem(STORAGE_KEY, next)
  } catch (e) {
    /* private mode / storage disabled — non-fatal */
  }
}

// Follow OS changes while the visitor hasn't chosen an explicit preference.
if (typeof window !== 'undefined' && window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    let stored = null
    try {
      stored = localStorage.getItem(STORAGE_KEY)
    } catch (_) { /* ignore */ }
    if (stored !== 'light' && stored !== 'dark') {
      apply(e.matches ? 'dark' : 'light')
    }
  })
}

export function useTheme() {
  const toggle = () => apply(theme.value === 'dark' ? 'light' : 'dark')
  return { theme, toggle }
}
