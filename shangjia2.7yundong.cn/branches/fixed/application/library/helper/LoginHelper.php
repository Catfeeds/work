<?php
/**
 * 登陆助手类
 *
 * @author xiaoyanchun
 * @date 2015-16-24
 */
class helper_LoginHelper
{
    /**
     * 超级管理员用户id
     * 
     * @var array
     */
    //const SUPER_USER_IDS = 512;
    
    const SUPER_USER = 1; //超级账号
    const MULTI_SUPPLIER = 2; //总店商家账号
    const SINGLE_SUPPLIER = 3; //一般商家

    /**
     * 从配置文件取超级管理员id
     * 返回数组
     */
    public static function getSuperUserIds(){
        $admin= baf_Common::getConfig("admin");
        if(empty($admin) || !isset($admin['super_admin_ids']) || empty($admin['super_admin_ids'])){
            throw new InvalidArgumentException("未配置超级管理员");
            return false;
        }
        return explode(',',$admin['super_admin_ids']);
    }
    /**
     * 设置登录session信息
     * 
     * @param array $userInfo
     */
    public static function setLogin(array $userInfo) {
        
        if (empty($userInfo)) {
            return;
        }
        
        $_SESSION['user_info'] = $userInfo;
        //是否显示通知
        $_SESSION['show_notice'] = true;
        
        // 是超级管理员，设置超级管理员信息
        if (in_array($userInfo['id'], self::getSuperUserIds())) {
            $_SESSION['super_user_info'] = $userInfo;
            return;
        }
        
        //总店登录且开启营业数据显示时不设置默认场馆
        if(self::getUserLevel() != self::SUPER_USER){
            helper_VenuesHelper::setDefaultVenues();
        }

    }
    
    /**
     * 是否是超级用户
     * 
     * @return boolean
     */
    public static function isSuperUser() {
        if (isset($_SESSION['super_user_info']) && !empty($_SESSION['super_user_info'])) {
            return true;
        }
        
        return false;
    }
    
    /**
     * 获取登录用户信息
     *
     * @return array
     */
    public static function getSuperUserInfo() {
        if (isset($_SESSION['super_user_info']) && !empty($_SESSION['super_user_info'])) {
            return $_SESSION['super_user_info'];
        }
    
        return [];
    }
    
    /**
     * 获取超级用户登录信息的某一个字段
     *
     * @param string $key
     * @return mixed
     */
    public static function getSuperUserField($key) {
        $superUserInfo = self::getSuperUserInfo();
    
        if (isset($superUserInfo[$key])) {
            return $superUserInfo[$key];
        }
    
        return null;
    }
    
    /**
     * 设置用户退出
     */
    public static function logout() {
        session_destroy(); // 销毁session
    }

    /**
     * 检测用户是否登陆
     * 
     * @return bool
     */
    public static function isLogin() {
    	$userInfo = self::getUserInfo();
    	return empty($userInfo) ? false : true; 
    }
    
    /**
     * 获取登录用户信息
     * 
     * @return array
     */
    public static function getUserInfo() {
        if (isset($_SESSION['user_info']) && !empty($_SESSION['user_info'])) {
            return $_SESSION['user_info'];
        }
        
        return [];
    }
    
    /**
     * 获取用户登录信息的某一个字段
     * 
     * @param string $key
     * @return mixed
     */
    public static function getUserField($key) {
        $userInfo = self::getUserInfo();
        
        if (isset($userInfo[$key])) {
            return $userInfo[$key];
        }
        
        return null;
    }
   
    /**
     * 获取登录用户id
     * 
     * @return int
     */
    public static function getUserId() {
        if (isset($_SESSION['user_id']) && $_SESSION['user_id'] > 0) {
            return $_SESSION['user_id'];
        }
        
        return 0;
    }
    /**
     * 获取登录用户商家ID
     *
     * @return int
     */
    public static function getCurrentSuppliersId()
    {
        return isset($_SESSION['suppliers_id']) ? $_SESSION['suppliers_id'] : self::getUserField('suppliers_id');
    }

    /**
     * 设置当前商家ID
     */
    public static function setCurrentSuppliersId($suppliers_id){
        $_SESSION['suppliers_id'] = $suppliers_id;
    }

    /**
     * 是否启用馆掌相关统计项
     */
    public static function isShowStat(){
        //business表有配置app_key则启用
        $supplier_ids = helper_VenuesHelper::getSuppliersList();
        if(!empty($supplier_ids)){
            $business = Loader::api('venues')->getBusinessInfoBysuppliers(implode(',',$supplier_ids));
            //print_r($business);exit;
            return !empty($business) ? true : false;
        }
        return false;
    }

    /**
     * 当前用户账号等级
     */
    public static function getUserLevel(){
        
        if (in_array(self::getUserField('id'),self::getSuperUserIds())) {
            return self::SUPER_USER;
        }
        
        if(self::getUserField('suppliers_headquarters_id')){
            return self::MULTI_SUPPLIER;//总店商家
        }

        if(self::getUserField('suppliers_id')){
            return self::SINGLE_SUPPLIER;//一般商家
        }

        return 0;
    }

    /**
     * 跳转路径
     */
    public static function getRedirectPath(){

        switch (self::getUserLevel()) {
            case self::SUPER_USER: // 超级管理员
                $path = '/login/chooseSupplies';
                break;
            case self::MULTI_SUPPLIER: // 总店商家
                if(helper_VenuesHelper::checkSomsVer()){
                	$path = '/business/totalV2';
                }else{
                	$path = '/stat/total';
                }
                break;
            case self::SINGLE_SUPPLIER: // 一般商家
            	if(helper_VenuesHelper::checkSomsVer()){
            		$path = '/business/businessV2';
            	}else{
            		$path = '/stat/business';
            	}
                
                break;
            default:
                $path = '/login/index';
        }
        //一期先上趣运动部分
        if(self::getUserLevel() != self::SUPER_USER  && (!self::isReport() || !self::isShowStat() ) ){       	
        	$path = '/goods/index';
        	if(self::isSite()){
        		$path = '/goodslist/index';
            }
        	
        }
        return $path;
    }
    
    
     /**
     * 是否启用通知(true启用，false不启用)
     */
    public static function isShowNotice(){
    	$is_check = false;
		$end_time =  strtotime("2016-10-11");
		
		//是否有登录，初次登录显示(true值)
		$check_show_notice  =  isset($_SESSION['show_notice']) ?  $_SESSION['show_notice'] : false;
		
		//是否有没绑馆掌微信
		$suppliers_id	= helper_LoginHelper::getCurrentSuppliersId();
		$is_check_weixin_phone = Loader::modelSlave('SuppliersWeixinPhone')->checkWeixinPhone($suppliers_id);
		
		//不能是连锁号
		$login_userInfo = helper_LoginHelper::getUserInfo();
		$check_suppliers_headquarters = (isset($login_userInfo['suppliers_headquarters_id']) && $login_userInfo['suppliers_headquarters_id'] != 0) ? true  : false;
		
		//非超级管理员&&时间限制在2016-10-11&&初次登录显示&&有手机号没绑定馆掌微信&&不能是连锁号
        if(!helper_LoginHelper::isSuperUser() && time() < $end_time && $check_show_notice && $is_check_weixin_phone && !$check_suppliers_headquarters){
        	$is_check = true;
        }
        $_SESSION['show_notice'] = false;

        return $is_check;
    }
    
    /**
     * 是否开启商家后台预留功能(true启用，false不启用)
     */
    public static function isReserve(){
    	$info = isset($_SESSION['venues_info']) ? $_SESSION['venues_info'] : "";
    	return !empty($info) && isset($info['is_yuliu']) && $info['is_yuliu'] == 1  ? true : false; 
    }
    
    /**
     * 是否开启多前台报表(true启用，false不启用)
     */
    public static function isMutifront(){
    	$info = isset($_SESSION['venues_info']) ? $_SESSION['venues_info'] : "";
    	return !empty($info) && isset($info['mutifront_auth_num']) && $info['mutifront_auth_num'] > 1   ? true : false; 
    }
    
    /**
     * 是否开启趣运动发票功能
     * 
     * @author bumtime
     * @date 20170104
     */
    public static function isInvoice(){
    	$return = false;
    	$info = isset($_SESSION['venues_info']) ? $_SESSION['venues_info'] : "";
    	if(!empty($info) &&  isset($info['is_invoice'])){
    		//只要有一个项目设置了发票，那所有项目都可以显示发票功能
    		foreach ($info['is_invoice'] as $value){
    			if($value==1){
    				$return = true;
    				break;
    			}
    		}
    	}
    	return  $return;
    }
    
    /**
     * 是否开启商家后台报表(true启用，false不启用)
     *     
     * @author bumtime
     * @date 20170112
     * 
     */
    public static function isReport(){
    	$info = isset($_SESSION['venues_info']) ? $_SESSION['venues_info'] : "";
    	return  !empty($info) && isset($info['is_report']) &&  $info['is_report'] == 1  ? true : false;
    }
    
    /**
     * 是否开启会员管理(true启用，false不启用)
     *     
     * @author bumtime
     * @date 20170112
     * 
     */
    public static function isMember(){
    	$info = isset($_SESSION['venues_info']) ? $_SESSION['venues_info'] : "";
    	return !empty($info) && isset($info['is_member']) && $info['is_member'] == 1  ? true : false;
    }
    
    /**
     * 是否开启场地管理(true启用，false不启用)
     *     
     * @author bumtime
     * @date 20170112
     * 
     */
    public static function isSite(){
    	$info = isset($_SESSION['venues_info']) ? $_SESSION['venues_info'] : "";
    	return !empty($info) && isset($info['is_site']) && $info['is_site'] == 1  ? true : false;
    }
}
