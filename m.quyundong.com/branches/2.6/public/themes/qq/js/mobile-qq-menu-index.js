$(document).ready(function () {
  var mobileQQMenu = document.createElement('div')
  mobileQQMenu.id = 'mobileQQMenu'
  mobileQQMenu.className = 'mobile-qq-menu hide'
  var cookie = getCookie('wx_uid')

  var accountUrl = "/user/account"
  var myorderUrl = "/myorder"
  var balanceUrl = "/user/balance"
  var CouponUrl = "/Coupon/Index"

  var accountUrlc = "/user/account"
  var myorderUrlc = "/appwebview/pageView?id=myorder"
  var balanceUrlc = "/appwebview/pageView?id=balance"
  var CouponUrlc = "/appwebview/pageView?id=coupon"

  if(typeof urlAddParams == 'function'){
    accountUrl = urlAddParams(accountUrl)
    myorderUrl = urlAddParams(myorderUrl)
    balanceUrl = urlAddParams(balanceUrl)
    CouponUrl = urlAddParams(CouponUrl)

    accountUrlc = urlAddParams(accountUrlc)
    myorderUrlc = urlAddParams(myorderUrlc)
    balanceUrlc = urlAddParams(balanceUrlc)
    CouponUrlc = urlAddParams(CouponUrlc)
  }

  if(!cookie){
    mobileQQMenu.innerHTML = '<ul><li><a href="'+accountUrlc+'"><i class="icon-zh"><img src="/themes/qq/images/icon-zh.png"></i>账户管理</a></li><li><a href="'+myorderUrlc+'"><i class="icon-dd"><img src="/themes/qq/images/icon-dd.png"></i>我的订单</a></li><li><a href="'+balanceUrlc+'"><i class="icon-ye"><img src="/themes/qq/images/icon-ye.png"></i>我的余额</a></li><li><a href="'+CouponUrlc+'"><i class="icon-kq"><img src="/themes/qq/images/icon-kq.png"></i>我的卡券</a></li><li><a href="tel:4000410480"><i class="icon-kf"><img src="/themes/qq/images/icon-kf.png"></i>联系客服</a></li></ul>'
  }else{
    mobileQQMenu.innerHTML = '<ul><li><a href="'+accountUrl+'"><i class="icon-zh"><img src="/themes/qq/images/icon-zh.png"></i>账户管理</a></li><li><a href="'+myorderUrl+'"><i class="icon-dd"><img src="/themes/qq/images/icon-dd.png"></i>我的订单</a></li><li><a href="'+balanceUrl+'"><i class="icon-ye"><img src="/themes/qq/images/icon-ye.png"></i>我的余额</a></li><li><a href="'+CouponUrl+'"><i class="icon-kq"><img src="/themes/qq/images/icon-kq.png"></i>我的卡券</a></li><li><a href="tel:4000410480"><i class="icon-kf"><img src="/themes/qq/images/icon-kf.png"></i>联系客服</a></li></ul>'
  }
  document.body.appendChild(mobileQQMenu)
  function getCookie(c_name)
  {
    if (document.cookie.length>0)
    {
      c_start=document.cookie.indexOf(c_name + "=")
      if (c_start!=-1)
      {
        c_start=c_start + c_name.length+1
        c_end=document.cookie.indexOf(";",c_start)
        if (c_end==-1) c_end=document.cookie.length
        return unescape(document.cookie.substring(c_start,c_end))
      }
    }
    return ""
  }
  
  $(mobileQQMenu).click(function (e) {
    if(e.target === this){
      $(this).addClass('hide')
    }
  })
  mqq.ui.setTitleButtons({
    'left':{
      'callback':function () {
        mqq.ui.popBack()
      }
    },
    'right':{
      'iconID':'3',
      'callback':function () {
        $(mobileQQMenu).removeClass('hide')
      }
    }
  })
})
