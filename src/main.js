// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import LocalStorage from './storage/index'
import router from './router'
import Axios from 'axios'

import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap'
import Toasted from 'vue-toasted'
import VueMoement from 'vue-moment'
import moment from 'moment-timezone'

import ContestCreate from '@/components/Contest/Create/ContestCreate'

Vue.config.productionTip = false
Vue.prototype.$localStorage = LocalStorage
// Vue.prototype.$backend = '192.168.0.7:8000'
Vue.prototype.$backend = '127.0.0.1:8000'
Vue.prototype.$ajax = Axios

router.beforeEach((to, from, next) => {
  const isLogin = window.JSON.parse(localStorage.getItem('ycjf')) !== undefined
  if (isLogin) {
    next()
  } else {
    if (to.path !== '/') {
      next('/')
      // next('/login')
    } else {
      next()
    }
  }
})

Vue.use(Toasted, { theme: 'bubble', position: 'bottom-right', duration: 2500 })
Vue.use(VueMoement, { moment })

Vue.component('contest-create', ContestCreate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
