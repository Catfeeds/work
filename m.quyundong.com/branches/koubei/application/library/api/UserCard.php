<?php
/**
 * 用户场馆会员卡api
 *
 * @author xiaosibo
 * @date 2015-04-21
 */
class api_UserCard extends api_Base
{
	const LOGTITLE = 'user_card_api';
	
	/**
	 * 获取会员卡列表
	 *
	 * @param array $param 参数数组
	 * @return string|array
	 * @author xiaosibo
	 */
	public static function getCardList(array $param)
	{
		// 检验参数
		if ($param['user_id'] < 1 || !$param['phone'] || !api_CoreHelper::isMobile($param['phone'])) {
			return '0060';
		}
	
		$param['action'] = 'get_card_list';
		$param = self::addPublicParam($param);
		return self::request( self::UserApiUrl.'usercard?'.http_build_query($param), self::LOGTITLE);
		//return self::request(self::UserCardApiUrl.http_build_query($param), self::LOGTITLE);
	}
	
	
	/**
	 * 获取会员卡详情
	 *
	 * @param array $param 参数数组
	 * @return string|array
	 * @author xiaosibo
	 */
	public static function getCardDetail(array $param)
	{
		// 检验会员卡号
		if (!$param['card_no']) {
			return '0060';
		}
	
		$param['action'] = 'get_card_detail';
		$param = self::addPublicParam($param);
		return self::request( self::UserApiUrl.'usercard?'.http_build_query($param), self::LOGTITLE);
		//return self::request(self::UserCardApiUrl.http_build_query($param), self::LOGTITLE);
	}
	
	
	/**
	 * 绑定会员卡
	 *
	 * @param array $param 参数数组
	 * @return string|array
	 * @author xiaosibo
	 */
	public static function cardBind(array $param)
	{
		// 检验会员卡号
		if (!$param['card_no'] || $param['user_id'] < 1 || !$param['phone'] || !api_CoreHelper::isMobile($param['phone'])) {
			return '0060';
		}
		 
		$param['action'] = 'card_bind';
		$param = self::addPublicParam($param);
		 
		return self::request(self::UserCardApiUrl.http_build_query($param), self::LOGTITLE);
	}

	/**
	 * @param array $param
	 * @return bool|string
	 */
	public static function cardConsume(array $param){
		if(!$param['user_id']||!$param['venue_id']||!$param['card_no']){
			return false;
		}
		$param['action'] = 'card_consume';
		$param = self::addPublicParam($param);
		$url = self::UserCardApiUrl.http_build_query($param);
		return self::request(self::UserCardApiUrl.http_build_query($param), self::LOGTITLE);
	}
}