<?php
/**
 * 商家api
 * 
 */
class api_Meapi extends api_Base
{
    /**
     * 日志标题
     * 
     * @var string
     */
	const LOGTITLE = 'meapi';
	
	/**
	 * 增加新推广记录
	 * @param array $param 参数数组
	 * @return string|array
	 */
	public static function addSpreadLogNew(array $param)
	{
		$param['action']	= 'add_spread_log_new';
		$param = self::addPublicParam($param);	
		return self::request(ME_API.http_build_query($param), self::LOGTITLE);
	}

	/**
	 * 取推广记录
	 */
	public static function getSpreadLogNew(array $param)
	{
		if(empty($param['id'])){
			return '0024';
		}
		$param['action']	= 'get_spread_log_new';
		$param = self::addPublicParam($param);
		return self::request(ME_API.http_build_query($param), self::LOGTITLE);
	}

	/**
	 * 更新点击数
	 */
	public static function updateSpreadLogNew(array $param)
	{
		if(empty($param['id'])){
			return '0024';
		}
		
		$param['action']	= 'update_spread_log_new';
		$param = self::addPublicParam($param);
		return self::request(ME_API.http_build_query($param), self::LOGTITLE);
	}

	
}

	
	

