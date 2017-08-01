<?php
//代金券API
class api_Coupon extends api_Base {
	
	public static $action='';
	public static $api_sign='';	
	const LOGTITLE = 'coupon_api';
	
	/**
	 * 代金券列表接口 1.8
	 * @param unknown $param
	 * @return string|Ambigous <string, mixed>
	 */
	public static function getCouponList($param){
		//检验用户id
		if($param['user_id'] < 1 ){
			return '0060';
		}
		$param['action'] = 'ticket_list';
		$param['utm_medium'] = api_CoreHelper::IsWenXinBrowser() ? 'weixin' : 'wap';
		$param = self::addPublicParam($param);
	    return self::request(self::TicketApiUrl.http_build_query($param),self::LOGTITLE);
	}
	/**
	 * 代金券列表接口 1.8
	 * @param unknown $param
	 * @return string|Ambigous <string, mixed>
	 */
	public static function getCouponListNew($param){
		//检验用户id
		if($param['user_id'] < 1 ){
			return '0060';
		}
		$param['action'] = 'ticket_list';
		$param['utm_medium'] = api_CoreHelper::IsWenXinBrowser() ? 'weixin' : 'wap';
		$param = self::addPublicParam($param, self::ORDER_API_KEY);
		return self::request(Config::get('api.order').'ticket?'.http_build_query($param),self::LOGTITLE);
	}
	/**
	 * 获取过期运动券
	 * @param unknown $param
	 * @return string|Ambigous <string, mixed>
	 */
	public static function getExpireList($param){
		if($param['user_id'] < 1 ){
			return '0060';
		}
		$param['action'] = 'expire_ticket_list';
		$param = self::addPublicParam($param);
		return self::request(self::TicketApiUrl.http_build_query($param),self::LOGTITLE);
	}
	
	//获取代金券列表接口
	public static function couponList($param){
		//检验用户id
		if($param['user_id'] < 1 ){
			return '0060';
		}
		$param['action'] = 'get_coupon_list';
		$param = self::addPublicParam($param);
	    return self::request(self::QydApiUrl.http_build_query($param),self::LOGTITLE);
	}

	//获取过期和已使用代金券列表接口
	public static function expireCouponList($param){
		//检验用户id
		if($param['user_id'] < 1 ){
			return '0060';
		}
		$param['action'] = 'expire_coupon_ticket_list';
		$param = self::addPublicParam($param);
		return self::request(Config::get('api.7yundong').'app/coupon?'.http_build_query($param),self::LOGTITLE);
	}

	//激活代金券
	public static function activateCoupon($param){
		//检验用户id
		if($param['user_id'] < 1 || $param['coupon_sn'] < 0){
			return '0060';
		}
		$param['action']	= 'activate_coupon';
		$des = new baf_Des();
		$param['coupon_sn'] = $des->encrypt($param['coupon_sn']);
		$param = self::addPublicParam($param, self::ORDER_API_KEY); 
		return self::request(Config::get('api.order').'ticket?'.http_build_query($param),self::LOGTITLE);
	}
	
	//获取代金券[已废弃]
	public static function getCoupon($param){
	    //检验用户id
	    if(empty($param['open_id'])){
	        return '0060';
	    }
	    $param['action']	= 'send_group_coupon';
	    
	
	    $param = self::addPublicParam($param);
	    return self::request(self::QydApiUrl.http_build_query($param),self::LOGTITLE);
	}
	
	//获取代金券[已废弃]
	public static function bindUserCoupon($param){
	    //检验用户id
	    if(empty($param['phone'])){
	        return '0060';
	    }
	    $param['action']	= 'bind_user_coupon';
	    $param = self::addPublicParam($param);
	    
	    return self::request(self::QydApiUrl.http_build_query($param),self::LOGTITLE);
	}

	//按规则发送
	public static function sendByRule($param)
	{
		if(empty($param['phone'])) {
			return '0060';
		}
        $param['action'] = 'send_coupons';
        $param = self::addPublicParam($param);
        
        return self::request(COUPON_API_URL.http_build_query($param),self::LOGTITLE);
	}
}
