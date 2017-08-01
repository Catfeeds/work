<?php
class api_Court extends api_Base {
	const LOGTITLE = 'Court_api';
	
	/**
	 * 场馆API请求
	 * 
	 * @param unknown $param = array(
	 * 		'action' => 'xxx',
	 * 		'user_id'=> xxx
	 * )
	 * @return Ambigous <string, mixed>
	 */
	public static function venusApiPut( $param ){
		try {
			if (!isset($param['action']) || empty($param['action'])) return false;
			
			$data = array();
			$param = self::addPublicParam($param);
			$res = self::request(self::VenueApiUrl.http_build_query($param), self::LOGTITLE);
			if(isset($res['status']) && $res['status']=='0000'){
				$data = isset($res['data']) ? $res['data'] : array();
			}
			return $data;
		}
		catch (Exception $e){
			throw new Exception( $e->getMessage() );
		}
	}

	/**
	 * API请求[已废弃]
	 *
	 * @param unknown $param = array(
	 * 		'action' => 'xxx',
	 * 		'user_id'=> xxx
	 * )
	 * @return Ambigous <string, mixed>
	 */
	public static function qydApiPut( $param ){
		try {
			if (!isset($param['action']) || empty($param['action'])) return false;
			//$param['action'] = 'get_court_pool_list';
			$param = self::addPublicParam($param);
			return self::request(self::QydApiUrl.http_build_query($param), self::LOGTITLE);
		}
		catch (Exception $e){
			throw new Exception( $e->getMessage() );
		}
	}

	/**
	 * 用户API请求
	 *
	 * @param unknown $param = array(
	 * 		'action' => 'xxx',
	 * 		'user_id'=> xxx
	 * )
	 * @return Ambigous <string, mixed>
	 */
	public static function userApiPut( $param ){
		try {
			if (!isset($param['action']) || empty($param['action'])) return false;
			//$param['action'] = 'get_court_pool_list';
			$param = self::addPublicParam($param);
			return self::request(self::UserApiUrl.http_build_query($param), self::LOGTITLE);
		}
		catch (Exception $e){
			throw new Exception( $e->getMessage() );
		}
	}

	/**
	 * 订单API请求
	 *
	 * @param unknown $param = array(
	 * 		'action' => 'xxx',
	 * 		'user_id'=> xxx
	 * )
	 * @return Ambigous <string, mixed>
	 */
	public static function orderApiPut( $param ){
		try {
			if (!isset($param['action']) || empty($param['action'])) return false;
			//$param['action'] = 'get_court_pool_list';
			$param = self::addPublicParam($param, api_Base::ORDER_API_KEY);
			return self::request(self::OrderApiUrl.http_build_query($param), self::LOGTITLE);
		}
		catch (Exception $e){
			throw new Exception( $e->getMessage() );
		}
	}
	
	
	
	
	
	
	
	
	
	/**
	 * 读取首页信息
	 * @param array $param
	 * @return string|Ambigous <string, mixed>
	 */
	public static function getIndex($param){
		if($param['city_id'] < 0){
			return '0024';
		}
		self::$writeLog = 0;
		$param['action']	= 'get_index';
		$param = self::addPublicParam($param);
		return self::request(self::QydApiUrl.http_build_query($param), self::LOGTITLE);
	}

    /**
     * 获取推荐场馆列表
     * @param $param
     * @return string
     */
	public static function getIndexVenues($param){
		if($param['city_id']<0){
			return '0024';
		}

		$cacheKey = 'm.quyundong:index_venues:'.$param['city_id'];
		if(!empty($param['user_id'])) $cacheKey .= '_'.$param['user_id'];
		$redis = baf_Redis::factory();
		$res = $redis->get($cacheKey);
		
		if(!$res){
			self::$writeLog = 0;
			$param['action'] = 'get_index_venue_list';
	        $param = self::addPublicParam($param);
	        $res = self::request(self::VenueApiUrl.http_build_query($param),self::LOGTITLE);
	        if(!empty($res['status']) && $res['status']=='0000'){
	        	$redis->set($cacheKey, json_encode($res), 600);
	        }
		}else{
			$res = json_decode($res, true);
		}
		
        return $res;
	}

	/**
	 * 获取场馆推荐列表
	 */
	public static function getWebBusinessList($param){
		if($param['city_id']<0){
			return '0024';
		}
		self::$writeLog = 1;
		$param['action'] = 'get_web_business_list';
		$param = self::addPublicParam($param);
		return self::request(self::VenueApiUrl.http_build_query($param),self::LOGTITLE);
	}
	
	/**
	 * 获取城市接口
	 * @param unknown $param
	 * @return mixed
	 */
	public static function cities($param){
		$open_city_key = '7yundong:cityListWap';
		//按渠道显示城市，add by chenchao 2016-10-26
		if(isset($param['channel_source']) && !empty($param['channel_source'])){
			$open_city_key .= ':'.$param['channel_source'];
		}
		$redis = baf_Redis::factory();
		$cities = unserialize($redis->get($open_city_key));
		 
		if(!$cities){
			$param['action'] = 'cities';
			$param = self::addPublicParam($param);
			$res = self::request(self::QydApiUrl.http_build_query($param),self::LOGTITLE);
			if(isset($res['status']) && $res['status'] == baf_ResCode::SUCCESS){
				//城市列表缓存 时间改为一个小时 Modify by chenchao 2016-10-26
				$cities = $res['cities'];
				$redis->set($open_city_key, serialize($cities), 60*60);
			}
		}
		return $cities;
	}
	
	
	/**
	 * 添加推广记录
	 * @param business_id int 场馆ID
	 * @param category_id 项目分类
	 * @param suppliers_admin_id 推广管理员ID
	 * @author chenchao
	 */
	public static function addSpreadLog($param){
		if($param['category_id'] < 0 || $param['business_id'] < 0 || $param['supplier_admin_id'] < 0){
			return '0024';
		}
		$param['action']	= 'add_spread_log';
		$param = self::addPublicParam($param);
	
		return self::request(self::QydApiUrl.http_build_query($param), self::LOGTITLE);
	}
	
	
	/**
	 * 获取场馆相册
	 *
	 * 注意:
	 *    相册数据集合中的第一条记录为场馆的主图(即: gs_venues表中的image_url图片)
	 *    如果有分页的话， 第1页的第1条记录为场馆的主图
	 *
	 * @param array $param 参数数组
	 *
	 * @return array 成功返回api文档指定返回值，失败返回array('status'=>异常代码,'data'=>结果集,'msg'=>结果描述信息)
	 * @author xiaosibo
	 */
	public static function getCourtGallery(array $param)
	{
		// 检验数据
		if ($param['business_id'] < 1) {
			return '0024';
		}
		 
		self::$writeLog = 1;
		 
		$param['action']	= 'get_businesse_gallery';
		$param = self::addPublicParam($param);
		 
		return self::request(self::VenueApiUrl.http_build_query($param), self::LOGTITLE);
	}
	
	
	/**
	 * 场馆详情
	 * @param array $param
	 * @return string
	 */
	public static function groundInfo($param){
		//检验密码
		if($param['category_id'] < 0 || $param['business_id'] < 0){
			return '0024';
		}
		$param['action']	= 'get_venues_detail';
		$param = self::addPublicParam($param);
	
		return self::request(self::VenueApiUrl.http_build_query($param), self::LOGTITLE);
	}
	
	
	/**
	 * 按日查询场地预订数据剩余数量
	 * @param category_id int 场馆ID
	 * @param book_date 预订日期
	 * @param category_id 分类ID
	 * @author chenchao
	 */
	public static function getBookingSum($param){
		if($param['category_id'] < 0 || $param['business_id'] < 0){
			return '0024';
		}
		self::$writeLog = 0;
		$param['action']	= 'get_booking_sum';
		$param = self::addPublicParam($param);
	
		return self::request(self::VenueApiUrl.http_build_query($param), self::LOGTITLE);
	}
	
	
	
	/**
	 * 获取场馆列表---默认返回10个
	 * @param unknown $param
	 * @return string|Ambigous <string, mixed>
	 */
	public static function groundList($param){
		//检验密码
		if($param['city_id'] < 0 || $param['category_id'] < 0 ){
			return '0024';
		}
		self::$writeLog = 0;
		$param['action'] = 'get_businesses';
		$param = self::addPublicParam($param);
		return self::request(self::VenueApiUrl.http_build_query($param), self::LOGTITLE);
	}
	
	
	/**
	 * 按日查询预订场地 1.8
	 * @param unknown $param
	 * @return string|Ambigous <string, mixed>
	 */
	public static function getVenueBookingDate($param){
		if($param['category_id'] < 0 || $param['business_id'] < 0){
			return '0024';
		}
		self::$writeLog = 0;
		$param['action']	= 'get_venue_booking_date';
		$param = self::addPublicParam($param);
		return self::request(self::VenueApiUrl.http_build_query($param), self::LOGTITLE);
	}
	
	
	/**
	 * 查询特惠的详情
	 * @param array $param
	 * @return string
	 */
	public static function getPersonInfo($param){
		if($param['goods_id'] < 0){
			return '0024';
		}
		self::$writeLog = 0;
		$param['action']	= 'get_person_info';
		$param = self::addPublicParam($param);
	
		return self::request(self::VenueApiUrl.http_build_query($param), self::LOGTITLE);
	}
	
	
	/**
	 * 通过场馆ID获取场馆信息
	 * @param unknown $venuesCatId
	 * @return string|Ambigous <string, mixed>
	 */
	public static function getVenueCategoryInfo($param){
		if($param['venues_cat_id'] < 1){
			return '0024';
		}
		self::$writeLog = 0;
		$param['action']	= 'get_venuecategory_info';
		$param = self::addPublicParam($param);
		return self::request(self::VenueApiUrl.http_build_query($param), self::LOGTITLE);
	}
	
	/**
	 * 获取拼场列表
	 * @param unknown $param
	 * @return string
	 */
	public static function getCourtPoolList($param){
		$param['action'] = 'get_court_pool_list';
		$param = self::addPublicParam($param);
		return self::request(self::VenueApiUrl.http_build_query($param), self::LOGTITLE);
	}
	
	/**
	 * 获取拼场详情
	 * @param unknown $param
	 */
	public static function getCourtPoolInfo($param){
		$param['action'] = 'get_court_pool_info';
		$param = self::addPublicParam($param);
		return self::request(self::VenueApiUrl.http_build_query($param), self::LOGTITLE);
	}

	/**
	 * 搜索场馆
	 * @param $param
	 * @return bool|string
	 */
	public static function searchBusiness($param){
		if(!isset($param['search_text'])||!$param['search_text']){
			return false;
		}
		$param['action'] = 'search_businesses';
		$param = self::addPublicParam($param);
		return self::request(self::VenueApiUrl.http_build_query($param), self::LOGTITLE);
	}
	/**
	 * 评论列表
	 * @param $param
	 * @return bool|string
	 */
	public static function getComments($param){
		if (!isset($param['business_id']) || !$param['business_id']) {
			return false;
		}
		$param['action'] = 'get_comments';
		$param = self::addPublicParam($param);
		return self::request(self::QydApiUrl . http_build_query($param), self::LOGTITLE);

	}

	/**
	 * 获取热门圈子
	 *
	 * @param $param
	 *
	 * @return bool| string
	 */
	public static function hot_topic($param)
	{
		if (!isset($param['venues_id']) || !$param['venues_id']) {
			return false;
		}
		$param['action'] = 'hot_topic';
		$param = self::addPublicParam($param);
		return self::request(self::ForumApiUrl . http_build_query($param), self::LOGTITLE);
	}

	/**
	 * 获取附近的停车场
	 *
	 * @param $param
	 *
	 * @author dxw
	 */

	public static function getParkList($param)
	{
		if (!isset($param['business_id']) || !$param['business_id']) {
			return false;
		}
		$param['action'] = 'get_business_park_list';
		$param = self::addPublicParam($param);
		return self::request(self::VenueApiUrl . http_build_query($param), self::LOGTITLE);
	}

	/**
	 * 获取拼场配置
	 * @return string
	 */
	public static function getCourtPoolSetting(){
		$param['action'] = 'get_court_pool_setting';
		$param = self::addPublicParam($param);
		return self::request(self::VenueApiUrl . http_build_query($param), self::LOGTITLE);
	}

	/**
	 * 获取场馆列表筛选分类
	 *
	 * @return string
	 */
	public static function getCate()
	{
		$param['action'] = 'get_cate';
		$param = self::addPublicParam($param);
		$url = self::VenueApiUrl . http_build_query($param);
		return self::request(self::VenueApiUrl.http_build_query($param), self::LOGTITLE);
	}
}