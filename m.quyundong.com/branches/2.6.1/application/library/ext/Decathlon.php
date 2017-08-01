<?php
class ext_Decathlon extends api_Base
{
	const LOGTITLE = 'decathlon_api';
	private static $signKey = '968ae72001f8764ed4c14512536c938d';

	private static function makeSign(array $data){
		$data['salt'] = self::$signKey;
		ksort($data);
		$str = '';
		foreach ($data as $v) {
			$str .= $v;
		}
		$sign = md5($str);
		return $sign;
	}

	/**
	 * 签名校验
	 */
	private static function checkSign(){
		$params = array_merge($_GET,$_POST);
        //begin---校验签名         
        $sign = !empty($params['sign']) ? $params['sign'] : '';   
        unset($params['sign']);
        if(empty($sign) || self::makeSign($params) != $sign){
            return false;
        }
        return true;
	}

	/**
	 * 获取用户信息
	 */
	public static function getMember(){
		if(!empty($_SESSION['_decathlon_user_']) && !isset($_REQUEST['sign']) && !isset($_REQUEST['open_id'])){
			return $_SESSION['_decathlon_user_'];
		}else{
			$data = array(
				'open_id'=> !empty($_REQUEST['open_id']) ? $_REQUEST['open_id'] : '',
				'ts' => !empty($_REQUEST['ts']) ? $_REQUEST['ts'] : '',
				'utm_source' => !empty($_REQUEST['utm_source']) ? $_REQUEST['utm_source'] : '',
				'is_member' => !empty($_REQUEST['isDKTMember']) && strtolower($_REQUEST['isDKTMember'])=='y' ? 1 : 0
			);
			if(!empty($data['open_id']) && self::checkSign()){
				$_SESSION['_decathlon_user_'] = $data;
				return $data;
			}else{
				return null;
			}
		}
	}

	/**
	 * 快捷登录
	 */
	public static function quickLogin(array $param){
		$param['action']	= 'quickLogin';
		$decathlonUser = self::getMember();
        $param['open_id'] = !empty($decathlonUser['open_id']) ? $decathlonUser['open_id'] : '';
        $param['is_member'] = !empty($decathlonUser['is_member']) ? '1' : '0';
        $param['utm_source'] = 'decathlon';
		$param = self::addPublicParam($param);
		$res = self::request(self::UserApiUrl.'ext/decathlon/index?'.http_build_query($param), self::LOGTITLE);
		if(!isset($res['status']) || $res['status']!='0000'){
			baf_Common::log('decathlon_api_error', 'ERR', 'quickLogin', json_encode($res));
		}else{
			if(!empty($res['send_coupon'])) self::setCouponMessage($res['send_coupon']);
		}
		return $res;
	}

	/**
	 * 设置代金券通知消息
	 */
	public static function setCouponMessage($msg){
		return baf_Common::setMessage('尊敬的迪卡侬会员，您已获得一张'.$msg.'，赶快使用吧');
	}
}