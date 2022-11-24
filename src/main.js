import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import './directives'
// import './icons'
console.log(import.meta.env)
// import { axios } from './utils/request'
import './styles/index.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
