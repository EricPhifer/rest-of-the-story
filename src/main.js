import { createApp } from 'vue'
import './styles/app.pcss'
import App from './App.vue'
import { router } from './router'
import { store } from './store'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')