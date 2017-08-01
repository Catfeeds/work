<?php
/**
 * 月卡相关api
 * 
 * @author xiaosibo
 * @date 2015-06-11
 */
class api_MonCard extends api_Base
{
	const LOGTITLE = 'mon_card_api';
	const API_URL  = MON_CARD_API_URL;
	
	/**
	 * 获取课程信息
	 *
	 * @param array $param 参数数组
	 * @return string|array
	 * @author xiaosibo
	 */
	public static function getCourseInfo(array $param)
	{
	    // 检验参数
	    if ($param['course_id'] < 1) {
	        return '0060';
	    }
	
	    $param['action'] = 'course_info';
	    $param = self::addPublicParam($param);
	
	    return self::request(self::API_URL.http_build_query($param), self::LOGTITLE);
	}
	
	/**
	 * 获取mini场馆信息
	 *
	 * @param array $param 参数数组
	 * @return string|array
	 * @author xiaosibo
	 */
	public static function getVenuesMiniInfo(array $param)
	{
	    // 检验参数
	    if ($param['venues_id'] < 1 || $param['category_id'] < 1) {
	        return '0060';
	    }
	
	    $param['action'] = 'venues_mini_info';
	    $param = self::addPublicParam($param);
	
	    return self::request(self::API_URL.http_build_query($param), self::LOGTITLE);
	}
	
	
	
}
