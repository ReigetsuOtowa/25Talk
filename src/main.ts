import './assets/css/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VMdPreview from '@/markdown/markdown'
import VueLazyLoad from 'vue3-lazyload'

const app = createApp(App)

app.use(VueLazyLoad, {})
app.use(router)
app.use(VMdPreview)
app.mount('#app')

