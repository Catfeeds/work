function reg(){
    mqq.build('mqq.tenpay.getAppAuthorizationCode', {
    iOS: function(params, callback) {
        var callbackName = callback ? mqq.callback(callback) : null;
        mqq.invokeClient('qw_charge', 'getAppAuthorizationCode',
        params, callback);
        },
        android: function(params, callback) {
        params.callback = mqq.callback(callback);
        mqq.invokeClient('qw_charge', 'getAppAuthorizationCode', params);
        },
        supportInvoke: true,
        support: {
        iOS: '6.5.0',
        android: '6.5.0'
        }
    });
}


// reg();
// mqq.tenpay.getAppAuthorizationCode({appid: '100556060'}, function(result){
//     alert(result.code);
// });


var resCode = {
                    '0':'支付成功',
                    '-1':'用户取消',
                    '-2':'登录态超时',
                    '-3':'重复订单',
                    '-4':'快速注册用户手机号不一致',
                    '-5':'帐户冻结',
                    '-6':'输入密码错误资料超上限',
                    '1':'用户取消',
                    '3':'参数错误',
                    '4':'网络错误',
                    '5':'微信支付结果',
                    '6':'支付需要外跳其它场景',
                    '-11001':'用户取消'
                }


function walletPay(params, callback){
    if(!mqq){
        callback('请使用QQ钱包中使用此服务');
        return;
    }
    if(payEnable()){
        mqq.tenpay.pay({
            tokenId: params.tokenId,
            pubAcc: "",
            pubAccHint: "",
            appInfo: "appid#"+params.appid+"|bargainor_id#"+params.bargainor_id+"|channel#wallet"
            }, function(result, resultCode){
                var msg = resCode[result.resultCode] ? resCode[result.resultCode] : '支付失败'+result.resultCode;
                if(result.resultCode==0){
                    callback('支付成功');
                    var url = '/order/payOk?id='+orderId;
                    // window.location.href='/order/payOk?id='+orderId;
                    window.location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url;
                }else{
                    callback(result.code);
                    callback(result.resultCode);
                    callback(msg);
                }
            });    
    }else{
        callback('您的QQ版本不支付钱包支付')
    }    
}

function payEnable(){
    var commpareToVer = 4.62;
    var ver = mqq.QQVersion;
    var v,currentVer;
    if(ver){
        v = ver.split('.');
        currentVer = v[0]+'.'+v[1]+v[2];
    }else{
        return false;
    }
    return currentVer>=commpareToVer;
}

window.onerror = function(error,url,line){
    alert('err:'+error+"\nurl:"+url+"\nline:"+line);
}