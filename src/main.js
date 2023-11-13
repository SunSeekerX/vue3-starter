import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'virtual:svg-icons-register'

import '@/styles/css/base.css'
import App from './App.vue'
import router from './router'
import { i18n } from '@/locales'
import SvgIcon from '@/components/svg-icon/svg-icon.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.component('SvgIcon', SvgIcon)

app.mount('#app')
