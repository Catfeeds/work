var lock = false;
var _vip_pay = 15; // 手机网站会员卡支付的编号
var _weixin_pay = 5; //微信公众号支付

$(function(){
  // 选择支付方式
  $('.pay_check').on('click', function(){
      setPayType($(this));
  });
    $('.balance_pay').on('click',function(){
        if($(this).attr("checked")==true){
            checkBalance();
        }else{
            var money = $(".balance-money").attr('data-amount');
            var pay = $(".paylist-money").attr('data-amount');
            $(".balance-money").text(money+"元");
            $(".paylist-money").text(pay+"元");
            $("#J_payorder_use_wallet").attr('value',0);
        }
    });
    // 默认选中第一个支付方式
    
    // 提交
    $('#pay_sub_btn').on('click', function(){
        var _this = $(this);
        var payType = $('#pay_type').val();
        var orderId = $('#J_payOrder_id').val();
        var orderSn = $('#J_payOrder_sn').val();
        var cardNo  = $('#J_payOrder_card_no').val();
        var openid =  $('input[name=openid]').val();
        var use_wallet = $('#J_payorder_use_wallet').val();
        if (payType == 16 || payType==13) { // 银联在线|支付宝
            $('#order_pay_form').submit();
            return false;
        }
        if(payType == _weixin_pay && !openid){
          alert('微信服务忙，请选择其它支付方式');
          return false;
        }
        if (lock) {
            return false;
        }
        if (!payType) {
            alert('请选择支付方式');
            return false;
        }
        

        lock = true;
        _this.text('支付中...');

        var postData = {
                order_id: orderId,
                card_no: cardNo,
                pay_type: payType,
                openid: openid,
                utm_source: utmSource,
                use_wallet: use_wallet,
                hash: $('#J_payOrder_hash').val()
            }
            postData = typeof objMerge == 'function' ? objMerge(postData) : postData

        $.ajax({
            url: '/order/dopay',
            type: 'POST',
            data: postData,
            dataType: 'JSON',
            cache: false,
            success: function(res){
                lock = false;
                _this.text('确定');
                res = $.parseJSON(res);                
                if (res && res.code == 1) {
                    if (payType == _vip_pay) { // 会员卡支付
                        // 直接跳转到成功页面
                      var url = "/order/payOk?id=" + orderId;
              if(utmSource) url += '&utm_source='+utmSource;
                        window.location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url;;
                    } else if (payType == _weixin_pay){
                      _wxPayParam = res.data;
                      callpay();//调起微信支付
                    } else {
                        if (res.data.redirect_url) {
                            window.location.href = res.data.redirect_url;
                        } else {
                            showToast('支付方式有误');
                        }
                    }
                } else if (res && res.code == 1302) { // 余额全额支付成功
                    // 直接跳转到成功页面
                  var url = "/order/payOk?id=" + orderId;
                  if(utmSource) url += '&utm_source='+utmSource;

                    window.location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url;;
                } else {
                    showToast(res.msg,function(){
                        if(res.msg=="订单已支付"){
                            var url = '/'
                            window.location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url;
                        }
                    });
                }
            },
            error: function(xhr, type){
                lock = false;
                _this.text('确定');
                showToast('网络出错，请稍后再试');
            }
        });
    });

});

/**
 * 设置支付方式
 *
 * @param object obj 触发点击事件的li对象(zepto对象)
 * @author xiaosibo
 */
function setPayType(obj)
{
    var payType = obj.attr('data_type');
    
    if (payType == _vip_pay) { // 会员卡支付
        $('.has_card_hidden').hide();
        $('.has_card_show').show();
    } else { // 其他支付方式
        $('.has_card_hidden').show();
        $('.has_card_show').hide();
    }

    // 选择当前点击的支付方式, 去掉其他支付方式
   // obj.siblings().find('.check').removeClass('checked');
    //obj.find('.check').addClass('checked');
   // obj.siblings().find('.check').attr('checked',false);
    obj.attr('checked',true);

    // 设置支付方式
    $('#pay_type').val(payType);
}

function checkBalance(){
    var money = $(".balance-money").attr('data-amount');
    var pay = $(".paylist-money").attr('data-amount');
    if(money>=pay){
        $(".paylist-money").text("0元");
        $(".balance-money").text((money-pay)+"元");
    }
    if(money<pay){
        $(".paylist-money").text((pay-money)+"元");
        $(".balance-money").text("0元");
    }
    $("#J_payorder_use_wallet").attr('value',1);
}

