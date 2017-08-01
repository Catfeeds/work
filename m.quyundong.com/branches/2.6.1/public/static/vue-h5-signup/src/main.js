import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import fetchLoading from './lib/fetchLoading.js'
import { domain, fromNow , fromMoney , formatDate } from './filters'
import App from './components/App.vue'
import SignupIndex from './components/SignupIndex.vue'
import Signup from './components/Signup.vue'
import { commonTool } from './lib/commonTool.js'


Vue.config.debug = true
// install router
Vue.use(Router)

Vue.use(Resource)

Vue.use(commonTool)

Vue.use(fetchLoading)

// register filters globally
Vue.filter('fromNow', fromNow)
Vue.filter('domain', domain)
Vue.filter('fromMoney', fromMoney)
Vue.filter('formatDate', formatDate)

// routing
var router = new Router()

router.map({
  '/SignupIndex/': {
    name:'SignupIndex',
    component: SignupIndex
  },
  '/Signup/': {
    name:'Signup',
    component: Signup
  }
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/SignupIndex/'
})

router.start(App, '#app')

