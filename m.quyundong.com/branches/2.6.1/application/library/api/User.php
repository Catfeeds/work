<?php
class api_User extends api_Base
{
	public static $action='';
	public static $api_sign='';
	
	const LOGTITLE = 'user_api';
	
	/**
	 * 获取打卡分享的信息
	 * @param  [type] $param [description]
	 * @return [type]        [description]
	 */
	public static function getSigninInfo($param){
		//检验user_id和si_id
		if ($param['si_id'] < 1) {
			return '0060';
		}

		$param['action']	= 'share_sign_in';
		$param = self::addPublicParam($param);

		return self::request(self::UserApiUrl.'signin?'.http_build_query($param),self::LOGTITLE);
	}


	//使用手机和密码登录接口
	public static function login($param){
		//检验手机
		if(preg_match('/1[2345678]{1}\d{9}$/',$param['phone']) == 0){
			return '0021';
		}
		//检验密码
		if(strlen($param['password']) < 6){
			return '0024';
		}
		$param['action']	= 'login';
		$param = self::addPublicParam($param);

		return self::request(self::UserApiUrl.'auth?'.http_build_query($param),self::LOGTITLE);
	}
	
	
	/**
	 * 获取个人信息
	 * @param array $param
	 * @return string|Ambigous <string, mixed>
	 */
	public static function getUserInfo($param){
		if(empty($param['user_id'])){
			return '0024';
		}
	
		$param['action']	= 'get_profile_info';
		$param = self::addPublicParam($param);
		return self::request(self::UserApiUrl.'user?'.http_build_query($param),self::LOGTITLE);
	}

	//获取趣运动的教练详情
	public static function GetCoachInfo($param){
	    //检验用户id
	    if($param['coach_id'] < 1){
	        return '0060';
	    }
	    $param['action'] = 'get_coach_info';
	    $param = self::addPublicParam($param);
	 
	    return self::request(self::CoachApiUrl.http_build_query($param),self::LOGTITLE);
	}
	
	/**
	 * 验证码快捷登录
	 * @param array $param
	 * @return string|Ambigous <string, mixed>
	 */
	public static function phoneQuckLogin($param){
		if(empty($param['phone']) && empty($param['sms_code'])){
			return '0024';
		}
	
		$param['action']	= 'quick_login';
		$param = self::addPublicParam($param);
	
		return self::request(self::UserApiUrl.'auth?'.http_build_query($param),self::LOGTITLE);
	}
	
	
	/**
	 * 手机号注册
	 * @param unknown $param
	 * @return string|Ambigous <string, mixed>
	 */
	public static function register($param){
		//检验手机
		if(preg_match('/1[2345678]{1}\d{9}$/',$param['phone']) == 0){
			return '0021';
		}
		//检验密码
		if(strlen($param['password']) < 6){
			return '0024';
		}
	
		$param['action']	= 'phone_register';
		$param = self::addPublicParam($param);
	
		return self::request(self::UserApiUrl.'auth?'.http_build_query($param), self::LOGTITLE);
	}

	
	/**
	 * 获取手机验证码接口[已废弃]
	 * @param unknown $param
	 * @return string
	 */
	public static function getVerification ($param){
		//检验手机
		if(preg_match('/1[2345678]{1}\d{9}$/',$param['phone']) == 0){
			return '0021';
		}
	
		$param['action']	= 'get_verification';
		$param = self::addPublicParam($param);
	
		return self::request(self::QydApiUrl.http_build_query($param), self::LOGTITLE);
	}
	
	/**
	 * 发送短信验证码
	 * @param unknown $param
	 * @return string|Ambigous <string, mixed>
	 */
	public static function CoachRecruit($param){
	    if(empty($param['phone'])){
	        return '0024';
	    }
	
	    $param['action']	= 'coach_recruit';
	    $param = self::addPublicParam($param);
	     
	    return self::request(self::QydApiUrl.http_build_query($param),self::LOGTITLE);
	}
	
	
	/**
	 * 修改密码
	 *
	 * 此方法名称被修改了,以前的方法名为 resetPassword
	 * xiaosibo 修改 2015-04-14
	 *
	 * @param array $param 参数数组
	 * @return mixed
	 */
	public static function changePassword(array $param)
	{
		//检验用户id
		if($param['user_id'] < 1){
			return '0060';
		}
		//检验密码
		if(strlen($param['old_password']) < 6 || strlen($param['new_password']) < 6){
			return '0024';
		}
	
		$param['action']	= 'update_password';
		$param = self::addPublicParam($param);
	
		return self::request(self::UserApiUrl.'user?'.http_build_query($param), self::LOGTITLE);
	}
	
	/**
	 * 用户等级
	 */
	public static function rulesLevel($param){
	    //检验用户id
	    if($param['user_id'] < 1){
	        return '0060';
	    }
	    	    
	    $param['action']	= 'rules_level';
	    $param = self::addPublicParam($param);
	    
	    return self::request(self::UserApiUrl.'user?'.http_build_query($param), self::LOGTITLE);
	}
	
	//近期运动记录
	public static function rulesRecord($param){
	    //检验用户id
	    if($param['user_id'] < 1){
	        return '0060';
	    }
	    
	    $param['action']	= 'rules_record';
	    $param = self::addPublicParam($param);
	    
	    return self::request(self::UserApiUrl.'user?'.http_build_query($param), self::LOGTITLE);
	}
	
	//规则说明
	public static function rulesDetail(){
	    $param['action']	= 'rules_detail';
	    $param = self::addPublicParam($param);
	     
	    return self::request(self::UserApiUrl.'user?'.http_build_query($param), self::LOGTITLE);
	}
	
	/**
	 * 添加用户运动水平评测
	 */
	public static function addSportEvaluation($param){
		$param['action'] = 'add_sport_evaluation';
		if(!$param['cat_id']){
			return '0060';
		}
		$param = self::addPublicParam($param);		 
		return self::request(self::UserApiUrl.'user?'.http_build_query($param), self::LOGTITLE);
	}

    /**
     * @param $param
     * @return bool|string
     * 第三方登录
     */
	public static function unionLogin($param){
		$param['action'] = 'union_login';
		if(!$param['open_id']||!$param['access_token']||!$param['open_type'] ){
			return false;
		}
		//只有微信才判定union_id
		if ($param['open_type'] == 'wx' && !$param['union_id']) {
			return false;
		}
		//获取绑定来源
		if (!empty($param['wechat_id']) && $param['wechat_id']>0) {
			//场馆公众号来源标识为 unionwx_加上微信管理后台对应的微信id
			$param['union_source'] = 'unionwx_'.$param['wechat_id'];
		}
		else {
			if (!isset($param['union_source']) || empty($param['union_source'])) {
				$param['union_source'] = "qydapp";
				if ($param['open_type'] == 'wx') {
					$param['union_source'] = "qydwx";//趣运动微信来源标识
				}
			}
		}
		unset($param['wechat_id']);
		$param['client_time'] = CURRENT_TIMESTAMP;
        $param['api_sign'] = self::sign($param);
		$url = self::UserApiUrl . 'union?' . http_build_query($param);
        return self::request(self::UserApiUrl.'union?'.http_build_query($param),self::LOGTITLE);
	}

    /**
     * @param $param
     * @return bool|string
     * 绑定手机 微信登录首次绑定
     */
    public static function unionPhone($param){
        $param['action'] = 'union_phone';
        if(!$param['phone']||!$param['sms_code']||!$param['open_id']||!$param['access_token']||!$param['open_type'] ||!$param['union_id']){
            return false;
        }
		//获取绑定来源
		if (!empty($param['wechat_id']) && $param['wechat_id']>0) {
			//场馆公众号来源标识为 unionwx_加上微信管理后台对应的微信id
			$param['union_source'] = 'unionwx_'.$param['wechat_id'];
		}
		else {
			if (!isset($param['union_source']) || !empty($param['union_source'])) {
				$param['union_source'] = "qydapp";
				if ($param['open_type'] == 'wx') {
					$param['union_source'] = "qydwx";//趣运动微信来源标识
				}
			}
		}
		unset($param['wechat_id']);
		$param['client_time'] = CURRENT_TIMESTAMP;
        $param['api_sign'] = self::sign($param);
		$url = self::UserApiUrl . 'union?' . http_build_query($param);
        return self::request(self::UserApiUrl.'union?'.http_build_query($param),self::LOGTITLE);
    }

    /**
     * 绑定手机（重新绑定）
     * @param array $param
     * @return boolean|string
     */
    public static function bindPhone(array $param){
    	if($param['user_id']<1 || !$param['phone'] || !$param['password'] || !$param['sms_code']){
    		return false;
    	}
    	$param['action'] = 'bind_phone';
    	$param['ver'] = '1.6';
    	$param = self::addPublicParam($param);
    	return self::request(self::UserApiUrl.'user?'.http_build_query($param),self::LOGTITLE);
    }

	/**
	 * @param $param
	 * @return bool|string
	 * 解除绑定
	 */
	public static function unionRemove($param){
		$param['action'] = 'union_remove';
		if(!$param['user_id']||!$param['open_type']){
			return false;
		}
		//获取绑定来源
		if (!empty($param['wechat_id']) && $param['wechat_id']>0) {
			//场馆公众号来源标识为 unionwx_加上微信管理后台对应的微信id
			$param['union_source'] = 'unionwx_'.$param['wechat_id'];
		} else {
			//趣运动微信来源标识
			$param['union_source'] = "qydwx";
		}
		unset($param['wechat_id']);
		$param['client_time'] = CURRENT_TIMESTAMP;
		$param['api_sign'] = self::sign($param);
		baf_Common::log('unbind_wx', 'INFO', 'unbind_wx_params', $param);

		$url = self::UserApiUrl . 'union?' . http_build_query($param);
		return self::request(self::UserApiUrl.'union?'.http_build_query($param),self::LOGTITLE);
	}
	/**
	 * 设置密码
	 *
	 * @param array $param 参数数组
	 *
	 * @return mixed
	 */
	public static function setPassword(array $param)
	{
		if (!$param['user_id'] || !$param['password']) {
			return '0060';
		}

		$param['action'] = 'set_password';
		$param = self::addPublicParam($param);

		return self::request(self::UserApiUrl . 'user?' . http_build_query($param), self::LOGTITLE);
	}

	/**
	 * 获取手机验证码
	 * @param array $param
	 * @return string
	 */
	public static function getSmsCode(array $param){
		$hashCookie = api_CoreHelper::getCookie('hash');
		if(!$param['phone'] || !$param['type'] || !$hashCookie){
			return '0060';
		}
		$param['action'] = 'get_sms_code';
		$param = self::addPublicParam($param);
		return self::request(self::QydApiUrl.http_build_query($param),self::LOGTITLE);
	}
	
	/**
	 * 重设用户密码
	 * @param array $param
	 * @return string
	 */
	public static function reSetPassword(array $param){
		if(!$param['phone'] || !$param['password'] || !$param['sms_code']){
			return '0060';
		}
		$param['action'] = 'reset_password';
		$param['ver'] = '1.6';
		$param = self::addPublicParam($param);
		return self::request(self::UserApiUrl . 'user?' . http_build_query($param), self::LOGTITLE);
	}
	
	/**
	 * 我的主页
	 * @param array $param
	 */
	public static function myHome(array $param){
		if($param['user_id']<1){
			return false;
		}
		$param['action'] = 'my_home';
		$param = self::addPublicParam($param);
		return self::request(self::UserApiUrl . 'user?' . http_build_query($param), self::LOGTITLE);
	}
	
	/**
	 * 获取用户未读消息数
	 * @param array $param
	 * @return boolean
	 */
	public static function getMessageCountList(array $param){
		if($param['user_id']<1){
			return false;
		}
		$param['action'] = 'get_other_message_count_list';
		$param['ver'] = '1.1';
		$param = self::addPublicParam($param);
		return self::request(self::getNewApiUrl().'index?'.http_build_query($param),self::LOGTITLE);
	}
	
	/**
	 * 收藏列表－场馆
	 * @param array $param
	 */
	public static function favoriteList(array $param){
		if($param['user_id']<1){
			return false;
		}
		$param['action'] = 'favorite_list';
		$param = self::addPublicParam($param);
		return self::request(self::UserApiUrl . 'user?' . http_build_query($param), self::LOGTITLE);
	}
	
	/**
	 * 加入收藏－场馆
	 * @param array $param
	 * @return boolean|string
	 */
	public static function addFavorite(array $param){
		if($param['user_id']<1 || $param['business_id']<1 || $param['category_id']<1){
			return false;
		}
		$param['action'] = 'add_favorite';
		$param = self::addPublicParam($param);
		return self::request(self::UserApiUrl . 'user?' . http_build_query($param), self::LOGTITLE);
	}
	
	
	/**
	 * 移除收藏－场馆
	 * @param array $param
	 * @return boolean|string
	 */
	public static function removeFavorite(array $param){
		if($param['user_id']<1 || $param['business_id']<1 || $param['category_id']<1){
			return false;
		}
		$param['action'] = 'remove_favorite';
		$param = self::addPublicParam($param);
		return self::request(self::UserApiUrl . 'user?' . http_build_query($param), self::LOGTITLE);
	}
	
	/**
	 * 用户余额使用记录
	 * @param array $param
	 */
	public static function userMoneyLog(array $param){
		if($param['user_id']<1) return false;
		$param['action'] = 'get_user_money_log';
		$param = self::addPublicParam($param);
		return self::request(self::UserApiUrl . 'user?' . http_build_query($param), self::LOGTITLE);
	}
	
	/**
	 * 绑定第三方帐号
	 * @param array $param
	 * @return boolean|string
	 */
	public static function unionBind(array $param){
		if($param['user_id']<1 || empty($param['open_id']) || empty($param['open_type']) || empty($param['access_token'])) return false;
		$param['action'] = 'union_bind';
		//获取绑定来源
		if (!empty($param['wechat_id']) && $param['wechat_id']>0) {
			//场馆公众号来源标识为 unionwx_加上微信管理后台对应的微信id
			$param['union_source'] = 'unionwx_'.$param['wechat_id'];
		} else {
			if (!isset($param['union_source']) || !empty($param['union_source'])) {
				$param['union_source'] = "qydapp";
				if ($param['open_type'] == 'wx') {
					$param['union_source'] = "qydwx";//趣运动微信来源标识
				}
			}
		}
		$param = self::addPublicParam($param);
		return self::request(self::UserApiUrl . 'union?' . http_build_query($param), self::LOGTITLE);
	}


	/**
	 * des加密
	 */
	public static function desEncrypt($data){
		if(!$data ) return false;
		$des = new baf_Des();
		$data = $des->encrypt($data);
		return $data;
	}

	/**
	 * 验证支付密码
	 */
	public static function verifyPaypassword(array $param){
		if($param['user_id'] < 1 || !$param['password'] ) return false;
		$param['action'] = 'verify_pay_password';
		$param = self::addPublicParam($param);
		return self::request(self::NewpayApiUrl . 'paypassword?'.http_build_query($param), self::LOGTITLE);
	}

	/**
	 * 设置支付密码
	 */
	public static function setPaypassword(array $param){
		if($param['user_id'] < 1 || !$param['password'] ) return false;
		$param['action'] = 'set_pay_password';
		$param = self::addPublicParam($param);
		return self::request(self::NewpayApiUrl . 'paypassword?'.http_build_query($param), self::LOGTITLE);
	}

	/**
	 * 更新支付密码
	 */
	public static function updatePaypassword(array $param){
		if($param['user_id'] < 1 || !$param['pay_old_password'] || !$param['pay_new_password']) return false;
		$param['action'] = 'update_pay_password';
		$param = self::addPublicParam($param);
		return self::request(self::NewpayApiUrl . 'paypassword?'.http_build_query($param), self::LOGTITLE);
	}

	/**
	 * 找回支付密码
	 */
	public static function resetPaypassword(array $param){
		if($param['user_id'] < 1 || !$param['pay_new_password'] || !$param['sms_code'] || !$param['phone']) return false;
		$param['action'] = 'reset_pay_password';
		$param = self::addPublicParam($param);
		return self::request(self::NewpayApiUrl . 'paypassword?'.http_build_query($param), self::LOGTITLE);
	}

	/**
	 *储蓄金额充值
	 */
	public static function rechargeDebitcard(array $param){

		if($param['user_id'] < 1 || !$param['password'] ) return false;
		$param['action'] = 'recharge_debit_card';
		$param = self::addPublicParam($param);
		return self::request(self::TicketApiUrl . http_build_query($param), self::LOGTITLE);
	}

	/**
	 * 获取用户绑定信息
	 *
	 * @param array $param
	 *
	 * @return string|Ambigous <string, mixed>
	 */
	public static function getUserWechatInfo($param)
	{
		if (empty($param['user_id']) && empty($param['wechat_id'])) {
			return '0024';
		}
		$param['action'] = 'get_user_openinfo';
		$param = self::addPublicParam($param);
		$url = self::UserApiUrl . 'union?' . http_build_query($param);
		return self::request(self::UserApiUrl . 'union?' . http_build_query($param), self::LOGTITLE);
	}
	

	/**
     * @param $param
     * @return bool|string
     * 通用第三方帐号绑定
     */
    public static function commonUnionBind($param){
        $param['action'] = 'union_phone';
        if(!$param['phone']||!$param['sms_code']||!$param['open_id']||!$param['access_token']||!$param['open_type']){
            return false;
        } else {
			if (empty($param['union_source'])) {
				$param['union_source'] = "qydapp";
			}
		}
		$param['client_time'] = CURRENT_TIMESTAMP;
        $param['api_sign'] = self::sign($param);
		$url = self::UserApiUrl . 'union?' . http_build_query($param);
        return self::request(self::UserApiUrl.'union?'.http_build_query($param),self::LOGTITLE);
    }

    /**
     * 通用解除绑定
     */
    public static function commonUnionRemove($param){
		$param['action'] = 'union_remove';
		if(!$param['user_id']||!$param['open_type']){
			return false;
		}
		//获取绑定来源
		if (empty($param['union_source'])) {
			$param['union_source'] = "qydapp";
		}
		$param['client_time'] = CURRENT_TIMESTAMP;
		$param['api_sign'] = self::sign($param);	

		$url = self::UserApiUrl . 'union?' . http_build_query($param);
		baf_Common::log('commonUnionRemove', 'INFO', 'info', array('param'=>$param, 'url'=>$url));
		return self::request(self::UserApiUrl.'union?'.http_build_query($param),self::LOGTITLE);
	}
	
	/**
	 * 获取用户信息列表
	 *
	 * @param array $param
	 *
	 * @return string|Ambigous <string, mixed>
	 */
	public static function useridToInfo($param)
	{
		if(empty($param)){
			return '0024';
		}

		$param['action']	= 'userid_to_info';
		$param = self::addPublicParam($param);
		return self::request(self::UserApiUrl.'user?'.http_build_query($param),self::LOGTITLE);
	}

	/**
	 * 更新个人信息
	 * @param array $param
	 * @return string|Ambigous <string, mixed>
	 */
	public static function updateUserInfo($param){
		if(empty($param['user_id'])){
			return '0024';
		}
	
		$param['action']	= 'update_user_info';
		$param = self::addPublicParam($param);
		return self::request(self::UserApiUrl.'user?'.http_build_query($param),self::LOGTITLE);
	}

	/**
	 * 根据user_id获取绑定的手Q钱包的openid
	 * @param  [type] $param [description]
	 * @return [type]        [description]
	 */
	public static function getOpenidByUserId($param)
	{
		$param['action'] = 'userid_by_openid';
		$param['client_time'] = CURRENT_TIMESTAMP;
        $param['api_sign'] = self::sign($param);
		$url = self::UserApiUrl . 'union?' . http_build_query($param);
        return self::request(self::UserApiUrl.'union?'.http_build_query($param),self::LOGTITLE);
	}

	/**
	 * 收货地址列表
	 * @param  [type] $userId [description]
	 * @return [type]         [description]
	 */
	public static function deliveryAddress($userId){
		$param['user_id'] = $userId;
		$param['action'] = 'delivery_address';
		$param = self::addPublicParam($param);
		$url = self::UserApiUrl.'userdelivery?'.http_build_query($param);
		return self::request($url, self::LOGTITLE);
	}

	/**
	 * 添加收货地址
	 * @param [type] $param [description]
	 */
	public static function addDeliveryAddress($param){
		$param['action'] = 'add_delivery_address';
		$param = self::addPublicParam($param);
		$url = self::UserApiUrl.'userdelivery?'.http_build_query($param);
		return self::request($url, self::LOGTITLE);
	}
	
	/**
	 * 编辑收货地址
	 * @param [type] $param [description]
	 */
	public static function updateDeliveryAddress($param){
		$param['action'] = 'update_delivery_address';
		$param = self::addPublicParam($param);
		$url = self::UserApiUrl.'userdelivery?'.http_build_query($param);
		return self::request($url, self::LOGTITLE);
	}

	/**
	 * 删除收货地址
	 * @param [type] $param [description]
	 */
	public static function removeDeliveryAddress($param){
		$param['action'] = 'remove_delivery_address';
		$param = self::addPublicParam($param);
		$url = self::UserApiUrl.'userdelivery?'.http_build_query($param);
		return self::request($url, self::LOGTITLE);
	}
}