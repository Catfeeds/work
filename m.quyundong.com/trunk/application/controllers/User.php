<?php
class UserController extends UserBaseController
{
	public static $user_money = 0;
	//用户中心
	public function indexAction()
	{
		// 读取用户信息
		$res = api_User::getUserInfo(array('user_id' => $this->uid));
		$userInfo = array();
		if (is_array($res) && isset($res['status']) && $res['status'] == SUCCESS_STATUS) {
			unset($res['status']);
			unset($res['msg']);
			$userInfo = $res;
		}
		
		$homeInfo = array();
		$homeRes = api_User::myHome(array('user_id'=>$this->uid));
		if(isset($homeRes['status']) && $homeRes['status'] == SUCCESS_STATUS){
			$homeInfo = isset($homeRes['data']) ? $homeRes['data'] : array();
		} 
		
		$msgCount = array();
		$msgRes = api_User::getMessageCountList(array('user_id'=>$this->uid));
		if(isset($msgRes['status']) && $msgRes['status'] == SUCCESS_STATUS){			
			if(isset($msgRes['data']) && $msgRes['data']){
				foreach($msgRes['data'] as $v){
					$msgCount[$v['type']] = $v['count'];
				}
			}
		}

		//调用获取页面标题、关键字和介绍
        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
		$this->setPageTitle(array('utm_source'=>$utm_sources));
		
		$this->_view->assign(array(
				'userInfo' => $userInfo,
				'homeInfo' => $homeInfo,
				'msgCount' => $msgCount
		));
		if(baf_Common::isChannel('decathlon')){
            Yaf_Dispatcher::getInstance()->autoRender(FALSE);
            $this->getView()->display('decathlon/user/index.php');
        }
	}
	
	
	/**
	 * 帐户管理
	 */
	public function accountAction(){
		$from = trim($this->getParam('from'));
		$wechat_id = ($this->wechat_id > 0) ? 'unionwx_' . $this->wechat_id : 'qydwx';
		$isSetPw = 0;
		$mobilePhone='';
		$opInfo = array();
		$userInfo = api_User::getUserInfo(array('user_id' => $this->uid));
		if (isset($userInfo['status']) && $userInfo['status'] == '0000') {
			$isSetPw = isset($userInfo['is_setpassword']) ? $userInfo['is_setpassword'] : 0;
			$mobilePhone = isset($userInfo['phone']) ? $userInfo['phone'] : api_CoreHelper::getCookie('phone');
		}
		$WechatInfo = api_User::getUserWechatInfo(array('user_id' => $this->uid, 'union_source' => $wechat_id));

		if (isset($WechatInfo['status']) && $WechatInfo['status'] == '0000') {
			$opInfo = isset($WechatInfo['data']) && $WechatInfo['data'] ? $WechatInfo['data'] : array();
		}

		//调用获取页面标题、关键字和介绍
        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
		$this->setPageTitle(array('utm_source'=>$utm_sources));

		$this->_view->assign(array(
			'mobile' => $mobilePhone,
			'openInfo' => $opInfo,
			'isSetPw'=>$isSetPw,
			'from' => $from,
		));
	}
	
	/**
	 * 绑定手机号
	 */
	public function bindPhoneAction(){
		//调用获取页面标题、关键字和介绍
        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
		$this->setPageTitle(array('utm_source'=>$utm_sources));
        
		if($_POST){
			$phone = $this->getParam('phone');
			$smsCode = $this->getParam('code');
			$pwd = $this->getParam('pwd');
			$pwd2 = $this->getParam('re_pwd');
			
			if (preg_match('/1[2345678]{1}\d{9}$/', $phone) == 0) {
				$this->readJson(baf_ResCode::msg(baf_ResCode::PHONE_ERROR));
			}
			
			if (strlen($pwd) < 6 || strlen($pwd2) < 6) { // 密码长度不能小于6位
				$this->readJson(baf_ResCode::msg(baf_ResCode::PASSWORD_LENGH_ERROR));
			}
			
			if ($pwd != $pwd2) {
				$this->readJson(baf_ResCode::msg(baf_ResCode::PASSWORD_NOT_MATCH));
			}
			$des = new baf_Des();
			$res = api_User::bindPhone(array(
				'user_id' => $this->uid,
				'phone' => $phone,
				'password' => $des->encrypt($pwd),
				'sms_code' => $smsCode,
                'ver'=>'1.6',
			));

			if(isset($res['status']) && $res['status'] == SUCCESS_STATUS){
                api_CoreHelper::setCookie('phone',$phone);
				$this->readJson(array(
						'code' => 1,
						'msg' => 'success',
						'data' => isset($res['data']) ? $res['data'] : (object) array()
				));
			}else{
				$code = isset($res['status']) ? $res['status'] : baf_ResCode::SYSTEM_ERROR;
				$msg = isset($res['msg']) ? $res['msg'] : '系统繁忙';
				$this->readJson(array('code'=>$code,'msg'=>$msg));
			}
		}
	}
	
	/**
	 * 退出登录
	 */
	public function logOutAction(){
		Yaf_Dispatcher::getInstance()->autoRender(FALSE);
		$this->clearLoginCookie();
		$redirectUrl = in_array(CHANNEL_SOURCE,Config::$hideItem) ? '/user' : '/';
		$this->redirect(baf_CHtml::createUrl($redirectUrl));
	}
	
	
	/**
	 * 修改密码
	 *
	 * @return void|string
	 * @author xiaosibo
	 */
	public function changePasswordAction(){
		if ($_POST) {
			$oldPassword = $this->getParam('old_password'); // 旧密码
			$password    = $this->getParam('password'); // 新密码
			$password2   =  $this->getParam('password2'); // 新密码确认
			 
			if (!$oldPassword) { // 没有输入旧密码
				$this->readJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, '旧密码不能为空'));
			}
			
			$len = strlen($password);
			if ($len < 6 || $len > 20) { // 密码长度不能小于6位
				$this->readJson(baf_ResCode::msg(baf_ResCode::PASSWORD_LENGH_ERROR));
			}
			if ($password != $password2) { // 两次密码不一致
				$this->readJson(baf_ResCode::msg(baf_ResCode::PASSWORD_NOT_MATCH));
			}
			 
			// 调用接口修改密码
			$res = api_User::changePassword(array('user_id' => $this->uid, 'old_password' => base64_encode($oldPassword), 'new_password' => base64_encode($password)));
		
			if (is_array($res) && isset($res['status'])) {
				if ($res['status'] == '0209') {
					$this->readJson(baf_ResCode::msg(baf_ResCode::OLD_PASSWORD_ERROR));
				}
				if ($res['status'] == SUCCESS_STATUS) {
					//api_CoreHelper::setFlashMsg('change_password_success', '修改密码成功!');
					$this->readJson(baf_ResCode::msg());
				}
			} else {
				$this->readJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
			}
		} else {
			//调用获取页面标题、关键字和介绍
	        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
			$this->setPageTitle(array('utm_source'=>$utm_sources));
		}
	}

	/**
	 * 设置密码
	 *
	 * @return void|string
	 * @author xiaosibo
	 */
	public function setPasswordAction()
	{
		if ($_POST) {

			$pwd = $this->getParam('password'); // 新密码
			$pwd2 = $this->getParam('password2'); // 新密码

			$len = strlen($pwd);
			if ($len < 6 || $len > 20) {
			    $this->readJson(baf_ResCode::msg(baf_ResCode::PASSWORD_LENGH_ERROR));
			}
				
			if ($pwd != $pwd2) {
				$this->readJson(baf_ResCode::msg(baf_ResCode::PASSWORD_NOT_MATCH));
			}
			$setData = array(
					'user_id' => $this->uid,
					'password' => base64_encode($pwd)
			);
			// 调用接口修改密码
			$res = api_User::setPassword($setData);

			if (is_array($res) && isset($res['status']) && $res['status'] == SUCCESS_STATUS) {

				//api_CoreHelper::setFlashMsg('change_password_success', '设置密码成功!');
				$url = baf_Base::base_url() . '/User';
				$this->readJson(baf_ResCode::msg('', array('url' => $url)));

			} elseif (is_array($res) && isset($res['status']) && $res['status'] == '0214') {
				$this->readJson(baf_ResCode::msg(baf_ResCode::ERR_PASSWORD_HAS_SET));
			} else {
				$this->readJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
			}
		} else {
			//调用获取页面标题、关键字和介绍
	        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
			$this->setPageTitle(array('utm_source'=>$utm_sources));

			//$flashMsg = api_CoreHelper::getFlashMsg('set_password_success');
			$phone = api_CoreHelper::getCookie('phone');
			$this->_view->assign(
					array(
						//'flashMsg' => $flashMsg,
							'phone' => $phone
					)
			);
		}
	}
	
	/**
	 * 收藏列表
	 */
	public function favoriteListAction(){
		if($this->getParam('ajax')){
			Yaf_Dispatcher::getInstance()->autoRender(FALSE);
			$page = max(1, intval($this->getParam('page')));
			$count = 10;
			$res = api_User::favoriteList(array('user_id'=>$this->uid, 'page'=>$page, 'count'=>$count));
			if(isset($res['status']) && $res['status'] == SUCCESS_STATUS){
				$favoriteList = isset($res['favorite_list']) && $res['favorite_list'] ? $res['favorite_list'] : array();
				$this->readJson(array(
					'code' => 1,
					'msg' => 'success',
					'data' => $favoriteList	
				));
			}else{
				$code = isset($res['status']) ? $res['status'] : baf_ResCode::SYSTEM_ERROR;
				$msg = isset($res['msg']) ? $res['msg'] : '系统繁忙';
				$this->readJson(array('code'=>$code,'msg'=>$msg));
			}
		}
		$this->setPageTitle(array('utm_source'=>CHANNEL_SOURCE));
	}
	
	/**
	 * 添加收藏
	 */
	public function addFavoriteAction(){
		Yaf_Dispatcher::getInstance()->autoRender(FALSE);
		if($_POST){
			$param = array(
				'user_id' => $this->uid,
				'business_id' => intval($this->getParam('business_id')),
				'category_id' => intval($this->getParam('cat_id'))		
			);
			$res = api_User::addFavorite($param);
			if(isset($res['status']) && $res['status'] == SUCCESS_STATUS){
				$this->readJson(array(
						'code' => 1,
						'msg' => 'success',
						'data' => isset($res['data']) ? $res['data'] : (object) array()
				));
			}else{
				$code = isset($res['status']) ? $res['status'] : baf_ResCode::SYSTEM_ERROR;
				$msg = isset($res['msg']) ? $res['msg'] : '系统繁忙';
				$this->readJson(array('code'=>$code,'msg'=>$msg));
			}
		}
	}
	
	/**
	 * 移除收藏
	 */
	public function removeFavoriteAction(){
		Yaf_Dispatcher::getInstance()->autoRender(FALSE);
		if($_POST){
			$param = array(
					'user_id' => $this->uid,
					'business_id' => intval($this->getParam('business_id')),
					'category_id' => intval($this->getParam('cat_id'))
			);
			$res = api_User::removeFavorite($param);
			if(isset($res['status']) && $res['status'] == SUCCESS_STATUS){
				$this->readJson(array(
						'code' => 1,
						'msg' => 'success',
						'data' => isset($res['data']) ? $res['data'] : (object) array()
				));
			}else{
				$code = isset($res['status']) ? $res['status'] : baf_ResCode::SYSTEM_ERROR;
				$msg = isset($res['msg']) ? $res['msg'] : '系统繁忙';
				$this->readJson(array('code'=>$code,'msg'=>$msg));
			}
		}
	}

	/**
	 * 用户余额
	 */
	public function balanceAction(){
		$UserInfo = array();
		$balanceInfo = api_User::getUserInfo(array('user_id' => $this->uid,'ver'=> '1.3'));
		$balanceMoney = 0;
		$UserInfo = array(
			'user_money' => 0,
			'is_set_paypassword' => 0,
		);
		if(isset($balanceInfo['status']) && $balanceInfo['status'] == '0000'){
			$UserInfo = array(
				'user_money' => !empty($balanceInfo['data']['user_money']) ? $balanceInfo['data']['user_money'] : 0,
				'is_set_paypassword' => !empty($balanceInfo['data']['is_set_paypassword']) ? $balanceInfo['data']['is_set_paypassword'] : 0,
			);
			$balanceMoney =  !empty($balanceInfo['data']['user_money']) ? $balanceInfo['data']['user_money'] : 0;
		}

		//调用获取页面标题、关键字和介绍
        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
		$this->setPageTitle(array('utm_source'=>$utm_sources));

		api_CoreHelper::setCookie('user_money',$balanceMoney, LOGIN_TIME_LIMIT);
		self::$user_money = $balanceMoney;
		$this->_view->assign(array(
			'userInfo'=>$UserInfo,
		));
	}
	
	/**
	 * 用户余额使用规则
	 */
	public function bRuleAction(){
		//调用获取页面标题、关键字和介绍
        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
		$this->setPageTitle(array('utm_source'=>$utm_sources));

		//自动载入视图
	}
	/**
	 * 余额使用记录
	 */
	public function moneyLogAction(){
		//调用获取页面标题、关键字和介绍
        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
		$this->setPageTitle(array('utm_source'=>$utm_sources));

		if($this->getParam('ajax')){
			Yaf_Dispatcher::getInstance()->autoRender(FALSE);
			$page = max(1, intval($this->getParam('page')));
			$count = 20;
			$res = api_User::userMoneyLog(array('user_id'=>$this->uid, 'page'=>$page, 'count'=>$count));
			if(isset($res['status']) && $res['status'] == SUCCESS_STATUS){
				$list = isset($res['data']) && $res['data'] ? $res['data'] : array();
				$this->readJson(array(
						'code' => 1,
						'msg' => 'success',
						'data' => $list
				));
			}else{
				$code = isset($res['status']) ? $res['status'] : baf_ResCode::SYSTEM_ERROR;
				$msg = isset($res['msg']) ? $res['msg'] : '系统繁忙';
				$this->readJson(array('code'=>$code,'msg'=>$msg));
			}
		}else{
			$balanceInfo = api_User::getUserInfo(array('user_id' => $this->uid,'ver'=> '1.3'));
			$balanceMoney =  !empty($balanceInfo['data']['user_money']) ? $balanceInfo['data']['user_money'] : 0;
			$this->_view->assign(array(
				'balanceMoney'=>$balanceMoney,
			));
		}
	}
	
	/**
	 * 移除微信绑定
	 */
	public function unionWxRemoveAction(){
		Yaf_Dispatcher::getInstance()->autoRender(FALSE);
		if(!empty($_POST['op'])){
				$removeParam = array(
					'user_id' => $this->uid,
					'open_type' => 'wx'
				);
				$removeParam['wechat_id'] = ($this->wechat_id > 0) ? $this->wechat_id : '';
				$res = api_User::unionRemove($removeParam);
			baf_Common::log('unbind_wx', 'INFO', 'unbind_wx_res', $res);
				if(!empty($res['status']) && $res['status']=='0000'){
					unset($_SESSION['open_wx']);
					$this->readJson(array(
							'code' => 1,
							'msg' => '解除成功'
					));
				}else{
					$code = isset($res['status']) ? $res['status'] : baf_ResCode::SYSTEM_ERROR;
					$msg = isset($res['msg']) ? $res['msg'] : '系统繁忙';
					$this->readJson(array('code'=>$code,'msg'=>$msg));
				}

		}
	}
	/**
	 * 解绑用户
	 * @response JSON 结果
	 */
	public function unbindApiAction()
	{
		$unbindParam['user_id'] = $this->uid;
		$unbindParam['open_type'] = 'wx';
		$unbindParam['wechat_id'] = ($this->wechat_id > 0) ? $this->wechat_id : '';

		if($this->uid) {
			$remRes = api_User::unionRemove($unbindParam);
		}
		if(isset($remRes['status'])&&$remRes['status']=='0000'&&$this->uid){
			$this->clearLoginCookie();
			$rediret_url = baf_Base::base_url().'/Login/wechat/?login=wxuc';
			$res = array(
				'status'=>'0000',
				'msg'=>'',
				'data'=> array(
					'redirect_url'=>$rediret_url
				),
			);
			$this->readJson($res);
		}else{
			$res = array(
				'status'=>baf_ErrorCode::UNBIND_FAILED,
				'msg'=>baf_ErrorCode::msg(baf_ErrorCode::UNBIND_FAILED),
				'data'=>array(),
			);
			$this->readJson($res);
		}
	}
	/**
	 * 绑定微信
	 */
	public function bindWxAction(){
		$code = $this->getParam("code");
		if (empty($code)) {
			$return_url = baf_Base::base_url() . $_SERVER['REQUEST_URI'];
			$this->redirect(api_WxApi::createAuthUrl($return_url));
			exit;
		}
		$redirectUrl = '/user/account';
		$token = api_WxApi::checkAuth($code);
		if(!empty($token) && !isset($token['errcode'])){
			//获取微信用户信息
            $userInfo = api_WxApi::getWeixinUserInfo($token);
            if(empty($userInfo)){
            	baf_Common::log('bind_wx', 'INFO', 'get weixinUserInfo error', array('weixinUserInfo'=>$weixinUserInfo, 'token'=>$token));
            	$this->redirectMessage('获取微信用户信息失败，稍后再试');
            } 
            if (empty($userInfo['unionid'])) {
				if($this->wechat_id>0){
					$userInfo['unionid'] = 'union_'.$token['openid'];
				}else{					
					if (getenv("PAY_HOST")) {
	                    $userInfo['unionid'] = $token['openid'] . "-123";//测试环境unionid设置
	                }else{
	                	baf_Common::log('bind_wx', 'INFO', 'no unionid', array('weixinUserInfo'=>$weixinUserInfo, 'token'=>$token));
	                	$this->redirectMessage('获取微信用户信息失败，稍后再试');//正式环境趣运动微信不能无unionid
	                }
				}
			}

			$param = array(
				'user_id' => $this->uid,
				'open_id' => $token['openid'],
				'access_token' => $token['access_token'],
				'open_type' => 'wx',
				'union_id' => $userInfo['unionid'],
				'nick_name' => $userInfo['nickname'],
			);

			if($this->wechat_id>0) $param['wechat_id'] = $this->wechat_id;
			$res = api_User::unionBind($param);
			if (isset($res['status']) && $res['status'] == '0000') {
				if(isset($res['appendMsg'])){
	                $res['msg'] = $res['appendMsg'];
	            }
				$this->redirect($redirectUrl."?from=" . urlencode($res['msg']));
			} else {
				baf_Common::log('bind_wx', 'INFO', 'bind_wx_error', array('param'=>$param, 'res'=>$res));
				$this->redirect($redirectUrl."?from=" . urlencode($res['msg']));
			}
		}else{
			baf_Common::log('bind_wx', 'INFO', 'get token error', array('code'=>$code, 'token'=>$token));
			$this->redirect($redirectUrl."?from=" . urlencode('获取微信用户信息失败，稍后再试'));			
		}
	}


	/**
	 * 忘记密码
	 */
	public function forgetAction(){

		//调用获取页面标题、关键字和介绍
        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
		$this->setPageTitle(array('utm_source'=>$utm_sources));

		//自动载入视图
		$orderId = $this->getParam('orderid','0');
		$this->_view->assign(array(
			'orderid'=>$orderId,
		));
	}

	/**
	 * 获取验证码--忘记支付密码
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

		if ($this->smscodeGetLimit($username . '_paypassword_smscode')) {
			$this->readJson(baf_ResCode::msg(baf_ResCode::SMSCODE_TIME_LIMIT));
		}

		$checkParam["type"] = "6";
		$checkParam["phone"] = $username;
		baf_Common::log('resst_paypassword', 'INFO', 'reset_paypassword_code', $checkParam);
		$smsRes = api_Sms::sendSmsCode($checkParam);
		baf_Common::log('resst_paypassword', 'INFO', 'reset_paypassword_res', $smsRes);
		if (is_array($smsRes) && isset($smsRes['status']) && $smsRes['status'] == SUCCESS_STATUS) {
			$this->cache()->set($limitKey, $dayRes + 1, 24 * 60 * 60); // 60s
			$this->smscodeGetLimit($username . '_paypassword_smscode', 1);
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
	 * 验证手机验证码--忘记支付密码
	 */
	public function checksmscodeAction()
	{
		$username = $this->getParam('phone');
		$sms_code = $this->getParam('sms_code');
		//验证码
		if (preg_match('/1[2345678]{1}\d{9}$/', $username) == 0) {
			$this->readJson(baf_ResCode::msg(baf_ResCode::PHONE_ERROR));
		}
		$checkParam["type"] = "6";
		$checkParam["phone"] = $username;
		$checkParam["sms_code"] = $sms_code;
		baf_Common::log('resst_paypassword', 'INFO', 'reset_paypassword_check_code', $checkParam);
		$smsRes = api_Sms::verifySmsCode($checkParam);
		baf_Common::log('resst_paypassword', 'INFO', 'reset_paypassword_check_res', $smsRes);
		if (is_array($smsRes) && isset($smsRes['status']) && $smsRes['status'] == SUCCESS_STATUS) {
			$this->readJson(baf_ResCode::msg());
		} else {
			$this->readJson(baf_ResCode::msg(baf_ResCode::SMS_CODE_NOT_MATCH));
		}
	}

	/**
	 * 手机验证码获取限制
	 *
	 * @param     $key
	 * @param int $set
	 *
	 * @return bool|mixed
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
	 * 找回支付密码
	 */
	public function resetPaypasswordAction(){

		$phone = $this->getParam('phone');
		$sms_code = $this->getParam('sms_code');
		$password = $this->getParam('pay_new_password');
		if(!$phone || !$sms_code || !$password) {
			$this->readJson(baf_ResCode::msg(baf_ResCode::PARAM_ERR));
		}
		if (preg_match('/1[2345678]{1}\d{9}$/', $phone) == 0) {
			$this->readJson(baf_ResCode::msg(baf_ResCode::PHONE_ERROR));
		}
		if( strlen($password) != 6) {
			$this->readJson(baf_ResCode::msg(baf_ResCode::PASSWORD_LENGH_ERROR));
		}

		$resetParam = array(
			'user_id'=>$this->uid,
			'phone'=>$phone,
			'sms_code'=>$sms_code,
			'pay_new_password'=>api_User::desEncrypt($password),
		);
		baf_Common::log('resst_paypassword', 'INFO', 'reset_paypassword_reset_params', $resetParam);
		$resetRes = api_User::resetPaypassword($resetParam);
		baf_Common::log('resst_paypassword', 'INFO', 'reset_paypassword_reset_res', $resetRes);
		if(isset($resetRes['status']) && $resetRes['status'] == SUCCESS_STATUS){
			$this->readJson($resetRes);
		}else{
			$this->readJson(baf_ResCode::msg(baf_ResCode::ERR_UPDATE_PASSWORD));
		}
	}
	/**
	 * 设置支付密码
	 */
	public function setPaypasswordAction(){

		$password = $this->getParam('password');
		if(empty($password)) {
			$this->readJson(baf_ResCode::msg(baf_ResCode::PARAM_ERR));
		}
		if( strlen($password) != 6) {
			$this->readJson(baf_ResCode::msg(baf_ResCode::PASSWORD_LENGH_ERROR));
		}
		$setParam = array(
			'user_id'=>$this->uid,
			'password'=>api_User::desEncrypt($password),
		);
		baf_Common::log('set_paypassword', 'INFO', 'set_paypassword_set_params', $setParam);
		$setRes = api_User::setPaypassword($setParam);
		baf_Common::log('set_paypassword', 'INFO', 'set_paypassword_set_res', $setRes);
		if(isset($setRes['status']) && $setRes['status'] == SUCCESS_STATUS){
			$this->readJson($setRes);
		}elseif(isset($setRes['status']) && $setRes['status'] == '1204'){
			$this->readJson($setRes);
		}
		else{
			$this->readJson(baf_ResCode::msg(baf_ResCode::ERR_SET_PASSWORD));
		}

	}

	/**
	 * 验证支付密码
	 */
	public function verifyPaypasswordAction(){

		$password = $this->getParam('password');
		if(empty($password)) {
			$this->readJson(baf_ResCode::msg(baf_ResCode::PARAM_ERR));
		}
		if( strlen($password) != 6) {
			$this->readJson(baf_ResCode::msg(baf_ResCode::PASSWORD_LENGH_ERROR));
		}
		$verifyParam = array(
			'user_id'=>$this->uid,
			'password'=>api_User::desEncrypt($password),
		);
		baf_Common::log('verify_paypassword', 'INFO', 'verify_paypassword_params', $verifyParam);
		$verifyRes = api_User::verifyPaypassword($verifyParam);
		baf_Common::log('verify_paypassword', 'INFO', 'verify_paypassword_res', $verifyRes);
		if(isset($verifyRes['status']) && $verifyRes['status'] == SUCCESS_STATUS){
			$this->readJson($verifyRes);
		}else{
			$this->readJson(baf_ResCode::msg(baf_ResCode::ERR_VERIFY_PASSWORD));
		}

	}
	/**
	 * 修改支付密码
	 */
	public function updatePaypasswordAction(){

		$pay_old_password = $this->getParam('pay_old_password');
		$pay_new_password = $this->getParam('pay_new_password');
		if(empty($pay_old_password) || empty($pay_new_password)) {
			$this->readJson(baf_ResCode::msg(baf_ResCode::PARAM_ERR));
		}
		if( strlen($pay_old_password) != 6 || strlen($pay_new_password) != 6) {
			$this->readJson(baf_ResCode::msg(baf_ResCode::PASSWORD_LENGH_ERROR));
		}
		$updateParam = array(
			'user_id'=>$this->uid,
			'pay_old_password'=>api_User::desEncrypt($pay_old_password),
			'pay_new_password'=>api_User::desEncrypt($pay_new_password),
		);
		baf_Common::log('update_paypassword', 'INFO', 'update_paypassword_params', $updateParam);
		$updateRes = api_User::updatePaypassword($updateParam);
		baf_Common::log('update_paypassword', 'INFO', 'update_paypassword_res', $updateRes);
		if(isset($updateRes['status']) && $updateRes['status'] == SUCCESS_STATUS){
			$this->readJson($updateRes);
		}else{
			$this->readJson(baf_ResCode::msg(baf_ResCode::ERR_UPDATE_PASSWORD));
		}
	}
	/**
	 * 储蓄金额充值
	 */
	public function rechargeDebitcardAction(){

		$password = $this->getParam('password');
		if(empty($password)) {
			$this->readJson(baf_ResCode::msg(baf_ResCode::PARAM_ERR));
		}
		if(strlen($password) != 14) {
			$this->readJson(baf_ResCode::msg(baf_ResCode::PASSWORD_LENGH_ERROR));
		}
		$rechargeParam = array(
			'user_id'=>$this->uid,
			'password'=>api_User::desEncrypt($password),
		);
		baf_Common::log('recharge_debit_card', 'INFO', 'recharge_debit_card_params', $rechargeParam);
		$rechargeRes = api_User::rechargeDebitcard($rechargeParam);
		baf_Common::log('recharge_debit_card', 'INFO', 'recharge_debit_card_res', $rechargeRes);
		if(isset($rechargeRes['status']) && $rechargeRes['status'] == SUCCESS_STATUS){
			$this->readJson($rechargeRes);
		}else if(isset($rechargeRes['status'])) {
			$this->readJson($rechargeRes);
		}
		else{
			$this->readJson(baf_ResCode::msg(baf_ResCode::ERR_RECHARGE_DEBIT));
		}
	}

	/**
	 * 用户资料
	 */
	public function infoAction(){
		$src = $this->getSrc();
		if($src) $this->setReturnUrl($src);
		$res = api_User::getUserInfo(array('user_id' => $this->uid));
		$userInfo = array();
		if (is_array($res) && isset($res['status']) && $res['status'] == SUCCESS_STATUS) {
			unset($res['status']);
			unset($res['msg']);
			$userInfo = $res;
		}

		//调用获取页面标题、关键字和介绍
        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
		$this->setPageTitle(array('utm_source'=>$utm_sources));

		$assignData = array('userInfo' => $userInfo, 'genders'=>array('m','f'));
		$this->_view->assign($assignData);
	}

	/**
	 * 更新用户资料
	 * 仅ajax POST访问可用
	 */
	public function updateInfoAction(){
		$code = 0;
		$msg = 'success';
		$redirectUrl = $this->getReturnUrl();
		$redirectUrl = $redirectUrl ? $redirectUrl : '/user/info';
		$param = array();

		if($this->isAjax && $_POST){
			$gender = trim($this->getParam('gender'));
			$nickName = trim($this->getParam('nick_name'));
			$age = intval($this->getParam('age', 0));
			$signature = trim($this->getParam('signature'));

			if(!in_array($gender, array('m','f'))){
				$this->readJson(array('code'=>'2013','msg'=>'请选择性别','data'=>[]));
			}
			
			if($gender) $param['gender'] = $gender;
			if($nickName) $param['nick_name'] = $nickName;
			if($age) $param['age'] = $age;
			if($signature) $param['signature'] = $signature;

			if($param){
				$param['user_id'] = $this->uid;
				$res = api_User::updateUserInfo($param);
				if(isset($res['status']) && $res['status']==SUCCESS_STATUS){
					$code = 1;
				}else{
					$code = 0;
					$msg = isset($res['msg']) ? $res['msg'] : baf_ResCode::getMsg(SYSTEM_ERROR);
					baf_Common::log('user', 'ERROR', 'updateInfo', array('param'=>$param, 'res'=>$res));
				}
			}else{
				$msg = '缺少更新数据';
			}	
			$this->readJson(array('code'=>$code, 'msg'=>$msg, 'redirect_url'=>$redirectUrl));
		}else{
			$this->readJson(array('code'=>$code, 'msg'=>'access denied'));
		}
	}
}