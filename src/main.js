import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Api from './plugins/axios' 
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App) 

const pinia = createPinia()
app.use(VueSweetalert2);
app.config.globalProperties.$http = Api  
app.component('EasyDataTable', Vue3EasyDataTable);
app.use(pinia)
app.use(router)
app.mount('#app')
