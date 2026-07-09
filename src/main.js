// src/main.js
import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import './styles/app.pcss'
import App from './App.vue'
// Route and store imports
import { router } from './router'
import { store } from './store'
// Icon imports
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Register only the icons actually used — static ones plus every icon currently
// configured in Sanity (social + contact). parseIcon() falls back to fa-question
// for anything unregistered, so if the CMS starts using a new icon, add it here.
import {
  faAngleRight, faMagnifyingGlass, faXmark, faQuestion, faSun, faMoon,
  faHouseChimney, faMapPin, faEnvelope, faPhone, faStore, faMessage, faMobile,
} from '@fortawesome/free-solid-svg-icons'
import {
  faFacebook, faInstagram, faGoogle, faYoutube,
} from '@fortawesome/free-brands-svg-icons'

library.add(
  faAngleRight, faMagnifyingGlass, faXmark, faQuestion, faSun, faMoon,
  faHouseChimney, faMapPin, faEnvelope, faPhone, faStore, faMessage, faMobile,
  faFacebook, faInstagram, faGoogle, faYoutube,
)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

// use plugins
app.use(createHead())
app.use(store)
app.use(router)

// mount the app
app.mount('#app')

// Load error monitoring off the critical path — after mount, when the browser is
// idle — so ~400KB of Sentry doesn't block first render. sendDefaultPii is off to
// match the site's privacy-first analytics posture.
if (import.meta.env.VITE_SENTRY_DSN) {
  const startSentry = () =>
    import('@sentry/vue').then(({ init }) =>
      init({ app, dsn: import.meta.env.VITE_SENTRY_DSN, sendDefaultPii: false })
    )
  if ('requestIdleCallback' in window) requestIdleCallback(startSentry)
  else setTimeout(startSentry, 2000)
}