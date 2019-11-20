import Vue from 'vue'
import axios from './plugins/axios'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import './assets/tailwind.css'
import store from './store'
Vue.prototype.$http = axios;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
