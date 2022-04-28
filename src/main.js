import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './services/store'
import "./plugins/chart.js"
import '@/assets/style/global.scss'

// Element UI
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ElementPlus)

app.mount('#app')
