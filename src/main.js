import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSweetalert2 from 'vue-sweetalert2'
import axios from 'axios'
import { url } from './helper/env'

Vue.config.productionTip = false

axios.defaults.headers = {
  token: localStorage.getItem('token')
}

// handle token expired
axios.interceptors.response.use((response) => {
  // console.log(response)
  if (response.data.message === 'tokenExpired') {
    return new Promise((resolve, reject) => {
      axios.post(`${url}/employe/refreshtoken`, {
        refreshtoken: localStorage.getItem('refreshtoken')
      })
        .then(res => {
          console.log(res)
          resolve(res)
          localStorage.setItem('token', res.data.data.token)
          window.location = '/'
        })
        .catch(err => console.log(err.message))
    })
  } else {
    return response
  }
})

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueSweetalert2)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
