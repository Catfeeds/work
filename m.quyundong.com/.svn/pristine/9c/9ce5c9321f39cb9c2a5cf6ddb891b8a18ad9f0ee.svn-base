<?php
class ext_Gagc extends api_Base
{
	const LOGTITLE = 'gagc_api';	
	const GAGCCODEKEY = 'gagc:code:';

	/**
	 * 获取用户信息
	 */
	public static function getMember($phone){
		$result = array(1,array());
		
		//phone=Y6v9TRTGZnugjUkdUl%2Bo7g%3D%3D&utm_source=gagc&code=324sdysd&time=1488265897
		
		$code = isset($_REQUEST['code']) ? trim($_REQUEST['code']) : '';
		$time = isset($_REQUEST['time']) ? trim($_REQUEST['time']) : '';
				
		//检查手机号格式
		if(!baf_Base::is_mobile_new($phone)){
			$result[0] = -1;
			return $result;
		}
		
		//没带code---首次进入---跳转到快捷登录页面
		if(empty($code)){
			$result[0] = 0;
			return $result;
		}
		
		if(self::checkGagcCodeByPhone($code, $phone)){
			$r = self::getUserByPhone(array('phone'=>$phone));
			
			if(isset($r['status']) && $r['status'] == baf_ErrorCode::OK){
				$result[1] = $r['data'];				
			}
			else{
				$result[0] = 3;
			}
		}
		else{
			$result[0] = 2;
		}
		if($result[0] != 1){
			baf_Common::log('gagc_log', 'INFO', 'code', $phone.':'.$code);
		}
		return $result;
	}
	
	//验证手机号和code
	private static function checkGagcCodeByPhone($code,$phone){	
		if(empty($code) || empty($phone)){
			baf_Common::log('gagc_code_error', 'ERR', 'code', $phone.':'.$code);
			return false;
		}
		$redis = baf_Redis::factory();				
		$tmpCode = $redis->get(self::GAGCCODEKEY.$phone);		
		return $code == $tmpCode;
	}
	
	//储存手机号和code
	private static function setGagcCode($code,$phone){		
		$redis = baf_Redis::factory();	
		return $redis->set(self::GAGCCODEKEY.$phone,$code);
	}
	
	
	/**
	 * 通过手机号和code确认用户
	 */
	public static function getUserByPhone(array $param){
		$param['action']	= 'get_user_by_phone';
		$param['utm_medium'] = 'api.open';
		$param['utm_source'] = 'gagc';
		$param = self::addPublicParam($param);
		$res = self::request(self::UserApiUrl.'user?'.http_build_query($param), self::LOGTITLE);
		if(!isset($res['status']) || $res['status'] != baf_ErrorCode::OK){
			baf_Common::log('gagc_api_error', 'ERR', 'get_user_by_phone', json_encode($res));
		}
		return $res;
	}
	

	/**
	 * 快捷登录
	 */
	public static function quickLogin(array $param){
		if(!isset($param['phone'])){
			return false;
		}
		
		$param['action']	= 'quick_login';		
        $param['utm_medium'] = 'api.open';
        $param['utm_source'] = 'gagc';
		$param = self::addPublicParam($param);
		$res = self::request(self::UserApiUrl.'auth?'.http_build_query($param), self::LOGTITLE);
		if(isset($res['status']) && $res['status'] == baf_ErrorCode::OK){
			$code = self::createCode($param['phone']);
			self::setGagcCode($code, $param['phone']);
			api_GagcApi::updateCode($param['phone'], $code);
		}
		else{
			baf_Common::log('gagc_api_error', 'ERR', 'quickLogin', json_encode($res));
		}
		return $res;
	}
	
	/**
	 * 生成验证码
	 */
	public static function createCode($phone){
		return date('ymd').substr($phone,-4).rand(10, 99);
	}

}