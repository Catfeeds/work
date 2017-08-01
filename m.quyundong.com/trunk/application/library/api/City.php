<?php
/**
 * 城市或地区相关api
 * 
 * @author xiaosibo
 * @date 2015-07-06
 */
class api_City extends api_Base
{
	const LOGTITLE = 'city_api';

	/**
     * 获取城市列表信息
     * 
     * @return array
     */
	public static function cities(){
	    $cacheKey = 'coach_api:open_city_list';
	    $redis = baf_Redis::factory();
	    $citiesData = $redis->get($cacheKey);
	    
	    // 读取缓存
	    if ($citiesData && ($cities = unserialize($citiesData))) {
	        return $cities;
	    }
	   
	    $param = array();
		$param['action'] = 'cities';
		$param = self::setPublicParam($param);
		$param['api_sign'] = self::sign($param);	
		$res = baf_Http::httpGet(self::getApiUrl().http_build_query($param));

		$cities = array();
		if (isset($res['status']) && $res['status'] == '0000') {
		    $cities = $res['cities'];
		    unset($res);
		    $redis->set($cacheKey, serialize($cities));
		    $redis->expire($cacheKey, 86400);  // 设置1天后过期
		}
		return $cities;
	}
	
	/**
	 * 获取开通的城市列表
	 * 
	 * @return array
	 */
	public static function getOpenCityList(){
	    $cities = api_City::cities();
	     
	    $cityList = array();
	    if (!empty($cities)) {
	        foreach ($cities as $key => $val) {
	            $cityList[] = array(
	                    'city_id'   => $val['city_id'],
	                    'city_name' => $val['city_name']
	            );
	        }
	    }
	    return $cityList;
	}
	
	/**
	 * 获取所有城市信息列表
	 * 
	 * @return array
	 */
	public static function getAllCityList(){
	    $cacheKey = 'coach_api:all_city_list';
	    $redis = baf_Redis::factory();
	    $citiesData = $redis->get($cacheKey);
	    
	    // 读取缓存
	    if ($citiesData && ($cities = unserialize($citiesData))) {
	        return $cities;
	    }
	   
	    $param = array();
		$param['action'] = 'get_city_list';
		$param = self::setPublicParam($param);
		$param['api_sign'] = self::sign($param);	
		$res = baf_Http::httpGet(self::getApiUrl().http_build_query($param));

		$cities = array();
		if (isset($res['status']) && $res['status'] == '0000') {
		    $cities = $res['data'];
		    unset($res);
		    $redis->set($cacheKey, serialize($cities));
		    $redis->expire($cacheKey, 86400);  // 设置1天后过期
		}
		return $cities;
	}


	/**
	 * 获取城市下的所有区域
	 * 
	 * @param int $cityId 城市id
	 * @return array
	 */
	public static function getRegionList($cityId)
	{
	    if ($cityId <= 0) {
	        return array();
	    }

		self::$writeLog = 0;
		$param['city_id'] = $cityId;
		$param['action'] = 'get_region_list';
		$param = self::addPublicParam($param);
		return self::request(self::VenueApiUrl . http_build_query($param), self::LOGTITLE);

	}
	
}
