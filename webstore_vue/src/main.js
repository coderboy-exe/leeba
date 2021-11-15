import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/styles/index.css';
import Unicon from 'vue-unicons'
import { uniLayerGroupMonochrome, uniCarWash, uniShoppingCart, uniSignin, uniSearch } from 'vue-unicons/dist/icons'


axios.defaults.baseURL = 'http://127.0.0.1:8000'

Unicon.add([uniLayerGroupMonochrome, uniShoppingCart, uniCarWash, uniSignin, uniSearch])


createApp(App).use(store).use(router, axios).use(Unicon).mount('#app')
