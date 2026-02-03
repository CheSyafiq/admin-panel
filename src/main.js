import './assets/css/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueApexCharts from 'vue3-apexcharts'
import { initDarkMode } from './composables/useDarkMode'
import { initLanguage } from './composables/useLanguage'

// Initialize dark mode and language before mounting
initDarkMode()
initLanguage()

const app = createApp(App)

app.use(router)
app.component('apexchart', VueApexCharts)

app.mount('#app')

