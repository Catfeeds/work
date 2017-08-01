<?php
//coachAPI
class api_Coach extends api_Base {
	
	public static $action='';
	public static $api_sign='';	
	const LOGTITLE = 'coach_api';
	
	const COACHAPIHOST = COACH_API_HOST;
	
	//获取邀请列表接口
	public static function rewardList($param){
		//检验用户id
		if($param['user_id'] < 1 ){
			return '0060';
		}
		$param['action']	= 'coach_reward_list';
		$param['client_time'] = CURRENT_TIMESTAMP;
		$param['utm_medium'] = 'wap';
	
		$param['api_sign']	= self::sign($param);
		return self::request(self::COACHAPIHOST.'coach?'.http_build_query($param),self::LOGTITLE);
	}	

	//获取订单奖励列表接口
	public static function orderRewardInfo($param){
		//检验用户id
		if($param['coach_id'] < 1 ){
			return '0060';
		}
		$param['action']	= 'coach_order_reward_info';
		$param['client_time'] = CURRENT_TIMESTAMP;
		$param['utm_medium'] = 'wap';
	
		$param['api_sign']	= self::sign($param);
		return self::request(self::COACHAPIHOST.'order?'.http_build_query($param),self::LOGTITLE);
	}


	//获取订单奖励列表接口
	public static function inviteCodeRegister($param){
		//检验用户id
		if(empty($param['phone'])){
			return '0060';
		}
		$param['action']	= 'invite_code_register';
		$param['client_time'] = CURRENT_TIMESTAMP;
		$param['utm_medium'] = 'wap';
	
		$param['api_sign']	= self::sign($param);
		return self::request(self::COACHAPIHOST.'coach?'.http_build_query($param),self::LOGTITLE);
	}
	
	//获取教练可预约时间
	public static function CoachBespeakTime($param){
	    //检验用户id
	    if($param['coach_id'] < 1 ){
	        return '0060';
	    }
	    $param['action']	= 'get_coach_bespeak_time';
	    $param['client_time'] = CURRENT_TIMESTAMP;
	    $param['utm_medium'] = 'wap';
	
	    $param['api_sign']	= self::sign($param);
	
	    return self::request(self::COACHAPIHOST.'coach?'.http_build_query($param),self::LOGTITLE);
	}
	
	//获取教练详情信息
	public static function GetCoachPreview($param){
	    //检验用户id
	    if($param['user_id'] < 1 ){
	        return '0060';
	    }
	    $param['action']	= 'get_coach_info';
	    $param['client_time'] = CURRENT_TIMESTAMP;
	    $param['utm_medium'] = 'wap';
	
	    $param['api_sign']	= self::sign($param);
	
	    return self::request(self::COACHAPIHOST.'coach?'.http_build_query($param),self::LOGTITLE);
	}
	
}
