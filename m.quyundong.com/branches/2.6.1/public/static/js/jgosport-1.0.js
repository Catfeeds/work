
var Gs = {
    canUse:false,
    init: function() {
        this.canUse = true
        if (window.GsJSBridge) {
            window.GsJSBridge.callback = this.callback
            this.showRightButton('false')
            this.readyAction.forEach(function(item){
                if(typeof item == 'function'){
                    item()
                }
            })
            window.GsJSBridge.init && window.GsJSBridge.init(this.config)
        }
    },
    _init:function(){
        if(window.GsJSBridge){
            window.GsJSBridge.init && window.GsJSBridge.init(this.config)
        }
    },
    reset:function(data){
        if(window.GsJSBridge){
            this.setConfig(data)
            this._init()
        }
    },
    ready:function(fn){
        if(typeof fn == 'function'){
            this.readyAction.push(fn)
        }
    },
    readyAction:[],
    setConfig: function(data) {
        this.config = JSON.stringify(data)
        for (var x in data) {
            this._callback[x] = data[x]
        }
    },
    config: JSON.stringify({}),
    version: '1.0.48',
    islogin:function(){
        if(window.GsJSBridge)
            window.GsJSBridge.loginInformation && window.GsJSBridge.loginInformation()
    },
    logout:function(fn){
        this.setCallback({'_isGsLogoutSuccess':fn})
        if(window.GsJSBridge)
            window.GsJSBridge && window.GsJSBridge.logout()
    },
    closeWebview:function(){
        if(window.GsJSBridge)
            window.GsJSBridge.close && window.GsJSBridge.close()
    },
    setCallback:function(data){
        for (var x in data) {
            this._callback[x] = data[x]
        }
    },
    _callback:{},
    gone:function(str){
        if(window.GsJSBridge)
            window.GsJSBridge.gone && window.GsJSBridge.gone(str)
    },
    showRightButton:function(a){
        // a = 'true' or 'false'
        if(window.GsJSBridge)
            window.GsJSBridge.showRightButton && window.GsJSBridge.showRightButton(a)
    },
    showMenuShare: function(a) {
        /*
         * 
         * 方法：window.GsJSBridge.showMenuShare(['onMenuShareWxTimeline',...])
         * 说明：弹出APP的分享按钮层
         * 举列：（用法）
         * window.GsJSBridge.showMenuShare(Array)
         * Array数组，传入分享渠道的key名
         * 
         */
        if(window.GsJSBridge)
            window.GsJSBridge && window.GsJSBridge.showMenuShare(a)
    },
    callback: function(res) {

        /*
         * res typeof JSON_String
         * 
         * res = {
         *     'action':0, // 行为代号 
         *     'status':0  // 状态  一般 0:成功 1:失败 2:取消 每种行为可能有的状态不一样
         * }
         *
         * 行为代号
         *
         * 0:分享到微信朋友圈 =>  status 0:成功 1:失败 2:取消 onMenuShareWxTimeline
         * 1:分享到微信好友 =>  status 0:成功 1:失败 2:取消 onMenuShareWxAppMessage
         * 2:分享到QQ好友 => status 0:成功 1:失败 2:取消 onMenuShareQQ
         * 3:分享到新浪微博 => status 0:成功 1:失败 2:取消 onMenuShareSinaWeibo
         * 'LOGIN_INFORMATION': 返回登录信息的代号 => status -> 0:已经登录 1:未登录 其他:失败 
         *                                         msg    -> 相关msg如'已登录 未登录 ...'
         *                                         data   -> 登录数据
         *                                         
         */

        try {
            var data = JSON.parse(res)
            var action = data.action
            var status = data.status

            // alert('action:'+action+' status:'+status)

        } catch (e) {
            alert(e)
            return
        }

        if (action == 0) {
            if (status == 0) {
                Gs._callback['onMenuShareWxTimeline'] && Gs._callback['onMenuShareWxTimeline'].success(data)
            } else if (status == 1 || status == 2) {
                Gs._callback['onMenuShareWxTimeline'] && Gs._callback['onMenuShareWxTimeline'].fail(data)
            }
        }

        if (action == 1) {
            if (status == 0) {
                Gs._callback['onMenuShareWxAppMessage'] && Gs._callback['onMenuShareWxAppMessage'].success(data)
            } else if (status == 1 || status == 2) {
                Gs._callback['onMenuShareWxAppMessage'] && Gs._callback['onMenuShareWxAppMessage'].fail(data)
            }
        }

        if (action == 2) {
            if (status == 0) {
                Gs._callback['onMenuShareQQ'] && Gs._callback['onMenuShareQQ'].success(data)
            } else if (status == 1 || status == 2) {
                Gs._callback['onMenuShareQQ'] && Gs._callback['onMenuShareQQ'].fail(data)
            }
        }

        if (action == 3) {
            if (status == 0) {
                Gs._callback['onMenuShareSinaWeibo'] && Gs._callback['onMenuShareSinaWeibo'].success(data)
            } else if (status == 1 || status == 2) {
                Gs._callback['onMenuShareSinaWeibo'] && Gs._callback['onMenuShareSinaWeibo'].fail(data)
            }
        }

        if (action == 'LOGIN_INFORMATION'){
            if(status == 0 ){
                Gs._callback['gsLogin'] && Gs._callback['gsLogin'].success && Gs._callback['gsLogin'].success(data)
            }else if(status == 1 ){
                Gs._callback['gsLogin'] && Gs._callback['gsLogin'].fail && Gs._callback['gsLogin'].fail(data)
            }else{
                Gs._callback['gsLogin'] && Gs._callback['gsLogin'].other && Gs._callback['gsLogin'].other(data)
            }
            
        }

        if (action == 'IS_LOGIN_SUCCESS'){
            if(status == 0){
                Gs._callback['isGsLoginSuccess'] && Gs._callback['isGsLoginSuccess'].success && Gs._callback['isGsLoginSuccess'].success(data)
            }else if(status == 1){
                Gs._callback['isGsLoginSuccess'] && Gs._callback['isGsLoginSuccess'].fail && Gs._callback['isGsLoginSuccess'].fail(data)
            }else{
                Gs._callback['isGsLoginSuccess'] && Gs._callback['isGsLoginSuccess'].other && Gs._callback['isGsLoginSuccess'].other(data)
            }
        }

        if (action == 'IS_LOGOUT_SUCCESS'){
            if(status == 0){
                Gs._callback['isGsLogoutSuccess'] && Gs._callback['isGsLogoutSuccess'].success && Gs._callback['isGsLogoutSuccess'].success(data)
            }else if(status == 1){
                Gs._callback['isGsLogoutSuccess'] && Gs._callback['isGsLogoutSuccess'].fail && Gs._callback['isGsLogoutSuccess'].fail(data)
            }else{
                Gs._callback['isGsLogoutSuccess'] && Gs._callback['isGsLogoutSuccess'].other && Gs._callback['isGsLogoutSuccess'].other(data)
            }
        }

    }
}