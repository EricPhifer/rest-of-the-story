// src/main.js
import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import './styles/app.pcss'
import App from './App.vue'
import InstantSearch from 'vue-instantsearch/vue3/es'
import '@mux/mux-player'
// Route and store imports
import { router } from './router'
import { store } from './store'
// Icon imports
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Import entire free icon styles
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

import * as Sentry from '@sentry/vue'
import 'instantsearch.css/themes/algolia-min.css'

library.add(fas, far, fab)

const app = createApp(App)

Sentry.init({
  app,
  dsn: import.meta.env.VITE_SENTRY_DSN,
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true
});

app.component('font-awesome-icon', FontAwesomeIcon)

// use plugins
app.use(createHead())
app.use(store)
app.use(router)
app.use(InstantSearch)

// mount the app
app.mount('#app')