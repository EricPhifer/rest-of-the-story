<!--
  Hosted Algolia Experiences autocomplete.

  Owns the #autocomplete container and loads Algolia's loader script AFTER the
  container is in the DOM (a raw <script> at the end of <body> can't find it in
  an SPA). The loader reads appId/apiKey/experienceId from its own src query
  string via document.currentScript, resolves the experience, then mounts the
  widget into the FIRST #autocomplete element on the page — so render this once.

  All three values are public search credentials (they ship in the script URL by
  design); the admin key is never referenced here.
-->
<template>
  <div id="autocomplete" class="algolia-search"></div>
</template>

<script setup>
import { onMounted } from 'vue'

const appId = import.meta.env.VITE_ALGOLIA_APP_ID
const apiKey = import.meta.env.VITE_ALGOLIA_SEARCH_KEY
const experienceId = import.meta.env.VITE_ALGOLIA_EXPERIENCE_ID
const env = import.meta.env.VITE_ALGOLIA_ENV || 'prod'

const SCRIPT_ID = 'algolia-experiences-loader'

onMounted(() => {
  // Load the hosted library exactly once, even if the component ever remounts.
  if (document.getElementById(SCRIPT_ID)) return

  if (!appId || !apiKey || !experienceId) {
    console.warn(
      '[AlgoliaSearch] Missing VITE_ALGOLIA_APP_ID / VITE_ALGOLIA_SEARCH_KEY / ' +
        'VITE_ALGOLIA_EXPERIENCE_ID — search widget not loaded.'
    )
    return
  }

  const loadWidget = () => {
    // Guard again — idle callback may fire after another mount already loaded it.
    if (document.getElementById(SCRIPT_ID)) return
    const params = new URLSearchParams({ appId, apiKey, experienceId, env })
    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = `https://cdn.jsdelivr.net/npm/@algolia/experiences/dist/experiences.js?${params.toString()}`
    script.async = true
    document.body.appendChild(script)
  }

  // Defer the ~155KB Experiences runtime (and its long task) until the browser
  // is idle, so it stays out of the initial/LCP load window. The timeout caps
  // the wait so the search trigger still appears promptly on busy pages.
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(loadWidget, { timeout: 2000 })
  } else {
    setTimeout(loadWidget, 1500)
  }
})
</script>

<!-- Global (non-scoped) on purpose: the widget DOM and its fullscreen modal are
     created by Algolia's runtime and portaled into <body>, so scoped styles
     wouldn't reach them. -->
<style>
/* --- Mobile trigger: collapse to an icon-only magnifying glass --- */
.ais-AutocompleteDetachedSearchButton {
  width: 44px;
  height: 44px;
  padding: 0;
  justify-content: center;
  /* !important: the runtime's injected theme sets these and can load after us */
  background: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
}
/* Icon color: theme-aware, and !important to beat the runtime's injected theme
   which otherwise renders a fixed slate that's low-contrast on the dark header. */
.ais-AutocompleteDetachedSearchButton,
.ais-AutocompleteDetachedSearchButtonIcon,
.ais-AutocompleteDetachedSearchIcon {
  color: var(--color-text) !important;
  fill: var(--color-text) !important;
}
.ais-AutocompleteDetachedSearchButtonPlaceholder,
.ais-AutocompleteDetachedSearchButtonQuery {
  display: none;
}
.ais-AutocompleteDetachedSearchButtonIcon {
  margin: 0;
}
.ais-AutocompleteDetachedSearchIcon {
  width: 24px;
  height: 24px;
}

/* --- Fullscreen modal: the back/cancel icon ships with no dimensions (renders
       0x0, so it's invisible though still clickable). Give it a real size and a
       high-contrast color. --- */
.ais-AutocompleteBackIcon {
  width: 22px;
  height: 22px;
}
.ais-AutocompleteBackButton {
  color: var(--color-secondary-dark);
}
/* the clear (×) button is faint — firm up its contrast too */
.ais-AutocompleteClearButton {
  color: var(--color-secondary-dark);
  opacity: 0.75;
}
</style>
