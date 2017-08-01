export default {
  install:function(Vue) {
    Vue.prototype.$fetchLoading = function(opt,fn1,fn2,doBefore,doAfter){
      if(typeof doBefore == 'function') doBefore()
      this.$http(opt).then(function(res){
        if(typeof fn1 == 'function') fn1(res)
        if(typeof doAfter == 'function') doAfter() 
      },function(res){
        if(typeof fn2 == 'function') fn2(res)
        if(typeof doAfter == 'function') doAfter()
      })
    }
  }
}