<?php
class api_Pay extends api_Base
{
	const LOGTITLE = 'pay_api';
	const ApiUrl = NEWPAY_API;
	
	/**
	 * 会员卡支付
	 *
	 * @param array $param 参数数组
	 * @return string|array
	 */
	public static function vipPay(array $param)
	{
		if ($param['user_id'] < 1
				|| !$param['order_id']
				|| !$param['pay_id']
				|| !$param['card_no']
		) {
			return '0060';
		}
	
		$param['action'] = 'user_card_pay';
		$param = self::addPublicParam($param);
	
		return self::request(self::ApiUrl.'index?'.http_build_query($param),self::LOGTITLE);
	}
	
	
	/**
	 * 第三方支付
	 *
	 * @param array $param 参数数组
	 * @return string|array
	 */
	public static function pay(array $param)
	{
		if ($param['user_id'] < 1 || !$param['order_id'] || !$param['pay_id']) {
			return '0060';
		}
	
		$param['action'] = 'pay_request';
		$param = self::addPublicParam($param);
		return self::request(self::ApiUrl.'index?'.http_build_query($param),self::LOGTITLE);
	}

	public static function checkPayPassword(array $param)
	{
		if($param['user_id']<1){
			return false;
		}

		$param['action'] = 'check_pay_password';
		$param = self::addPublicParam($param);
		return self::request(self::ApiUrl.'paypassword?'.http_build_query($param),self::LOGTITLE);
	}
}