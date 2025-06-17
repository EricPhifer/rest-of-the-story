import { createApp } from 'vue'
import './styles/app.pcss'
import App from './App.vue'
import { router } from './router'
import { store } from './store'

import * as Sentry from '@sentry/vue'

const app = createApp(App)

Sentry.init({
  app,
  dsn: "https://e9d392fb3a36ebaaa0fa126b54c890fe@o4509513318400000.ingest.us.sentry.io/4509513320955904",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true
});

app.use(store)
app.use(router)
app.mount('#app')