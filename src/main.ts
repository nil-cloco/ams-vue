import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import setupInterceptors from './utils/setupHttpInterceptor'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import ConfirmationService from 'primevue/confirmationservice'
import Tooltip from 'primevue/tooltip'

import router from './router'
import { ToastService } from 'primevue'

const app = createApp(App)

// setup stores and interceptors
app.use(createPinia())
setupInterceptors()

// setup UI themes and services using PrimeVue
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.use(ConfirmationService)
app.use(ToastService)
app.directive('tooltip', Tooltip)

app.use(router)

app.mount('#app')
