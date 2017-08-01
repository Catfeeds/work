<?php
/**
 * 请求管理员api相关的接口
 * 
 * @author bumtime
 * @date 2016-06-29
 * 
 */
class api_BusinessApi extends api_Base
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
    protected $apiProductUrl = 'http://meapi.7yundong.cn/';
    
    /**
     * 开发环境的api地址
     *
     * @var string
     */
    protected $apiDevelopmentUrl = 'http://meapi.qydw.net/';
    

    /**
     * 获取管理员列表
     * http://meapi.qydw.net/business?action=get_admin_list&client_time=1467203247&suppliers_id=38&api_sign=2f42237f49e6468199c773950cb8dc80
     *
     * @author bumtime
 	 * @date 2016-06-29
	 * 
     * @param  array $param 参数数组（suppliers_id：	商家ID）
     * @return array 接口数据
     */
    public  function getAdminList($arry)
    {
    	if(!$arry['suppliers_id']){
			baf_Logger::log2File(__METHOD__.'参数出错' . '，param:'. json_encode($arry), 'Business_api_error');
			return false;
		}
    	
    	//相关参数
    	$param = [
    			'action'		=>	"get_admin_list",
    			'suppliers_id'	=>	$arry['suppliers_id']
    	];
    	
    	$paths = "business?";
		$response = $this->requestPost($param, $paths);

		if (!is_array($response) || $response['status'] != '0000') {
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Business_api_error');
		}
		
    	return $response;

    }
    
    /**
     * 发送推广短信
     * http://meapi.qydw.net/business?type=1&category_id=1&client_time=1467204547&phone=18602031367&action=send_spread_sms&admin_name=%E5%BC%A0%E4%B8%89&suppliers_id=38&admin_id=3&business_id=10&system_resoure=1&api_sign=31a2203e1e58868210df45700302afc3

     *
     * @author bumtime
 	 * @date 2016-06-29
	 * 
     * @param  array $param 参数数组（suppliers_id 商家ID;	business_id 场馆ID;	category_id 项目ID;  phone 手机号;	type 推广类型（1、管理员推广 2、普通推广）;	admin_id 管理员ID（普通推广不传）; admin_name 管理员姓名;	system_source 请求来源（1、商家APP 2、商家后台 3、馆掌））
     * @return array 接口数据
     */
    public  function sendSpreadSms($arry)
    {
    	if(!$arry['suppliers_id'] || !$arry['category_id'] || !$arry['phone'] || !$arry['business_id']){
			baf_Logger::log2File(__METHOD__.'参数出错' . '，param:'. json_encode($arry), 'Business_api_error');
			return false;
		}
    	
    	//相关参数
    	$param = [
    			'action'			=>	"send_spread_sms",
    			'suppliers_id'		=>	$arry['suppliers_id'],
    			'type'				=>	$arry['type'],
    			'category_id'		=>	$arry['category_id'],
    			'phone'				=>	$arry['phone'],
    			'business_id'		=>	$arry['business_id'],
    			'system_resoure'	=>	2	
    	];       	
	
    	if(isset($arry['admin_name']) && !empty($arry['admin_name']))
    	{
    		$param['admin_name']	=	$arry['admin_name'];
    	}
    	if(isset($arry['admin_id']) && !empty($arry['admin_id']))
    	{
    		$param['admin_id']	=	$arry['admin_id'];
    	}
    	
    	$paths = "business?";
		$response = $this->requestPost($param, $paths);
		if (!is_array($response) || $response['status'] != '0000') {
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Business_api_error');
		}

    	return $response;
    }    
    
    
    /**
     * 验证订单
     * http://meapi.qydw.net/index?action=CheckCode&client_time=1467340879&code=352614&suppliers_id=44&api_sign=80854569245d2e4139f41305481024cb
     *
     * @author bumtime
     * @date 2016-07-01
     *
     * @param  array $param 参数数组（suppliers_id：	商家ID, code：验证码）
     * @return array 接口数据
     */
    public  function checkCode($arry)
    {
    	if(!$arry['suppliers_id'] || !$arry['code']){
			baf_Logger::log2File(__METHOD__.'参数出错' . '，param:'. json_encode($arry), 'Business_api_error');
			return false;
		}
    	 
    	//相关参数
    	$param = [
    			'action'		=>	"CheckCode",
    			'suppliers_id'	=>	$arry['suppliers_id'],
    			'code'			=>	$arry['code']			
    	]; 
    	
    	/* $param = [
    			'action'		=>	"check_order_code",
    			'suppliers_id'	=>	$arry['suppliers_id'],
    			'code'			=>	$arry['code'],
    			'business_id'	=>	$arry['business_id'],
    			'category_id'	=>	$arry['category_id']
    	]; */

    	//$paths = "business?";
    	$paths = "index?";
		$response = $this->requestPost($param, $paths);

		if (!is_array($response) || $response['status'] != '0000') {
			baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Business_api_error');
		}

    	return $response;
    }
  

}