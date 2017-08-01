<?php
/**
 * 请求场馆api相关的接口
 * 
 * @author zhuangsheng
 */
class api_VenuesApi extends api_Base
{    
    /**
     * api 秘钥
     * 
     * @var string
     */
    protected $apiKey = '4b111cc14a33b88e37e2e2934f493458';
    
    /**
     * 正式环境的api地址
     *
     * @var string
     */
    protected $apiProductUrl = 'http://venues.api.7yundong.cn/';
    
    /**
     * 开发环境的api地址
     *
     * @var string
     */
    protected $apiDevelopmentUrl = 'http://venues.api.qydw.net/';
  

    /**
     * 按当天取相关场地情况
     * http://venues.api.qydw.net/venues?action=get_booking_goods&book_date=2016-06-29&business_id=10&category_id=1&client_time=1467166266&api_sign=a3cec96ba382d8f0b0dbe3f7399ed909
     *
     * @author bumtime
     * @date 2016-06-29
     * 
     * @param  array $param 参数数组（business_id：场馆ID，category_id：项目分类ID，book_date：默认当天）
     * @return array 接口数据
     */
    public function getBookingGoods($arry)
    {
    	if(!$arry['business_id'] || !$arry['category_id'] || !$arry['book_date']){
			baf_Logger::log2File(__METHOD__.'参数出错' . '，param:'. json_encode($arry), 'Venues_api_error');
			return false;
		}

    	//相关参数
    	$param = [
    			'action'		=>	"get_booking_goods_all",
    			'book_date'		=>	!empty($arry['book_date']) ? $arry['book_date'] : date("Y-m-d"),
    			'business_id'	=>	$arry['business_id'],
    			'category_id'	=>	$arry['category_id'],
    			'utmSource'		=>	$arry['utmSource']
    	];
    
    	$paths = "venues";
		$response = $this->requestGet($param, $paths);
		

		if (!is_array($response) || $response['status'] != '0000') {
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
		}

    	return $response;
    }
    
    
    /**
     * 锁定或解锁场地
     * http://venues.api.qydw.net/venues?locked=1&name=%E5%BC%A0%E4%B8%89&phone=13845698745&action=lock_court&client_time=1467352053&goods_ids=76286832%2C76286833&business_id=10&category_id=1&api_sign=26d76ad293173d982099af2828f9f35b

     *
     * @author bumtime
     * @date 2016-06-29
     *
     * @param  array $param 参数数组（business_id：场馆ID，category_id：项目分类ID，goods_ids：场地商品批量ID，locked:0：解锁  1：锁定）
     * @return array 接口数据
     */
    public function lockCourt($arry)
    {
    	if(!$arry['business_id'] || !$arry['category_id'] || !$arry['goods_ids']){
			baf_Logger::log2File(__METHOD__.'参数出错' . '，param:'. json_encode($arry), 'Venues_api_error');
			return false;
		}
		if($arry['locked'] < 0)
		{
			baf_Logger::log2File(__METHOD__.'参数出错' . '，param:'. json_encode($arry), 'Venues_api_error');
			return false;
		}

    	//相关参数
    	$param = [
    			'action'		=>	"lock_court",
    			'goods_ids'		=>	$arry['goods_ids'],
    			'locked'		=>	$arry['locked'],
    			'business_id'	=>	$arry['business_id'],
    			'category_id'	=>	$arry['category_id']
    	];
    	//非必须参数
    	if(isset($arry['phone']))
    	{
    		$param['phone']			=	$arry['phone'];
    	}
    	if(isset($arry['name']))
    	{
    		$param['name']			=	$arry['name'];  
    	}
    	if(isset($arry['utm_medium']))
    	{
    		$param['utm_medium']	=	$arry['utm_medium'];
    	}    
    	
    	$paths = "venues?";
		$response = $this->requestPost($param, $paths);

		if (!is_array($response) || $response['status'] != '0000') {
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
		}

    	return $response;
    }
    
    /**
     * 按场馆ID获取项目分类分类(商家后台)
     * http://venues.api.qydw.net/Category?action=get_categories_list_by_vid&client_time=1467255755&venues_id=10&api_sign=961b259758db73b1d683962a9103fb6d
     *
     * @author bumtime
     * @date 2016-06-30
     *
     * @param  array $param 参数数组（venues_id：场馆ID）
     * @return array 接口数据
     */
    public function getCategoriesListByVid($arry)
    {
    	if(!$arry['venues_id']){
			baf_Logger::log2File(__METHOD__.'参数出错' . '，param:'. json_encode($arry), 'Venues_api_error');
			return false;
		}
    	 
    	//相关参数
    	$param = [
    			'action'		=>	"get_categories_list_by_vid",
    			'venues_id'		=>	$arry['venues_id']
    	];
    
    	$paths = "Category?";
		$response = $this->requestPost($param, $paths);

		if (!is_array($response) || $response['status'] != '0000') {
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
		}

    	return $response;
    }

	/**
	 * 按天取所有场次打包数据
	 * @param $business_id 场馆ID
	 * @param $category_id 项目分类ID
	 * @param $book_date 日期字符串（如：2015-12-01)
	 */
	public function getGoodsGroupList($business_id, $category_id, $book_date)
	{
		if (!$business_id || !$category_id || !$book_date){
			baf_Logger::log2File(__METHOD__.'参数出错' . '，param:'. json_encode(compact('business_id', 'category_id', 'book_date')), 'Venues_api_error');
			return array();
		}

		$param = array(
			'action'    => 'get_goods_group_list',
			'venues_id' => $business_id,
			'cat_id'    => $category_id,
			'book_date' => $book_date
		);

		$response = $this->requestGet($param, 'Goodsgroup');
		if (!is_array($response)){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response);
		}
		if ($response['status'] != '0000'){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response['msg'], $response['status']);
		}
		return $response['data'];
	}

	/**
	 * 获取场次打包配置列表
	 * @param $business_id 场馆ID
	 * @param $category_id 项目分类ID
	 * @param $week        (0-6 依次为:星期日-星期六 7为节假日)
	 * @return array|mixed
	 * @throws Exception
	 */
	public function getGoodsGroupSettingList($business_id, $category_id, $week = 0)
	{
		if (!$business_id || !$category_id){
			baf_Logger::log2File(__METHOD__.'参数出错' . '，param:'. json_encode(compact('business_id', 'category_id')), 'Venues_api_error');
			return array();
		}

		$param = array(
			'action'    => 'get_goods_group_setting_list',
			'venues_id' => $business_id,
			'cat_id'    => $category_id,
			'week' => $week
		);

		$response = $this->requestGet($param, 'Goodsgroup');
		if (!is_array($response)){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response);
		}
		if ($response['status'] != '0000'){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response['msg'], $response['status']);
		}
		return $response['data'];
	}

	/**
	 * 场次打包
	 * @param $business_id 场馆ID
	 * @param $category_id 项目分类ID
	 * @param $goods_ids 场次goods_id集
	 */
	public function bindGoodsGroup($business_id, $category_id, $goods_ids)
	{
		if (!$business_id || !$category_id || !$goods_ids){
			baf_Logger::log2File(__METHOD__.'参数出错' . '，param:'. json_encode(compact('business_id', 'category_id', 'goods_ids')), 'Venues_api_error');
			throw new Exception(__CLASS__. '::'. __FUNCTION__. ' 参数不能为空');
		}

		$param = array(
			'action'    => 'bind_goods_group',
			'venues_id' => $business_id,
			'cat_id'    => $category_id,
			'goods_ids' => $goods_ids
		);

		$response = $this->requestGet($param, 'Goodsgroup');
		if (!is_array($response)){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response);
		}
		if ($response['status'] != '0000'){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response['msg'], $response['status']);
		}
		return $response['data'];
	}

	/**
	 * 解绑场次打包
	 * @param $goods_group_id 场次打包id
	 * @return mixed
	 * @throws Exception
	 */
	public function unbindGoodsGroup($goods_group_id)
	{
		if (!$goods_group_id){
			baf_Logger::log2File(__METHOD__.'参数出错' . '，param:'. json_encode(compact('goods_group_id')), 'Venues_api_error');
			throw new Exception(__CLASS__. '::'. __FUNCTION__. ' 参数不能为空');
		}

		$param = array(
			'action'    => 'unbind_goods_group',
			'goods_group_id' => $goods_group_id,
		);

		$response = $this->requestGet($param, 'Goodsgroup');
		if (!is_array($response)){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response);
		}
		if ($response['status'] != '0000'){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response['msg'], $response['status']);
		}
		return $response['data'];
	}

	/**
	 * @param $suppliers_id
	 * @param $suppliers_headquarters_id
	 * @return mixed
	 * @throws Exception
	 */
	public function getVenuesCategory($suppliers_id,$suppliers_headquarters_id){
		if (empty($suppliers_id) && empty($suppliers_headquarters_id) ){
			baf_Logger::log2File(__METHOD__.'参数出错' . '，param:'. json_encode(compact('suppliers_id', 'suppliers_headquarters_id')), 'Venues_api_error');
			throw new Exception(__CLASS__. '::'. __FUNCTION__. ' 参数不能为空');
		}

		$param = array(
			'action'    => 'get_venues_category',
			'suppliers_id' => $suppliers_id,
		);
		
		if($suppliers_headquarters_id){
			$param['suppliers_headquarters_id'] = $suppliers_headquarters_id;
		}
			
		$response = $this->requestGet($param, 'venues');
		
		if (!is_array($response)){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response);
		}
		if ($response['status'] != '0000'){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response['msg'], $response['status']);
		}
		return empty($response['data']) ? [] : $response['data'];
	}

	/**
	 * 分页获取固定场列表
	 * @param $venues_id 
	 * @param $cat_id
	 */
	public function getFixedCourtPageList($venues_id, $cat_id, $page="", $page_size="", $customer="", $customer_phone=""){
		if(empty($venues_id) && empty($cat_id)){
			baf_Logger::log2File(__METHOD__.'参数出错' . '，param:'. json_encode(compact('venues_id', 'cat_id')), 'Venues_api_error');
			throw new Exception(__CLASS__. '::'. __FUNCTION__. '/venues_id:'.$venues_id.'/cat_id:'.$cat_id.' 参数不能为空');
		}

		$param = array(
			'action'		=>	'getFixedCourtPageList',
			'venues_id'	=>	$venues_id,
			'cat_id'		=>	$cat_id,
			'page'		=>	$page,
			'page_size'	=>	$page_size,
			'customer'	=>	$customer,
			'customer_phone'	=>	$customer_phone,
		);

		$response = $this->requestGet($param, 'fixedCourt');
		if(!is_array($response)){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response);
		}
		if($response['status'] != '0000'){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response['msg'], $response['status']);
		}
		return empty($response['data']) ? [] : $response['data'];
	}

	/**
	 * 更新对应ID的固定场
	 * @param $lock_id 
	 * @param $course_list
	 */
	public function updateFixedCourt($lock_id, $course_list, $customer="", $customer_phone="", $start_time="", $end_time=""){
		if(empty($lock_id) && empty($course_list)){
			baf_Logger::log2File(__METHOD__.'参数出错' . '，param:'. json_encode(compact('lock_id', 'course_list')), 'Venues_api_error');
			throw new Exception(__CLASS__. '::'. __FUNCTION__. ' 参数不能为空');
		}

		$param = array(
			'action'		=>	'updateFixedCourt',
			'lock_id'	=>	$lock_id,
			'course_list'	=>	$course_list,
			'customer'	=>	$customer,
			'customer_phone'	=>	$customer_phone,
			'start_time'	=>	$start_time,
			'end_time'	=>	$end_time
		);

		$response = $this->requestGet($param, 'fixedCourt');
		if(!is_array($response)){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response);
		}
		if($response['status'] != '0000'){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response['msg'], $response['status']);
		}
		return empty($response['data']) ? [] : $response['data'];
	}

	/**
	 * 删除对应ID的固定场
	 * @param $id 
	 */
	public function delFixedCourt($id){
		if(empty($id)){
			baf_Logger::log2File(__METHOD__.'参数出错' . '，param:'. json_encode(compact('id')), 'Venues_api_error');
			throw new Exception(__CLASS__. '::'. __FUNCTION__. ' 参数不能为空');
		}

		$param = array(
			'action'		=>	'delFixedCourt',
			'id'		=>	$id
		);

		$response = $this->requestGet($param, 'fixedCourt');
		if(!is_array($response)){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response);
		}
		if($response['status'] != '0000'){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response['msg'], $response['status']);
		}
		return empty($response['data']) ? [] : $response['data'];
	}

	/**
	 * 查询固定场是否有冲突
	 * @param $venues_id 
	 * @param $cat_id 
	 * @param $lock_cycle 
	 * @param $start_time
	 * @param $end_time
	 * @param $course_list
	 */
	public function checkLocked($venues_id, $cat_id, $lock_cycle, $start_time, $end_time, $course_list, $lock_id){
		if(empty($venues_id) && empty($cat_id) && empty($lock_cycle) && empty($start_time) && empty($end_time) && empty($course_list) ){
			baf_Logger::log2File(__METHOD__.'参数出错' . '，param:'. json_encode(compact('venues_id', 'cat_id', 'lock_cycle', 'start_time', 'end_time', 'course_list')), 'Venues_api_error');
			throw new Exception(__CLASS__. '::'. __FUNCTION__. ' 参数不能为空');
		}
		
		$param = array(
			'action'		=>	'checkLocked',
			'venues_id'	=>	$venues_id,
			'cat_id'		=>	$cat_id,
			'lock_cycle'	=>	$lock_cycle,
			'start_time'	=>	$start_time,
			'end_time'	=>	$end_time,
			'course_list'	=>	$course_list,
			'lock_id'	=>	$lock_id
		);

		$response = $this->requestGet($param, 'fixedCourt');
		
		if(!is_array($response)){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response);
		}
		if($response['status'] != '0000'){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response['msg'], $response['status']);
		}
		return empty($response['data']) ? [] : $response['data'];
	}

	/**
	 * 锁定场地
	 * @param $venues_id
	 * @param $cat_id
	 * @param $start_time
	 * @param $end_time
	 * @param $course_list
	 */
	public function lockedCourt($venues_id, $cat_id, $lock_cycle, $start_time, $end_time, $course_list, $customer="", $customer_phone=""){
		if(empty($venues_id) && empty($cat_id) && empty($lock_cycle) && empty($start_time) && empty($end_time) && empty($course_list) ){
			baf_Logger::log2File(__METHOD__.'参数出错' . '，param:'. json_encode(compact('venues_id', 'cat_id', 'lock_cycle', 'start_time', 'end_time', 'course_list')), 'Venues_api_error');
			throw new Exception(__CLASS__. '::'. __FUNCTION__. ' 参数不能为空');
		}

		$param = array(
			'action'		=>	'lockedCourt',
			'venues_id'	=>	$venues_id,
			'cat_id'		=>	$cat_id,
			'lock_cycle'	=>	$lock_cycle,
			'start_time'	=>	$start_time,
			'end_time'	=>	$end_time,
			'course_list'	=>	$course_list,
			'customer'	=>	$customer,
			'customer_phone'	=>	$customer_phone
		);
		
		$response = $this->requestGet($param, 'fixedCourt');
		if(!is_array($response)){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response);
		}
		if($response['status'] != '0000'){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response['msg'], $response['status']);
		}
		return empty($response['data']) ? [] : $response['data'];
	}

	/**
	 * 编辑场次打包配置
	 * @param $business_id
	 * @param $category_id
	 * @param $course_id
	 * @param $course_name
	 * @param $hour
	 * @param $week
	 * @return array|mixed
	 * @throws Exception
	 */
	public function editGoodsGroupSetting($business_id, $category_id, $course_id, $course_name, $hour, $week = 0)
	{
		if (!$business_id || !$category_id || !$course_id || !$course_name || !$hour){
			baf_Logger::log2File(__METHOD__.'参数出错' . '，param:'. json_encode(compact('business_id', 'category_id', 'course_id', 'course_name', 'hour')), 'Venues_api_error');
			throw new Exception(__CLASS__. '::'. __FUNCTION__. ' 参数不能为空');
		}

		$param = array(
			'action'    => 'edit_goods_group_setting',
			'venues_id' => $business_id,
			'cat_id' => $category_id,
			'course_id' => $course_id,
			'course_name' => $course_name,
			'hour' => $hour,
			'week' => $week,
		);

		$response = $this->requestGet($param, 'Goodsgroup');
		if (!is_array($response)){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response);
		}
		if ($response['status'] != '0000'){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response['msg'], $response['status']);
		}
		return $response['data'];
	}

	/**
	 * 删除场次打包配置
	 * @param $business_id
	 * @param $category_id
	 * @param $course_id
	 * @param $hour
	 * @param int $week
	 * @return mixed
	 * @throws Exception
	 */
	public function deleteGoodsGroupSetting($business_id, $category_id, $course_id, $hour, $week = 0)
	{
		if (!$business_id || !$category_id || !$course_id || !$hour){
			baf_Logger::log2File(__METHOD__.'参数出错' . '，param:'. json_encode(compact('business_id', 'category_id', 'course_id', 'hour')), 'Venues_api_error');
			throw new Exception(__CLASS__. '::'. __FUNCTION__. ' 参数不能为空');
		}

		$param = array(
			'action'    => 'delete_goods_group_setting',
			'venues_id' => $business_id,
			'cat_id' => $category_id,
			'course_id' => $course_id,
			'hour' => $hour,
			'week' => $week,
		);

		$response = $this->requestGet($param, 'Goodsgroup');
		if (!is_array($response)){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response);
		}
		if ($response['status'] != '0000'){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response['msg'], $response['status']);
		}
		return $response['data'];
	}

	/**
	 * 场馆详细信息
	 * @param $business_id
	 * @param int $category_id
	 * @return mixed
	 * @throws Exception
	 */
	public function getVenuesDetail($business_id, $category_id = 0)
	{
		if (!$business_id){
			baf_Logger::log2File(__METHOD__.'参数出错' . '，param:'. json_encode(compact('business_id')), 'Venues_api_error');
			throw new Exception(__CLASS__. '::'. __FUNCTION__. ' 参数不能为空');
		}

		$param = array(
			'action'    => 'get_venues_detail',
			'business_id' => $business_id,
			'category_id' => $category_id,
		);

		$response = $this->requestGet($param, 'Venues');
		if (!is_array($response)){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response);
		}
		if ($response['status'] != '0000'){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response['msg'], $response['status']);
		}
		return $response['businesses'];
	}

	/**
	 * 根据场地信息(course_id, week, hour)获取从当前时间起的场次
	 * @param $business_id
	 * @param $category_id
	 * @param $course_id
	 * @param $hour
	 * @param int $week
	 * @return array|mixed
	 * @throws Exception
	 */
	public function getBookGoodsByCourt($business_id, $category_id, $course_id, $hour, $week=0)
	{
		if (!$business_id || !$category_id || !$course_id || !$hour){
			baf_Logger::log2File(__METHOD__.'参数出错' . '，param:'. json_encode(compact('business_id', 'category_id', 'course_id', 'hour')), 'Venues_api_error');
			return array();
		}

		$param = array(
			'action'    => 'get_book_goods_by_court',
			'venues_id' => $business_id,
			'cat_id'    => $category_id,
			'course_id' => $course_id,
			'hour'      => $hour,
			'week'      => $week
		);

		$response = $this->requestGet($param, 'Venues');
		if (!is_array($response)){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response);
		}
		if ($response['status'] != '0000'){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response['msg'], $response['status']);
		}
		return $response['data'];
	}

	/**
	 * 批量打包
	 * @param $business_id
	 * @param $category_id
	 * @param $goods_group_data
	 * @return mixed
	 * @throws Exception
	 */
	public function batchBindGoodsGroup($business_id, $category_id, $goods_group_data)
	{
		if (!$business_id || !$category_id || !$goods_group_data){
			baf_Logger::log2File(__METHOD__.'参数出错' . '，param:'. json_encode(compact('business_id', 'category_id', 'goods_group_data')), 'Venues_api_error');
			throw new Exception(__CLASS__. '::'. __FUNCTION__. ' 参数不能为空');
		}

		$param = array(
			'action'    => 'batch_bind_goods_group',
			'venues_id'        => $business_id,
			'cat_id'           => $category_id,
			'goods_group_data' => $goods_group_data,
		);

		$response = $this->requestGet($param, 'Goodsgroup');
		if (!is_array($response)){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response);
		}
		if ($response['status'] != '0000'){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response['msg'], $response['status']);
		}
		return $response['data'];
	}

	/**
	 * 批量对打包进行解绑
	 * @param $goods_group_ids
	 * @return mixed
	 * @throws Exception
	 */
	public function batchUnbindGoodsGroup($goods_group_ids)
	{
		if (!$goods_group_ids){
			baf_Logger::log2File(__METHOD__.'参数出错' . '，param:'. json_encode(compact('goods_group_ids')), 'Venues_api_error');
			throw new Exception(__CLASS__. '::'. __FUNCTION__. ' 参数不能为空');
		}

		$param = array(
			'action'    => 'batch_unbind_goods_group',
			'goods_group_ids' => $goods_group_ids,
		);

		$response = $this->requestGet($param, 'Goodsgroup');
		if (!is_array($response)){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response);
		}
		if ($response['status'] != '0000'){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response['msg'], $response['status']);
		}
		return $response['data'];
	}

	/**
	 * 根据场地信息(course_id, week, hour)获取从当前时间起的打包列表
	 * @param $business_id
	 * @param $category_id
	 * @param $course_id
	 * @param $hour
	 * @param int $week
	 * @return array|mixed
	 * @throws Exception
	 */
	public function getGoodsGroupListByCourt($business_id, $category_id, $course_id, $hour, $week=0)
	{
		if (!$business_id || !$category_id || !$course_id || !$hour){
			baf_Logger::log2File(__METHOD__.'参数出错' . '，param:'. json_encode(compact('business_id', 'category_id', 'course_id', 'hour')), 'Venues_api_error');
			return array();
		}

		$param = array(
			'action'    => 'get_goods_group_list_by_court',
			'venues_id' => $business_id,
			'cat_id'    => $category_id,
			'course_id' => $course_id,
			'hour'      => $hour,
			'week'      => $week
		);

		$response = $this->requestGet($param, 'Goodsgroup');
		if (!is_array($response)){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response);
		}
		if ($response['status'] != '0000'){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response['msg'], $response['status']);
		}
		return $response['data'];
	}

	/**
	 * 取场馆场地列表
	 */
	public function getCourses($venues_id,$cat_id){
		if (!$venues_id || !$cat_id){
			baf_Logger::log2File(__METHOD__.'参数出错' . '，param:'. json_encode(compact('venues_id', 'cat_id')), 'Venues_api_error');
			return array();
		}

		$param = array(
			'action'    => 'get_courses',
			'venues_id' => $venues_id,
			'cat_id'    => $cat_id,
		);

		$response = $this->requestGet($param, 'venues');
		if (!is_array($response)){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response);
		}
		if ($response['status'] != '0000'){
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
			throw new Exception($response['msg'], $response['status']);
		}
		return $response['data'];
	}

	/**
	 * 取business信息
	 */
	public function getBusinessInfoBySuppliers($suppliers_id){
		if(!$suppliers_id){
			baf_Logger::log2File(__METHOD__.'参数出错' . '，param:'. json_encode(compact('suppliers_id')), 'Venues_api_error');
			return [];
		}
		$redis = baf_Redis::factory();
		$cacheKey = 'getBusinessInfo:' . $suppliers_id;
		$list = $redis->getArrayValue($cacheKey);
	
		if(empty($list)) {
			$param = array(
					'action' => 'getBusinessInfoBySuppliers',
					'suppliers_ids' => $suppliers_id,
			);
	
			$response = $this->requestGet($param, 'suppliers');
			if (!is_array($response)) {
				baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
				throw new Exception($response);
			}
			if ($response['status'] != '0000') {
				baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
				throw new Exception($response['msg'], $response['status']);
			}
			$list = $response['data'];
			if (!empty($list)) {
				$redis->setArrayValue($cacheKey, $list, 600);
			}
		}
		return $list;
	}
	
	/**
	 * 检查下单的场次是否有打包情况
	 * 
	 * @author bumtime
	 * @date 2016-10-26
	 *
	 * @param  array $param 参数数组（venues_id：场馆ID，cat_id：项目分类ID，book_date：默认日期（当天0点时间戳），goods_ids 下单的ID，以逗号隔开）
	 * @return array 接口数据
	 */
	public function checkGoodsGroup($param){
		
		if (empty($param['venues_id']) || empty($param['cat_id']) || empty($param['book_date']) || empty($param['goods_ids'])) {
			baf_Logger::log2File(__METHOD__.'参数出错' . json_encode($param) , 'Venues_api_error');
		}
		
		$path = 'shangjia/venues/isCheckGoodsGroup';
    	$param = [
    			'goods_ids'	=>	$param['goods_ids'],
    			'venues_id'	=>	$param['venues_id'],
    			'cat_id'	=>	$param['cat_id'],
    			'book_date'	=>	strtotime($param['book_date'])
    	];
		$response = $this->requestGet($param, $path);
		
		if (!is_array($response) || $response['status'] != '0000') {
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
		}
		
		return $response;
	}
	
	/**
	 * 批量插入固定场
	 *
	 * @author bumtime
	 * @date 2016-12-28
	 *
	 * @param  array $param 参数数组(venues_id:场馆ID customer_phone：客户手机   customer： 客户姓名    data:固定场json)
	 * @return array 接口数据
	 */
	public function lockedCourtBatch($param){
	
		if (empty($param['venues_id']) || empty($param['customer_phone']) || empty($param['data'])) {
			baf_Logger::log2File(__METHOD__.'参数出错' . json_encode($param) , 'Venues_api_error');
		}
		
		$path = 'shangjia/fixedcourt/addLockedCourtBatch';
		$response = $this->requestGet($param, $path);
	
		if (!is_array($response) || $response['status'] != '0000') {
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
		}
	
		return $response;
	}

	/**
	 * 获取BD商务联系方式
	 * 
	 * @author chenchao
	 * @date 2017-01-10
	 *
	 * @param  array $param 参数数组（suppliers_id：商家ID）
	 * @return array 接口数据
	 */
	public function getSuppliersFollow($param){
		
		if (empty($param['suppliers_id'])) {
			baf_Logger::log2File(__METHOD__.'参数出错' . json_encode($param) , 'Venues_api_error');
		}
		
		$path = 'shangjia/suppliers/getSuppliersFollow';
    	$param = [
    			'suppliers_id'	=>	$param['suppliers_id']
    	];
		$response = $this->requestGet($param, $path);
		
		if (!is_array($response) || $response['status'] != '0000') {
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
		}
		
		return $response;
	}
	/**
	 * 批量更新固定场
	 *
	 * @author bumtime
	 * @date 2016-12-28
	 *
	 * @param  array $param 参数数组(venues_id:场馆ID customer_phone：客户手机   customer： 客户姓名    data:固定场json)
	 * @return array 接口数据
	 */
	public function updateLockedCourtBatch($param){
	
		if (empty($param['venues_id']) || empty($param['customer_phone']) || empty($param['data'])) {
			baf_Logger::log2File(__METHOD__.'参数出错' . json_encode($param) , 'Venues_api_error');
		}
		
		$path = 'shangjia/fixedcourt/updateLockedCourtBatch';
		$response = $this->requestGet($param, $path);
	
		if (!is_array($response) || $response['status'] != '0000') {
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
		}
	
		return $response;
	}
	
	/**
	 * 批量检查固定场
	 *
	 * @author bumtime
	 * @date 2016-12-28
	 *
	 * @param  array $param 参数数组(venues_id:场馆ID customer_phone：客户手机   customer： 客户姓名    data:固定场json)
	 * @return array 接口数据
	 */
	public function checkLockedCourtBatch($param){
	
		if (empty($param['venues_id']) || empty($param['data'])) {
			baf_Logger::log2File(__METHOD__.'参数出错' . json_encode($param) , 'Venues_api_error');
		}
	
		$path = 'shangjia/fixedcourt/checkLocked';
		$response = $this->requestGet($param, $path);
	
		if (!is_array($response) || $response['status'] != '0000') {
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
		}
	
		return $response;
	}
	
	
	/**
	 * 批量删除固定场,通过会员卡ID
	 *
	 * @author bumtime
	 * @date 2017-01-07
	 *
	 * @param  array $param 参数数组(venues_id:场馆ID customer_phone：客户手机  )
	 * @return array 接口数据
	 */
	public function  delLockedCourtByCardId($param){
	
		if (empty($param['venues_id']) || empty($param['card_id'])) {
			baf_Logger::log2File(__METHOD__.'参数出错' . json_encode($param) , 'Venues_api_error');
		}
	
		$path = 'shangjia/fixedcourt/delLockedCourtByCardId';
		$response = $this->requestGet($param, $path);
	
		if (!is_array($response) || $response['status'] != '0000') {
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
		}
	
		return $response;
	}
	
	
	/**
	 * 批量删除固定场，通过lock_id删除
	 *
	 * @author bumtime
	 * @date 2017-01-20
	 *
	 * @param  array $param 参数数组(venues_id:场馆ID customer_phone：客户手机  )
	 * @return array 接口数据
	 */
	public function  delLockedCourtById($param){
	
		if (empty($param['venues_id']) || empty($param['card_id'])) {
			baf_Logger::log2File(__METHOD__.'参数出错' . json_encode($param) , 'Venues_api_error');
		}
	
		$path = 'shangjia/fixedcourt/delLockedCourtById';
		$response = $this->requestGet($param, $path);

		if (!is_array($response) || $response['status'] != '0000') {
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
		}
	
		return $response;
	}
	
	
	/**
	 * 更新固定场信息
	 *
	 * @author bumtime
	 * @date 2017-01-10
	 *
	 * @param  array $param 参数数组(venues_id:场馆ID customer_phone：客户手机, old_customer_phone, 旧手机号 )
	 * @return array 接口数据
	 */
	public function  updateLockedCourtInfo($param){
	
		if (empty($param['venues_id']) || empty($param['customer_phone']) || empty($param['old_customer_phone'])) {
			baf_Logger::log2File(__METHOD__.'参数出错' . json_encode($param) , 'Venues_api_error');
		}
	
		$path = 'shangjia/fixedcourt/updateLockedCourtInfo';
		$response = $this->requestGet($param, $path);
	
		if (!is_array($response) || $response['status'] != '0000') {
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
		}
	
		return $response;
	}
	

	/**
	 * 获取场地显示配置
	 * 
	 * @author chenchao
	 * @date 2017-01-10
	 *
	 * @param  array $param 参数数组（suppliers_id：商家ID）
	 * @return array 接口数据
	 */
	public function getSuppliersShowConfig($param){
		
		if (empty($param['suppliers_id'])) {
			baf_Logger::log2File(__METHOD__.'参数出错' . json_encode($param) , 'Venues_api_error');
		}
		
		$path = 'shangjia/suppliers/getSuppliersShowConfig';
    	$param = [
    			'suppliers_id'	=>	$param['suppliers_id']
    	];
		$response = $this->requestGet($param, $path);
		
		if (!is_array($response) || $response['status'] != '0000') {
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
		}
		
		return $response;
	}

	/**
	 * 更新场地显示配置
	 * 
	 * @author chenchao
	 * @date 2017-01-10
	 *
	 * @param  array $param 参数数组（suppliers_id：商家ID，is_show_name是否显示会员名称，is_merge是否合并显示）
	 * @return array 接口数据
	 */
	public function updateSuppliersShowConfig($param){
		
		if (empty($param['suppliers_id'])) {
			baf_Logger::log2File(__METHOD__.'参数出错' . json_encode($param) , 'Venues_api_error');
		}
		
		$path = 'shangjia/suppliers/updateSuppliersShowConfig';
    	$param = [
    			'suppliers_id'	=>	$param['suppliers_id'],
    			'is_show_name'	=>	$param['is_show_name'],
    			'is_merge'	    =>	$param['is_merge']
    	];
		$response = $this->requestGet($param, $path);
		
		if (!is_array($response) || $response['status'] != '0000') {
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
		}
		
		return $response;
	}
	
	/**
	 * 场地锁定（9天内）
	 *
	 * @author bumtime
	 * @date 2017-01-16
	 *
	 * @param  array $param 
	 * @return array 接口数据
	 */
	public function  bookedGoods($param){
		
		if (empty($param['venues_id']) || empty($param['data']) || empty($param['cat_id']) || empty($param['book_date']) ) {
			baf_Logger::log2File(__METHOD__.'参数出错' . json_encode($param) , 'Venues_api_error');
		}
	
		$path = 'shangjia/goods/bookedGoods';
		$response = $this->requestGet($param, $path);
	
		if (!is_array($response) || $response['status'] != '0000') {
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
		}
	
		return $response;
	}

	/**
	 * 场地锁定（9天后）
	 *
	 * @author bumtime
	 * @date 2017-01-16
	 *
	 * @param  array $param 
	 * @return array 接口数据
	 */
	public function  bookedGoodsLater($param){
		
		if (empty($param['venues_id']) || empty($param['data']) || empty($param['cat_id']) || empty($param['book_date']) ) {
			baf_Logger::log2File(__METHOD__.'参数出错' . json_encode($param) , 'Venues_api_error');
		}
	
		$path = 'shangjia/goods/bookedGoodsLater';
		$response = $this->requestGet($param, $path);
	
		if (!is_array($response) || $response['status'] != '0000') {
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
		}
	
		return $response;
	}
	
	/**
	 * 场地解锁（9天内）
	 *
	 * @author bumtime
	 * @date 2017-01-17
	 *
	 * @param  array $param
	 * @return array 接口数据
	 */
	public function  unBookedGoods($param){
	
		if (empty($param['venues_id']) || empty($param['data']) || empty($param['cat_id']) || empty($param['book_date']) ) {
			baf_Logger::log2File(__METHOD__.'参数出错' . json_encode($param) , 'Venues_api_error');
		}	
		
		$path = 'shangjia/goods/unBookedGoods';
		$response = $this->requestGet($param, $path);
	
		if (!is_array($response) || $response['status'] != '0000') {
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
		}
	
		return $response;
	}
	
	
	/**
	 * 场地解锁（9天后）
	 *
	 * @author bumtime
	 * @date 2017-01-17
	 *
	 * @param  array $param（id,多个以逗号隔开、venues_id、cat_id）
	 * @return array 接口数据
	 */
	public function  unBookedGoodsLater($param){

		if (empty($param['venues_id']) || empty($param['data']) || empty($param['cat_id'])) {
			baf_Logger::log2File(__METHOD__.'参数出错' . json_encode($param) , 'Venues_api_error');
		}
		
		$path = 'shangjia/goods/unBookedGoodsLater';
		$response = $this->requestGet($param, $path);
	
		if (!is_array($response) || $response['status'] != '0000') {
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
		}
	
		return $response;
	}
	
	
	/**
	 * 取场地状态（不分9天前后）
	 *
	 * @author bumtime
	 * @date 2017-01-17
	 *
	 * @param  array $param（venues_id、cat_id）
	 * @return array 接口数据
	 */
	public function  getBookedGoods($param){
	
		if (empty($param['venues_id']) || empty($param['cat_id'])) {
			baf_Logger::log2File(__METHOD__.'参数出错' . json_encode($param) , 'Venues_api_error');
		}
	
		$path = 'shangjia/goods/getBookedGoods';
		$response = $this->requestGet($param, $path);
	
		if (!is_array($response) || $response['status'] != '0000') {
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
		}
	
		return $response;
	}
	
	/**
	 * 按会员卡号取所有固定场
	 *
	 * @author bumtime
	 * @date 2017-01-19
	 *
	 * @param  array $param（venues_id、card_id）
	 * @return array 接口数据
	 */
	public function  getFixedCourtList($param){
	
		if (empty($param['venues_id']) || empty($param['card_id'])) {
			baf_Logger::log2File(__METHOD__.'参数出错' . json_encode($param) , 'Venues_api_error');
		}
	
		$path = 'shangjia/fixedcourt/getFixedCourtList';
		$response = $this->requestGet($param, $path);
	
		if (!is_array($response) || $response['status'] != '0000') {
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
		}
	
		return $response;
	}
	
	
	/**
	 * 换场（9天内）
	 *
	 * @author bumtime
	 * @date 2017-01-19
	 *
	 * @param  array $param（venues_id、card_id）
	 * @return array 接口数据
	 */
	public function  changeGoodsInfo($param){
	
		if (empty($param['venues_id']) || empty($param['card_id'])) {
			baf_Logger::log2File(__METHOD__.'参数出错' . json_encode($param) , 'Venues_api_error');
		}
	
		$path = 'shangjia/goods/changeGoods';
		$response = $this->requestGet($param, $path);

		if (!is_array($response) || $response['status'] != '0000') {
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
		}
	
		return $response;
	}
	
	
	/**
	 * 换场(9天后)
	 *
	 * @author bumtime
	 * @date 2017-01-23
	 *
	 * @param  array $param（venues_id、card_id）
	 * @return array 接口数据
	 */
	public function  changeGoodsLaterInfo($param){
	
		if (empty($param['venues_id']) || empty($param['card_id'])) {
			baf_Logger::log2File(__METHOD__.'参数出错' . json_encode($param) , 'Venues_api_error');
		}
	
		$path = 'shangjia/goods/changeGoodsLater';
		$response = $this->requestGet($param, $path);

		if (!is_array($response) || $response['status'] != '0000') {
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Venues_api_error');
		}
	
		return $response;
	}
}