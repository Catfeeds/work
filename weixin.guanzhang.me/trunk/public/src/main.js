import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import fetchLoading from './lib/fetchLoading.js'
import { domain, fromNow , fromMoney , formatDate } from './filters'
import App from './components/App.vue'
import LightReportView from './components/LightReportView.vue'
import ReportIndex from './components/ReportIndex.vue'
import SaleitemView from './components/SaleitemView.vue'
import CourtView from './components/CourtView.vue'
import StoreCardView from './components/StoreCardView.vue'
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
  '/LightReport/:time': {
    name:'LightReport',
    component: LightReportView
  },
  '/ReportIndex/:time': {
    name:'ReportIndex',
    component: ReportIndex
  },
  '/CourtView/:time': {
    name:'CourtView',
    component: CourtView
  },
  '/SaleitemView/:time': {
    name:'SaleitemView',
    component: SaleitemView
  },
  '/StoreCardView/:time': {
    name:'StoreCardView',
    component: StoreCardView
  }
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/ReportIndex/'+ document.body.dataset.defaultDate
})

router.start(App, '#app')

