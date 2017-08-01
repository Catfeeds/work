import { formatDate } from '../filters/index.js'
import { formatStringDate } from '../filters/index.js'
import { pxToRem } from './pxToRem'

const commonTool = {
  install: function(Vue) {
    Vue.prototype.$commonTool = {
      formatDate:formatDate,
      formatStringDate:formatStringDate,
      pxToRem:pxToRem,
      vueHost:vueHost(),
      host:host()
    } 
  }
}

const host = () => window.location.protocol + '//' + window.location.host
const vueHost = () => window.location.href.split('#')[0] + '#!/'



export { commonTool };