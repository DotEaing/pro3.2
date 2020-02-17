import 'babel-polyfill'
import fastclick from 'fastclick'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./common/stylus/index.styl"
import 'vant/lib/index.css';
import axios from "axios"
import Vant, { Lazyload } from 'vant';

Vue.use(Vant)
Vue.use(Lazyload);

Vue.config.productionTip = false
axios.defaults.baseURL = "http://127.0.0.1:3000/"
axios.defaults.withCredentials = true


fastclick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
