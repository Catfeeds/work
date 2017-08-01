<?php

//微信api接口

class api_WxApi extends api_Base
{

    public static $token;

    public static function getToken($reflash = 0)
    {

        $wechat_id = !empty($_SESSION['wechat_id']) ? $_SESSION['wechat_id'] : "0";
        baf_Common::log('weixin_bind_log', 'INFO', 'wechat_id', $wechat_id);
        if ($wechat_id > 0) {
            $return = self::getWechatToken($wechat_id);
            if (isset($return['status'])&&$return['status'] == '0000') {
                $des = new baf_Des();
                $return['data']['access_token'] = $des->decrypt($return['data']['access_token']);
                return $return['data'];
            }
			baf_Common::log('get_wechat_token',"DEBUG",'title',$return);
        } else {
            if (getenv('PAY_HOST')) {
                $return = baf_Http::httpGet('http://weixin.qydw.net/message/response/gettoken');
                baf_Common::log('weixin_bind_log', 'INFO', 'get_token_return', $return);
                return $return;
            }
            $return = baf_Http::httpGet('http://weixin.quyundong.com/message/response/gettoken');
            baf_Common::log('weixin_bind_log', 'INFO', 'get_token_return', $return);
            return $return;
        }
    }

    //获取微信用户资料
    public static function getWechatInfo($openId)
    {
        if (empty($openId)) return false;
        $wechat_id = !empty($_SESSION['wechat_id']) ? $_SESSION['wechat_id'] : "0";

        $wechatIndoKey = 'weixin_app:fans_info' . $openId;
        $res = baf_Redis::factory()->get($wechatIndoKey);
        if($res){
            $res = unserialize($res);
        }else {
            $access_token = self::getToken();

            if (isset($access_token['access_token'])) {
                $url = 'https://api.weixin.qq.com/cgi-bin/user/info?access_token=' . $access_token['access_token'] . '&openid=' . $openId . '&lang=zh_CN';
                $info = baf_Http::httpGet($url, 'getInfo');
                if (isset($info['openid'])) {
                    if (getenv("PAY_HOST") && empty($info['unionid'])&& !$wechat_id) {
                        $info['unionid'] = $info['openid'] . "-123";
                    }
                    if ($wechat_id>0&&empty($info['unionid'])){
                        $info['unionid'] = 'union_'.$info['openid'];
                    }
                    $res = $info;
                    baf_Redis::factory()->set($wechatIndoKey, serialize($res), 3000);
                    baf_Common::log('weixin_api_log', 'INFO', 'getWechatInfo', $info);
                } else {
                    $info['requestUrl'] = $url;
                    baf_Common::log('weixin_api_log', 'INFO', 'getWechatInfo', $info);
                }
            } else {
                baf_Common::log('weixin_api_log', 'DEBUG', 'getWechatInfo_err', $access_token);
            }
        }

        return $res;
    }


    /**
     *
     * 通过跳转获取用户的openid，跳转流程如下：
     * 1、设置自己需要调回的url及其其他参数，跳转到微信服务器https://open.weixin.qq.com/connect/oauth2/authorize
     * 2、微信服务处理完成之后会跳转回用户redirect_uri地址，此时会带上一些参数，如：code
     *
     * @return 用户的openid
     */
    public static function getOpenid(array $wxConfig, $redirectUrl = '')
    {
        //通过code获得openid
        if (!isset($_GET['code'])) {
            //触发微信返回code码
            $baseUrl = urlencode($redirectUrl);
            $url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' . $wxConfig['appid'] . '&redirect_uri=' . $baseUrl . '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
            //FileLog::log2File('微信获取openid_构建APIURL并跳转至请求:url:'.$url,'weixin_api');
            Header("Location: $url");
            exit();
        } else {
            //获取code码，以获取openid
            $code = $_GET['code'];
            $url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' . $wxConfig['appid'] . '&secret=' . $wxConfig['secret'] . '&code=' . $code . '&grant_type=authorization_code';
            //初始化curl
            $ch = curl_init();
            //设置超时
            curl_setopt($ch, CURLOPT_TIMEOUT, 30);
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
            curl_setopt($ch, CURLOPT_HEADER, FALSE);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
            //运行curl，结果以json形式返回
            $res = curl_exec($ch);
            curl_close($ch);
            baf_FileLog::log2File('微信获取openid_请求完成,返回:' . $res, 'weixin_api');
            //取出openid
            $data = json_decode($res, true);
            $openid = isset($data['openid']) ? $data['openid'] : '';
            //FileLog::log2File('微信获取openid_解析得到openid:'.$openid,'weixin_api');
            return $openid;
        }
    }

    //生成授权链接（socpe默认为snsapi_userinfo）
    public static function createAuthUrl($return_url, $scope = 'snsapi_userinfo')
    {
        $apps = self::appId();
        $return_url = urlencode($return_url);
        $authUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' . $apps['appid'] . '&redirect_uri=' . $return_url . '&response_type=code&scope=' . $scope . '&state=STATE#wechat_redirect';
        return $authUrl;
    }

    //获取TokenCookie
    public static function getTokenCookie()
    {
        $token['access_token'] = !empty($_SESSION['access_token']) ? api_CoreHelper::authcode($_SESSION['access_token'], 'DECODE') : "";
        $token['openid'] = !empty($_SESSION['auth_openid']) ? api_CoreHelper::authcode($_SESSION['auth_openid'], 'DECODE') : "";
        $token['refresh_token'] = !empty($_SESSION['refresh_token']) ? api_CoreHelper::authcode($_SESSION['refresh_token'], 'DECODE') : "";
        $token['scope'] = 'snsapi_userinfo';
        return $token;
    }

    //获取Openid
    public static function getOpenIdCookie()
    {
        $openId = api_CoreHelper::getCookie('auth_openid');
        $openId = api_CoreHelper::authcode($openId, 'DECODE');
        return $openId;
    }

    //检查微信授权状态
    public static function checkAuth($code)
    {
        if(!empty($code)){
            $tokenArr = self::getWebToken($code);
            baf_Common::log('wxuc_debug', 'EMERG', 'info', array('get token by code'=>$tokenArr, 'code'=>$code));//wxuc debug            
            if ($tokenArr) {
                self::$token = $tokenArr;
            }
        }else{
            $token = self::getTokenCookie();
            self::$token = !empty($token['openid']) && !empty($token['access_token']) ? $token : false;
            //return false;
        }
        return self::$token ? self::$token : false;
    }

    /**
     * 判断是否是accessToken错误
     * @param string $errcode
     * @return boolean
     */
    public static function isIncorrectAccessToken($errcode = '')
    {
        $accessTokenErrCode = array(
            40001,    //获取access_token时AppSecret错误，或者access_token无效
            40014,    //不合法的access_token
            41001,    //缺少access_token参数
            42001    //access_token超时
        );
        return in_array($errcode, $accessTokenErrCode);
    }

//返回appid和appsecret
    public static function appId()
    {
        $wechat_id = !empty($_SESSION['wechat_id']) ? $_SESSION['wechat_id'] : '0';
        $appKey = 'weixin_app_conf_' . $wechat_id;
        $appData = baf_Redis::factory()->get($appKey);
        $des = new baf_Des();
        
        if ($appData) {
            $appData = unserialize($appData);
            return array(
                'appid' => $des->decrypt($appData['app_id']),
                'appsecret' => $des->decrypt($appData['app_secret']),
                'venues_id' => $appData['venues_id'],
                'city_id' => $appData['city_id']
            );

        } else {
            if ($wechat_id > 0) {
                $res = api_WxApi::getWechatConf($wechat_id);
                baf_Common::log('weixin_bind_log', 'INFO', 'getWechatConf', $res);
                if (isset($res['status']) && $res['status'] == '0000') {
                    $appData = $res['data'];
                    baf_Redis::factory()->set($appKey, serialize($appData), 3000);
                    return array(
                        'appid' => $des->decrypt($appData['app_id']),
                        'appsecret' => $des->decrypt($appData['app_secret']),
                        'venues_id' => $appData['venues_id'],
                        'city_id' => $appData['city_id']
                    );
                } else {
                    return array(
                        'appid' => '',
                        'appsecret' => '',
                        'venues_id' => 0,
                        'city_id' => 0
                    );
                }
            } else {
                return array(
                    'appid' => baf_Common::getOption('appid', 'wxb4f14096dcf30e9c'),
                    'appsecret' => baf_Common::getOption('appsecret', 'd4624c36b6795d1d99dcf0547af5443d')
                );
            }
        }
    }

    //获取网页token
    public static function getWebToken($code)
    {
        if (empty($code)) return false;
        $apps = self::appId();
        $url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' . $apps['appid'] . '&secret=' . $apps['appsecret'] . '&code=' . $code . '&grant_type=authorization_code';
        $webToken = baf_Http::httpGet($url);
        if (isset($webToken['access_token'])) {
            self::setTokenCookie($webToken);
            return $webToken;
        }
        
        //获取token失败
        baf_Common::log('getwebtoken_err', 'EMERG', 'info', array('http_res'=> $webToken, 'apps'=>$apps, 'code'=>$code));
        return false;
    }

    //将网页token存入cookie
    public static function setTokenCookie($webToken, $refresh = 0)
    {

        $_SESSION['access_token'] = baf_Common::authcode($webToken['access_token'], 'ENCODE');
        $_SESSION['web_token'] = baf_Common::authcode($webToken['access_token'], 'ENCODE');
        $_SESSION['auth_openid'] = baf_Common::authcode($webToken['openid'], 'ENCODE');
        $_SESSION['refresh_token'] = baf_Common::authcode($webToken['refresh_token'], 'ENCODE');
    }

    /**
     * @return bool
     */
    public static function isWeixin()
    {
        $agent = !empty($_SERVER['HTTP_USER_AGENT']) ? strtolower($_SERVER['HTTP_USER_AGENT']) : '';
        if (strpos($agent, 'micromessenger') !== false) {
            return true;
        }
        return false;
    }

    /**
     *获取微信配置信息
     */
    public static function getWechatConf($wechat_id)
    {
        if (empty($wechat_id)) {
            return '0024';
        }
        $param['wechat_id'] = $wechat_id;
        $param['client_time'] = CURRENT_TIMESTAMP;
        $param['action'] = 'getWechatInfo';
        $param['api_sign'] = self::sign($param);
        $url = self::WeixinApiUrl . 'api?' . http_build_query($param);
        $res = self::request(self::WeixinApiUrl . 'api?' . http_build_query($param), 'weixin_api');
        return $res;

    }

    /**
     *获取微信token
     */
    public static function getWechatToken($wechat_id)
    {
        if (empty($wechat_id)) {
            return '0024';
        }
        $param['wechat_id'] = $wechat_id;
        $param['client_time'] = CURRENT_TIMESTAMP;
        $param['action'] = 'getAccessToken';
        $param['api_sign'] = self::sign($param);
        $url = self::WeixinApiUrl . 'api?' . http_build_query($param);
        $res = self::request(self::WeixinApiUrl . 'api?' . http_build_query($param), 'weixin_api');
        return $res;

    }


    /**
     * 根据token获取微信用户信息
     */
    public static function getWeixinUserInfo(array $token){
        $userInfo = array();
        if(empty($token)){
            baf_Common::log('weixin_api_log', 'ERROR', 'getWeixinUserInfo input token error', array('token'=>$token));
            return $userInfo;
        }
        if(!empty($token['access_token']) && !empty($token['openid'])){
            $url = 'https://api.weixin.qq.com/sns/userinfo?access_token=' . $token['access_token'] . '&openid=' . $token['openid'] . '&lang=zh_CN';
            $res = baf_Http::httpGet($url, 'getInfo');
            if(!empty($res['errcode'])){
                baf_Common::log('weixin_api_log', 'ERROR', 'getWeixinUserInfo error', array('token'=>$token, 'res'=>$res));
            }else{
                $userInfo = $res;
            }
        }else{
            baf_Common::log('weixin_api_log', 'ERROR', 'getWeixinUserInfo input token error', array('token'=>$token));
        }
        return $userInfo;
    }
}
