import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

import { toast, vueQuery } from './vendors'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()

pinia.use(
  createPersistedState({
    key: (id) => `__persisted__${id}`
  })
)

// const pinia = createPinia()
// pinia.use(({ store }) => {
//   store.$axios = app.config.globalProperties.$axios
// })
app.use(pinia)
app.use(vueQuery)
app.use(router)
// app.use(axios, {
//   baseURL: import.meta.env.VITE_API_URL
// })
// app.use(loading)
app.use(toast)

app.mount('#app')
