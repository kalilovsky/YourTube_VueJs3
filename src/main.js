import "bootstrap/dist/css/bootstrap.min.css"
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import createStore from './store'

createApp(App).use(createStore).use(router).mount('#app')
