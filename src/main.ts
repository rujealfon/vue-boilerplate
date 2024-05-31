import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { axios, toast } from './vendors'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
pinia.use(({ store }) => {
  store.$axios = app.config.globalProperties.$axios
})
app.use(pinia)

app.use(router)
app.use(axios, {
  baseUrl: 'https://jsonplaceholder.typicode.com'
})
app.use(toast)

app.mount('#app')
