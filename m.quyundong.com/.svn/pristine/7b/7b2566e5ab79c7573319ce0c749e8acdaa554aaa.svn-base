$(document).ready(function () {
  var mobileQQMenu = document.createElement('div')
  mobileQQMenu.id = 'mobileQQMenu'
  mobileQQMenu.className = 'mobile-qq-menu hide'
  var accountUrl = "/user/account"
  var myorderUrl = "/myorder"
  var balanceUrl = "/user/balance"
  var CouponUrl = "/Coupon/Index"
  if(typeof urlAddParams == 'function'){
    accountUrl = urlAddParams(accountUrl)
    myorderUrl = urlAddParams(myorderUrl)
    balanceUrl = urlAddParams(balanceUrl)
    CouponUrl = urlAddParams(CouponUrl)
  }
  mobileQQMenu.innerHTML = '<ul><li><a href='+accountUrl+'><i class="icon-zh"><img src="/themes/qq/images/icon-zh.png"></i>账户管理</a></li><li><a href='+myorderUrl+'><i class="icon-dd"><img src="/themes/qq/images/icon-dd.png"></i>我的订单</a></li><li><a href='+balanceUrl+'><i class="icon-ye"><img src="/themes/qq/images/icon-ye.png"></i>我的余额</a></li><li><a href='+CouponUrl+'><i class="icon-kq"><img src="/themes/qq/images/icon-kq.png"></i>我的卡券</a></li><li><a href="tel:4000410480"><i class="icon-kf"><img src="/themes/qq/images/icon-kf.png"></i>联系客服</a></li></ul>'
  document.body.appendChild(mobileQQMenu)
  $(mobileQQMenu).click(function (e) {
    if(e.target === this){
      $(this).addClass('hide')
    }
  })

  var album ={
    show:false
  }

  try{
    if($('.nm-photo-album')[0]){
      $('.nm-photo-album')[0].hideCallback = function(){
        console.log('hideCallback')
        album.show = false
      }
      $('.nm-photo-album')[0].appendChild = function(dom){
        console.log('appendChild')
        album.show = true
        document.body.appendChild.call(this,dom)
      }
    }
  }catch(e){
    alert(e)
  }
  
  
  
  if(typeof mqq != 'undefined'){
    mqq.ui.setTitleButtons({
      'left':{
        'callback':function () {
          if(album.show){
            $('.nm-photo-album .close').trigger('click')
          }else if(window.nm_go_balance){
            var url = '/user/balance'
            // window.location.href = '/user/balance'
            window.location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url;
          }else if(window.nm_go_coupon){
            var url = '/coupon/index'
            window.location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url;
          }else if(window.nm_go_index){
            var url = '/'
            window.location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url;
          }else{
            window.history.back()
          }
         
        }
      },
      'right':{
        'title':'首页',
        'callback':function () {
          var url = '/'
          window.location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url;
        }
      }
    })
  }
  
})
