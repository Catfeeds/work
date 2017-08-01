<?php
/**
 * 用户登录、注册
 * @author Administrator
 *
 */
class LoginController extends DefaultController
{
    public static $src;

    protected function init()
    {
        parent::init();
        $exceptAction = array(
                'authlogin' 
            );
        $req = $this->getRequest();
        if(in_array($req->action, $exceptAction)){
            return true;
        }
        $returnUrl = $this->getReturnUrl();
        if ($this->uid > 0) {
            if ($this->isAjax == 1) {
                $this->readJson(baf_ResCode::msg(baf_ResCode::LOGINED));
            }
            if ($returnUrl) {
                $this->redirect(urldecode($returnUrl));
                exit;
            } else {
                //wxuc用于场馆会员卡 wx为普通用户登录　优先取from
                $loginType = $this->getParam('from','');
                if(!$loginType) $loginType = $this->getParam('login','');
                $returnUrl = $loginType == 'wxuc' ? '/userCard' : '/user';
                $this->redirect($returnUrl);
                exit;
            }
        }

        $src = $this->getSrc();
        if ($src) {
            self::$src = $src;
        } else {
            if ($returnUrl) {
                self::$src = $returnUrl;
            } else {
                //当是辽宁全民运动时，直接在快捷登陆入口登陆的，登陆后，就跳转到“我的”页面 add by wuchunhua 2016-11-8
                if (in_array(CHANNEL_SOURCE,Config::$hideItem)) {
                    self::$src = '/User/index';
                }else{
                    self::$src = $this->getRequest()->getBaseUri() . '/';
                }
            }
        }
    }


    /**
     * 登录页
     */
    public function indexAction()
    {
        if ($this->getSrc()) $this->setReturnUrl($this->getSrc());
        if(in_array(CHANNEL_SOURCE, ExtendConfig::$quickLoginOnly)){
            $this->redirect('/login/qucklogin');
            exit;
        }
        //调用获取页面标题、关键字和介绍
        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
        $this->setPageTitle(array('utm_source'=>$utm_sources));

        $this->_view->assign(array(
            'IsWenXinBrowser' => api_CoreHelper::IsWenXinBrowser() ? 1 : 0,
            'loginCheck' => $this->uid > 0 ? 1 : 0,
        ));
    }


    /**
     * 注册
     */
    public function registerAction()
    {
        //调用获取页面标题、关键字和介绍
        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
        $this->setPageTitle(array('utm_source'=>$utm_sources));
        if ($this->getSrc()) $this->setReturnUrl($this->getSrc());
    }


    /**
     * 快捷登录
     */
    public function quckloginAction()
    {
        //调用获取页面标题、关键字和介绍
        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
        $this->setPageTitle(array('utm_source'=>$utm_sources));
        if ($this->getSrc()) $this->setReturnUrl($this->getSrc());
        if(baf_Common::isChannel('decathlon')){
            Yaf_Dispatcher::getInstance()->autoRender(FALSE);
            $this->getView()->display('decathlon/login/qucklogin.php');
        }
    }


    public function dologinAction()
    {
        $username = $this->getParam('username');
        $password = $this->getParam('password');

        //
        if (preg_match('/1[2345678]{1}\d{9}$/', $username) == 0) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::PHONE_ERROR));
        }
        if (strlen($password) < 6) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::PASSWORD_LENGH_ERROR));
        }
        $des = new baf_Des();
        $password = $des->encrypt($password);
        $loginRes = api_User::login(array('phone' => $username, 'password' => $password, 'ver'=>'1.6'));

        //登录成功
        if (is_array($loginRes) && isset($loginRes['status'])) {
            if ($loginRes['status'] == '0201') {
                $this->readJson(baf_ResCode::msg(baf_ResCode::USERNAME_NOT_FOUND));
            }

            //仅支持手机短信登陆的错误提示 edit by wuchunhua 2016-07-11
            if ($loginRes['status'] == '0223') {
                $this->readJson($loginRes);
            }

            if ($loginRes['status'] == SUCCESS_STATUS) {
                $user = array(
                    'user_id' => $loginRes['user_id'],
                    'phone' => $loginRes['phone'],
                    'nick_name' => $loginRes['nick_name'],
                    'avatar' => $loginRes['avatar'],

                );
                api_WxUser::setLoginCookie($user, LOGIN_TIME_LIMIT);
                $this->readJson(baf_ResCode::msg('', array('url' => self::$src)));
            } else {
                //出错提示信息
                if (isset($loginRes['msg'])) {
                    $this->readJson(baf_ResCode::msg(baf_ResCode::USERNAME_NOT_FOUND, $loginRes['msg']));
                } else {
                    $this->readJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
                }
            }
        } else {
            $this->readJson(baf_ResCode::msg(baf_ResCode::USER_PASSWORD_ERROR));
        }
    }


    /**
     * 获取快捷登录验证码
     */
    public function getSmsCodeLoginAction()
    {
        $username = $this->getParam('phone');
        $this->checkHash(true);
        //验证码
        if (preg_match('/1[2345678]{1}\d{9}$/', $username) == 0) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::PHONE_ERROR));
        }

        //一分钟内只能获取一次验证码
        /*
         $codeLimitKey = 'sms_code_limit_' . $username;
        $limitRes =$this->cache()->get ( $codeLimitKey );
        if ($limitRes == 1) {
        $this->readJson(baf_ResCode::msg(baf_ResCode::GET_SMS_CODE_LIMIT));
        }
        */

        //begin 一天只能获取固定次数的验证码
        $limitKey = 'sms_code_login_limit_' . $username;
        $dayRes = $this->cache()->get($limitKey);
        if ($dayRes >= 30) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::GET_SMS_CODE_DAYLIMIT));
        }
        //end;

        if ($this->smscodeGetLimit($username . '_1_smscode')) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::SMSCODE_TIME_LIMIT));
        }

        $loginRes = api_Sms::sendSmsCode(array('phone' => $username, 'type' => '1'));
        if (is_array($loginRes) && isset($loginRes['status']) && $loginRes['status'] == SUCCESS_STATUS) {
            $this->cache()->set($limitKey, $dayRes + 1, 6 * 60 * 60); // 6小时
            $this->smscodeGetLimit($username . '_1_smscode', 1);
            $this->readJson(baf_ResCode::msg());
        } else {
            baf_Common::log('getSmsCodeLogin_err', 'EMERG', 'error', $loginRes);
            $this->readJson(baf_ResCode::msg(baf_ResCode::GET_SMS_CODE_ERROR));
        }
    }


    /**
     * 快捷登录
     */
    public function doquckloginAction()
    {
        $username = $this->getParam('username');
        $code = $this->getParam('code');

        if (preg_match('/1[2345678]{1}\d{9}$/', $username) == 0) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::PHONE_ERROR));
        }
        //begin---检查手机验证码
        /*
        $smsCode = $this->cache()->get ($this->smsKey.$username );
        if($code != $smsCode){
            $this->readJson(baf_ResCode::msg(baf_ResCode::SMS_CODE_NOT_MATCH));
        }*/

        //记录推广信息
        $said = api_CoreHelper::getCookie('said');
        if ($said > 0) {
            $param['supplier_admin_id'] = $said;
            $param['category_id'] = api_CoreHelper::getCookie('category_id');
            $param['business_id'] = api_CoreHelper::getCookie('business_id');
            $param['phone'] = $username;
            $log_res = api_Court::addSpreadLog($param);
            //清空Cookie
            api_CoreHelper::setCookie('said', '', 0);
            api_CoreHelper::setCookie('category_id', '', 0);
            api_CoreHelper::setCookie('business_id', '', 0);
        }

        $apiParam = array('phone' => $username, 'sms_code' => $code, 'utm_medium' => UTM_SOURCE ? UTM_SOURCE : 'wap');
        $apiParam['utm_source'] = $this->getUtmSource(); //记录用户来源渠道
        if(baf_Common::isChannel('decathlon')){            
            $loginRes = ext_Decathlon::quickLogin($apiParam);            
        }else if(api_CoreHelper::getCookie('utm_source') == 'gagc'){
            $loginRes = ext_Gagc::quickLogin($apiParam);            
        }else{
            $loginRes = api_User::phoneQuckLogin($apiParam);
        }
        
        //登录成功
        if (is_array($loginRes) && isset($loginRes['status'])) {
            if ($loginRes['status'] == '0201') {
                $this->readJson(baf_ResCode::msg(baf_ResCode::USERNAME_NOT_FOUND));
            }
            if ($loginRes['status'] == '0222') {
                $this->readJson(baf_ResCode::msg(baf_ResCode::SMSCODE_ERR));
            }

            if ($loginRes['status'] == SUCCESS_STATUS) {
                $user = array(
                    'user_id' => $loginRes['user_id'],
                    'phone' => $loginRes['phone'],
                    'nick_name' => $loginRes['nick_name'],
                    'avatar' => $loginRes['avatar'],
                );
                api_WxUser::setLoginCookie($user, LOGIN_TIME_LIMIT);
                $returnUrl = $this->getReturnUrl();
                if ($returnUrl) {
                    $url = $returnUrl;
                } else {
                    $url = self::$src;
                }
                $this->readJson(baf_ResCode::msg('', array('url' => $url)));

            } else {
                //出错提示信息
                if (isset($loginRes['msg'])) {
                    $this->readJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, $loginRes['msg']));
                } else {
                    $this->readJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
                }
            }
        } else {
            $this->readJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
        }
    }


    /**
     * 注册
     */
    public function doregisterAction()
    {
        $username = $this->getParam('username');
        $password = $this->getParam('password');
        $password2 = $this->getParam('password2');
        $code = $this->getParam('code');

        if (preg_match('/1[2345678]{1}\d{9}$/', $username) == 0) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::PHONE_ERROR));
        }
        if ($password != $password2) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::PASSWORD_NOT_MATCH));
        }
        if (strlen($password) != 6) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::PASSWORD_LENGH_ERROR));
        }

        //begin---检查手机验证码
//        $smsCode = $this->cache()->get($this->smsKey . $username);
//        if ($code != $smsCode) {
//            $this->readJson(baf_ResCode::msg(baf_ResCode::SMS_CODE_NOT_MATCH));
//        }
        //end---

        //记录推广信息
        $said = api_CoreHelper::getCookie('said');
        if ($said > 0) {
            $param['supplier_admin_id'] = $said;
            $param['category_id'] = api_CoreHelper::getCookie('category_id');
            $param['business_id'] = api_CoreHelper::getCookie('business_id');
            $param['phone'] = $username;
            $log_res = api_Court::addSpreadLog($param);
            //清空Cookie
            api_CoreHelper::setCookie('said', '', 0);
            api_CoreHelper::setCookie('category_id', '', 0);
            api_CoreHelper::setCookie('business_id', '', 0);
        }
        $des = new baf_Des();
        $apiParam = array('phone' => $username, 'password' => $des->encrypt($password),'sms_code'=>$code,'ver'=>'1.6');
        $apiParam['utm_source'] = $this->getUtmSource(); //记录用户来源渠道
        $loginRes = api_User::register($apiParam);

        //登录成功
        if (isset($loginRes['status'])) {
            if ($loginRes['status'] == SUCCESS_STATUS) {
                $uesr = api_User::getUserInfo(array('user_id' => $loginRes['user_id']));
                if ($uesr['status'] == SUCCESS_STATUS) {
                    $user = array(
                        'user_id' => $loginRes['user_id'],
                        'phone' => $uesr['phone'],
                        'nick_name' => $uesr['nick_name'],
                        'avatar' => $uesr['avatar'],
                    );
                    api_WxUser::setLoginCookie($user, LOGIN_TIME_LIMIT);
                    $returnUrl = $this->getReturnUrl();
                    if ($returnUrl) {
                        $url = $returnUrl;
                    } else {
                        $url = self::$src;
                    }
                } else {
                    //注册成功，拿个人信息出错
                    $url = '/login';
                }
                $this->readJson(baf_ResCode::msg('', array('url' => $url)));
            } else {
                if($loginRes['status'] == '0222'){
                    $this->readJson(baf_ResCode::msg(baf_ResCode::SMS_CODE_NOT_MATCH));
                }else if ($loginRes['status'] == '0207') {
                    $this->readJson(baf_ResCode::msg(baf_ResCode::PHONE_REGISTER));
                } else {
                    if (isset($loginRes['msg'])) {
                        $this->readJson(baf_ResCode::msg(baf_ResCode::REG_ERR, $loginRes['msg']));
                    } else {
                        $this->readJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
                    }
                }
            }
        } else {
            $this->readJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
        }
    }

    /**
     * 获取验证码
     */
    public function getsmscodeAction()
    {
        $username = $this->getParam('phone');
        $this->checkHash(true);
        //验证码
        if (preg_match('/1[2345678]{1}\d{9}$/', $username) == 0) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::PHONE_ERROR));
        }

        //begin 一天只能获取固定次数的验证码
        $limitKey = 'sms_code_day_limit_' . $username;
        $dayRes = $this->cache()->get($limitKey);
        if ($dayRes >= 10) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::GET_SMS_CODE_DAYLIMIT));
        }

        if ($this->smscodeGetLimit($username . '_retister_smscode')) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::SMSCODE_TIME_LIMIT));
        }

        $loginRes = api_User::getSmsCode(array('phone' => $username, 'type' => '4'));
        //登录成功
        if (is_array($loginRes) && isset($loginRes['status']) && $loginRes['status'] == SUCCESS_STATUS) {
            $this->cache()->set($limitKey, $dayRes + 1, 24 * 60 * 60); // 60s
           // $this->cache()->set($this->smsKey . $username, $loginRes['verification'], 10 * 60); // 60s
            $this->smscodeGetLimit($username . '_retister_smscode', 1);
            $this->readJson(baf_ResCode::msg());
        } else if (isset($loginRes['status']) && $loginRes['status'] == '0903') {
            $this->readJson(baf_ResCode::msg(baf_ResCode::PHONE_REGISTER));
        } else {
            $this->readJson(baf_ResCode::msg(baf_ResCode::GET_SMS_CODE_ERROR));
        }
    }


    /**
     * 手机验证码获取限制
     * @param unknown $key
     * @param number $set
     * @return boolean|Ambigous <mixed, boolean, string>
     */
    private function smscodeGetLimit($key, $set = 0)
    {
        if ($set) {
            return $this->cache()->set($key, 1, 30);//30秒内同类型的验证码只能获取一次
        } else {
            $data = $this->cache()->get($key);
            return $data;
        }
    }


    /**
     * 微信绑定入口
     */
    public function wechatAction()
    {
        $this->setPageTitle(array('title'=>'绑定微信-趣运动'));

        $fromUrl = $this->getParam('from_url','');
        $from = $this->getParam('from', '');
        //微信网页授权
        $code = $this->getParam("code");
        $auth = api_WxApi::checkAuth($code);
        if (!$auth) {
            //跳转至微信授权地址发起网页授权
            $return_url = ($from == 'wxuc') ? baf_Base::base_url() . '/login/wechat?from=wxuc&login' : baf_Base::base_url() . '/login/wechat?from_url=' . $fromUrl;
            $this->redirect(api_WxApi::createAuthUrl($return_url));
            exit;
        }else{
            //通过授权获取微信用户信息
            $weixinUserInfo = array();
            if (!empty($auth) && is_array($auth)) {
               $weixinUserInfo = api_WxApi::getWeixinUserInfo($auth);
            }        
            if(empty($weixinUserInfo)){
                baf_Common::log('wechat_error', 'EMERG', 'Login wechatAction getWeixinUserInfo error', array('auth'=>$auth, 'userinfo'=>$weixinUserInfo, 'wechat_id'=>$this->wechat_id));
                $this->redirectMessage('获取微信用户信息失败，稍后再试');
            }
        }
        $this->_view->assign(array(
            'userInfo' => $weixinUserInfo,
            'from_url' =>$fromUrl,
            'from' => $from,
        ));
    }

    /**
     * 微信绑定
     */
    public function wechatbindAction()
    {
        //微信授权
        $phone = $this->getParam('phone', '');
        $sms_code = $this->getParam('sms_code', '');
        //$fromUrl = $this->getParam('from_url', 'User');
        $from = $this->getParam('from', '');

        if (!api_WxApi::checkAuth("")) {
            $return_url = ($from == 'wxuc') ? baf_Base::base_url() . '/login/wechat?login=wxuc' : baf_Base::base_url() . '/login/wechat';
            $return_url = api_WxApi::createAuthUrl($return_url);
            $this->readJson(baf_ResCode::msg(baf_ResCode::WX_AUTH_FAILED,array('redirect_url'=>$return_url)));
        }

        if (!$sms_code) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::SMS_CODE_NOT_MATCH));
        }
        if (!$phone || preg_match('/1[2345678]{1}\d{9}$/', $phone) == 0) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::PHONE_ERROR));
        }
        //token如果存在
        $userInfo = array();
        $token = api_WxApi::getTokenCookie();
        if (!empty($token) && !isset($token['errcode'])) {
            $userInfo = api_WxApi::getWeixinUserInfo($token);
            if($userInfo && empty($userInfo['unionid'])){
                if($this->wechat_id>0){
                    $userInfo['unionid'] = 'union_'.$token['openid'];
                }else{                  
                    if (getenv("PAY_HOST")) {
                        $userInfo['unionid'] = $token['openid'] . "-123";//测试环境unionid设置
                    }else{
                        baf_Common::log('wechat_bind_error', 'EMERG', 'getWeixinUserInfo no unionid', array('userInfo'=>$userInfo, 'token'=>$token, 'wechat_id'=>$this->wechat_id));
                        $this->readJson(baf_ResCode::msg(baf_ResCode::ERR_UNION_ID));//正式环境趣运动微信不能无unionid
                    }
                }
            }
        }
        //token获取不到,将通过openid获取游客信息
        if (empty($userInfo)) {
            $open_id = api_WxApi::$token['openid'];
            $userInfo = api_WxApi::getWechatInfo($open_id);
        }
        if (empty($userInfo) || !isset($userInfo['openid']) || empty($userInfo['openid']) ) {
            baf_Common::log('wechat_bind_error', 'EMERG', 'Login wechatbindAction getWeixinUserInfo error', array('token'=>$token, 'userinfo'=>$userInfo, 'wechat_id'=>$this->wechat_id));
            $this->readJson(baf_ResCode::msg(baf_ResCode::ERR_UNION_ID));
        }
        if (!isset($userInfo['unionid'])) {
            baf_Common::log('wechat_bind_error', 'EMERG', 'Login wechatbindAction no unionid', array('token'=>$token, 'userinfo'=>$userInfo, 'wechat_id'=>$this->wechat_id));
            $this->readJson(baf_ResCode::msg(baf_ResCode::ERR_UNION_ID));
        }
        $bindParam = array(
            'phone' => $phone,
            'sms_code' => $sms_code,
            'open_id' => api_WxApi::$token['openid'],
            'access_token' => api_WxApi::$token['access_token'],
            'open_type' => 'wx',
            'union_id' => $userInfo['unionid'],
            'avatar' => isset($userInfo['headimgurl'])&&$userInfo['headimgurl']?$userInfo['headimgurl']:'',
            'ver' => '1.1',
            'nick_name' =>isset( $userInfo['nickname'])&&$userInfo['nickname']?$userInfo['nickname']:'',
        );
        //获取cookie中的wechat_id
        $bindParam['wechat_id'] = $this->wechat_id;
        
        $bindRes = api_User::unionPhone($bindParam);

        //记录异常日志
        if (!isset($bindRes['status']) || $bindRes['status'] != SUCCESS_STATUS) {
            baf_Common::log('wechat_bind_error', 'EMERG', 'Login wechatbindAction unionPhone error', json_encode(array(
                'url'       => $this->redirectUrl(),
                'api_res'   => $bindRes,
                'api_param' => $bindParam
            )));
        }
        if (isset($bindRes['status']) && $bindRes['status'] == SUCCESS_STATUS) {
            $user = array(
                'user_id' => $bindRes['user_id'],
                'phone' => $bindRes['phone'],
                'nick_name' => $bindRes['nick_name'],
                'avatar' => $bindRes['avatar'],
            );
            $msg = isset($bindRes['appendMsg']) ? $bindRes['appendMsg'] : '';
            api_WxUser::setLoginCookie($user, LOGIN_TIME_LIMIT);
            //获取跳转地址
            //$fromUrl = urldecode($fromUrl);
            if ($from == 'wxuc') {
                $url = baf_Base::base_url() . '/usercard/?from=wxuc';
            } else {
                //$url = baf_Base::base_url() . '/' . $fromUrl;
                $url = urldecode($this->getReturnUrl());
            }

            $this->readJson(array('msg'=>$msg,'code'=>1,'data'=>array('url' => $url)));

        } elseif (isset($bindRes['status']) && $bindRes['status'] == '0207') {
            $this->readJson(baf_ResCode::msg(baf_ResCode::HAS_PHONE_BAND));

        } elseif (isset($bindRes['status']) && $bindRes['status'] == '0222' || $bindRes['status'] == '-2') {
            $this->readJson(baf_ResCode::msg(baf_ResCode::CASH_SMS_NOT_MATCH));

        } else {
            $this->readJson(baf_ResCode::msg(baf_ResCode::ERR_PHONE_BAND));
        }

    }

    public function wechatSmsAction()
    {

        $username = $this->getParam('phone');
        $this->checkHash();
        //验证码
        if (preg_match('/1[2345678]{1}\d{9}$/', $username) == 0) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::PHONE_ERROR));
        }

        //begin 一天只能获取固定次数的验证码
        $limitKey = 'sms_code_day_limit_' . $username;
        $dayRes = $this->cache()->get($limitKey);
        if ($dayRes >= 10) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::GET_SMS_CODE_DAYLIMIT));
        }

        if ($this->smscodeGetLimit($username . '_retister_smscode')) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::SMSCODE_TIME_LIMIT));
        }

        $checkParam["type"] = "7";
        $checkParam["phone"] = $username;
        $checkParam["open_type"] = "wx";
        if ($this->wechat_id > 0) {
            $checkParam['union_source'] = 'unionwx_' . $this->wechat_id;
        } else {
            $checkParam['union_source'] = "qydwx";
        }

        $smsRes = api_Sms::sendSmsCode($checkParam);
        if (is_array($smsRes) && isset($smsRes['status']) && $smsRes['status'] == SUCCESS_STATUS) {
            $this->cache()->set($limitKey, $dayRes + 1, 24 * 60 * 60); // 60s
            $this->smscodeGetLimit($username . '_retister_smscode', 1);
            $this->readJson(baf_ResCode::msg());
        }
        elseif(is_array($smsRes) && isset($smsRes['status']) && $smsRes['status'] == '0903'){
            $this->readJson(baf_ResCode::msg(baf_ResCode::ERR_PHONE_HAS_BAND));

        }
        else {
            $this->readJson(baf_ResCode::msg(baf_ResCode::GET_SMS_CODE_ERROR));
        }
    }
    
    /**
     * 重设密码
     */
    public function reSetPasswordAction(){
    	if($_POST){
    		$phone = $this->getParam('phone');
    		$code = $this->getParam('code');
    		$pwd = $this->getParam('pwd');
    		$repwd = $this->getParam('re_pwd');
	    	if (preg_match('/1[2345678]{1}\d{9}$/', $phone) == 0) {
	            $this->readJson(baf_ResCode::msg(baf_ResCode::PHONE_ERROR));
	        }
	        if($pwd != $repwd){
	        	$this->readJson(baf_ResCode::PASSWORD_NOT_MATCH);
	        }
	        $des = new baf_Des();
	        $pwd = $des->encrypt($pwd);
	        $res = api_User::reSetPassword(array(
	        	'phone' => $phone,
	        	'password' => $pwd,
	        	'sms_code' => $code		
	        ));
	        if(isset($res['status']) && $res['status']=='0000'){
	        	$this->readJson(baf_ResCode::msg());
	        }else{
	        	$msg = isset($res['msg']) ? $res['msg'] : '操作失败';
	        	$status = isset($res['status']) ? $res['status'] : baf_ResCode::SYSTEM_ERROR;
	        	$this->readJson(array(
	        		'code' => $status,
	        		'msg' => $msg,
	        		'data' => (object) array()		
	        	));
	        }
    	}
        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
        $this->setPageTitle(array('utm_source'=>$utm_sources));
    }
    
    /**
     * 获取验证码
     */
    public function getPhoneCodeAction(){
    	Yaf_Dispatcher::getInstance()->autoRender(FALSE);
    	if($_POST){
    		$phone = $this->getParam('phone');
    		$type = intval($this->getParam('type'));
            $this->checkHash(true);
    		if (preg_match('/1[2345678]{1}\d{9}$/', $phone) == 0) {
    			$this->readJson(baf_ResCode::msg(baf_ResCode::PHONE_ERROR));
    		}
    		if(!in_array($type, array(1,2,3,4,5,6,7))){
    			$this->readJson(baf_ResCode::msg(baf_ResCode::GET_SMS_CODE_ERROR));
    		}
    		$res = api_User::getSmsCode(array(
    			'phone' => $phone,
    			'type' => $type	
    		));
    		if(isset($res['status']) && $res['status']=='0000'){
    			$this->readJson(baf_ResCode::msg());
    		}else{
    			$msg = isset($res['msg']) ? $res['msg'] : '操作失败';
    			$status = isset($res['status']) ? $res['status'] : baf_ResCode::GET_SMS_CODE_ERROR;
    			$this->readJson(array(
    					'code' => $status,
    					'msg' => $msg,
    					'data' => (object) array()
    			));
    		}
    	}
    }


    public function detailAction()
    {
        $this->_view->assign(array(
            'title' =>'趣运动用户协议',
            'id' => 41,
        ));
    }

    /**
     * 第三方通用绑定入口
     */
    public function qqwalletAction()
    {
        //调用获取页面标题、关键字和介绍
        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
        $this->setPageTitle(array('utm_source'=>$utm_sources));

        $this->_view->assign(array(
            'title' =>'第三方互联登录'
        ));
    }

    /**
     * 第三方通用绑定
     */
    public function qqwalletbindAction()
    {
        //微信授权
        $phone = $this->getParam('phone', '');
        $sms_code = $this->getParam('sms_code', '');
        
        if (!$sms_code) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::SMS_CODE_NOT_MATCH));
        }

        if (!$phone || preg_match('/1[2345678]{1}\d{9}$/', $phone) == 0) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::PHONE_ERROR));
        }

        //获取用户的基本信息
        $userInfo = api_QqWallet::getQqUserInfo();

        $bindParam = array(
            'phone'         => $phone,
            'sms_code'      => $sms_code,
            'open_id'       => !empty($_SESSION['qqwallet_openid']) ? $_SESSION['qqwallet_openid'] : '',
            'access_token'  => !empty($_SESSION['qqwallet_access_token']) ? $_SESSION['qqwallet_access_token'] : '',
            'open_type'     => 'qq',
            'union_id'      => '',
            'avatar'        => isset($userInfo['figureurl_qq_1']) && $userInfo['figureurl_qq_1'] ? $userInfo['figureurl_qq_1']:'',
            'ver'           => '2.0',
            'nick_name'     => isset( $userInfo['nickname']) && $userInfo['nickname'] ? $userInfo['nickname'] : '',
            'union_source'  => 'qydapp',
            'utm_source'    => 'qqwallet' //用于验证手Q add by wuchunhua 2016-09-29
        );
        
        $bindRes = api_User::commonUnionBind($bindParam);
        
        //记录异常日志
        if (!isset($bindRes['status']) || $bindRes['status'] != SUCCESS_STATUS) {
            baf_Common::log('qqWallet_bind_error', 'EMERG', 'Login qqWalletbindAction unionPhone error', json_encode(array(
                'url'       => $this->redirectUrl(),
                'api_res'   => $bindRes,
                'api_param' => $bindParam
            )));
        }
        if (isset($bindRes['status']) && $bindRes['status'] == SUCCESS_STATUS) {
            $des = new baf_Des();
            $user = array(
                'user_id'   => isset($bindRes['data']['user_id']) ? $bindRes['data']['user_id'] : 0,
                'phone'     => isset($bindRes['data']['phone_encode']) ? $des->decrypt($bindRes['data']['phone_encode']) : '',
                'nick_name' => isset($bindRes['data']['nick_name']) ? $bindRes['data']['nick_name'] : '',
                'avatar'    => isset($bindRes['data']['avatar']) ? $bindRes['data']['avatar'] : '',
            );

            api_WxUser::setLoginCookie($user, LOGIN_TIME_LIMIT);

            //获取跳转地址
            $url = $this->getReturnUrl() ? urldecode($this->getReturnUrl()) : '/index';
            $this->readJson(baf_ResCode::msg('', array('url' => $url)));

        } elseif (isset($bindRes['status']) && $bindRes['status'] == '0207') {
            $this->readJson(baf_ResCode::msg(baf_ResCode::HAS_PHONE_BAND));
        } elseif (isset($bindRes['status']) && $bindRes['status'] == '0222' || $bindRes['status'] == '-2') {
            $this->readJson(baf_ResCode::msg(baf_ResCode::CASH_SMS_NOT_MATCH));
        } else {
            $this->readJson(baf_ResCode::msg(baf_ResCode::ERR_PHONE_BAND));
        }
    }

    public function authLoginAction(){
        $userId = intval($this->getParam('user_id'));
        $loginEncode = trim($this->getParam('login_encode'));
        $returnUrl  = $this->getReturnUrl();

        $res = baf_Common::initRes();
        if($userId<1 || !$loginEncode){
            $res->status = '0100';
            $res->msg = '参数错误';
        }else{
            $loginInfo = api_FrontHelper::getDecodeAuthstr($loginEncode);
            $loginUserId = isset($loginInfo['user_id']) ? $loginInfo['user_id'] : 0;
            if($userId != $loginUserId){
                $res->status = '0101';
                $res->msg = '非法参数';
            }else{
                $last_update_time = isset($loginInfo['last_update_time']) ? $loginInfo['last_update_time'] : 0;
                $last_update_time = time();
                if($last_update_time)
                {
                    # 判断登录是否过期
                    $expires = LOGIN_TIME_LIMIT;
                    if(time() - $last_update_time > $expires){
                        $res->status = '0201';
                        $res->msg = '登录已过期';
                        baf_Common::log('authlogin_error','INFO','time out',array('url'=>$this->redirectUrl(),'loginInfo'=>$loginInfo));
                        //登录过期
                    }else{
                        $data = api_User::getUserInfo(array('user_id' => $userId));
                        if (isset($data['status']) && $data['status'] == '0000') 
                        {
                        	$user = array(
                        			//user_id：973954
                        			'user_id' => $userId,
                        			'phone' => $data['phone'],
                        			'nick_name' => $data['nick_name'],
                        			'avatar' => $data['avatar'],
                        	); 
                        	
                        	//記錄沒有user_id的情況
                        	if(!isset($data['user_id'])){
                        		baf_Common::log('authlogin_error','INFO','data error',$data);
                        	}
                        	
                            $this->uid       = $userId;
                            $this->userToken = api_CoreHelper::authcode($data['phone'],'ENCODE',ENCODE_KEY);
                            api_WxUser::setLoginCookie($user, LOGIN_TIME_LIMIT);
                            //---user
                            //baf_Common::log('authlogin_error','INFO','user error',$user);
                            $res->data = array('redirect_url' => $returnUrl ? $returnUrl : '/');
                        }else{
                            //log
                            baf_Common::log('authlogin_error','INFO','api_User error',array('url'=>$this->redirectUrl(),'loginInfo'=>$loginInfo,'res'=>$data));
                            $res->status = '0202';
                            $res->msg = '登录失败';
                        }
                    }
                }else{
                    //log
                    baf_Common::log('authlogin_error','INFO','no last_update_time',array('url'=>$this->redirectUrl(),'loginInfo'=>$loginInfo));
                    $res->status = '0102';
                    $res->msg = '数据错误';
                }  
            }            
        }
        echo json_encode($res);
        exit;
    }

}