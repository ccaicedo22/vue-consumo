import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Swal from './plugins/swal'  
import Api from './plugins/axios' 
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App) 

const pinia = createPinia()
app.config.globalProperties.$swal = Swal 
app.config.globalProperties.$http = Api  

app.use(pinia)
app.use(router)
app.mount('#app')
