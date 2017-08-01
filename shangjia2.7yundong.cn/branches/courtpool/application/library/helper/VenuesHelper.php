<?php

/**
 * 场馆助手类
 *
 */
class helper_VenuesHelper
{
    
    /**
     * 设置默认场馆(分店)
     * 
     * @author xiaoyanchun
     */
    public static function setDefaultVenues() {   
        $venuesList = helper_VenuesHelper::getCurrentVenuesList();
        
        if (!empty($venuesList)) {
            $venuesIds = array_keys($venuesList);
            
            // 默认为第1个
            helper_VenuesHelper::switchVenues($venuesIds[0]);
        }
    }
    
    /**
     * 切换场馆
     * @param $venues_id
     * @return array
     * @throws Exception
     */
    public static function switchVenues($venues_id)
    {
        //从场馆列表里取场馆信息
        $list = self::getVenuesCategory();

        foreach ($list AS $v) {
            if ($venues_id == $v['business_id']) {
                //设置当前suppliers_id
                helper_LoginHelper::setCurrentSuppliersId($v['suppliers_id']);
                //设置当前场馆信息
                self::setCurrentVenuesInfo([
                    'venues_id' => $venues_id,
                    'name' => $v['name'],
                    'show_spread_report'=>$v['show_spread_report'],
                    'return_rule'=>$v['return_rule'],
                    'is_reply' => isset($v['is_reply']) ? $v['is_reply'] : 0,
                	'is_yuliu' => isset($v['is_yuliu']) ? $v['is_yuliu'] : 0,
                	'mutifront_auth_num' => isset($v['mutifront_auth_num']) ? $v['mutifront_auth_num'] : 0,	
                	'is_invoice' => isset($v['is_invoice']) ? $v['is_invoice'] : [],
                	'is_report' => isset($v['is_report']) ? $v['is_report'] : 0,
                	'is_member' => isset($v['is_member']) ? $v['is_member'] : 0,
                	'is_site' => isset($v['is_site']) ? $v['is_site'] : 0
                ]);
                break;
            }
        }
    }

    /**
     * @param $key
     * @return null
     */
    public static function getVenuesField($key)
    {
        $info = self::getCurrentVenuesInfo();

        return isset($info[$key]) ? $info[$key] : null;
    }

    /**
     * 设置当前场馆信息
     *
     */
    public static function setCurrentVenuesInfo(array $venues_info)
    {
        if (!empty($venues_info)) {
            $_SESSION['venues_info'] = $venues_info;
        }
    }

    /**
     * 清空当前场馆信息
     */
    public static function destroyCurrentVenuesInfo()
    {
        unset($_SESSION['venues_info']);
    }

    /**
     * 获取当前场馆的信息
     * @return array
     * $_SESSION['venues_info']=['venues_id' => , 'name' => ]
     */
    public static function getCurrentVenuesInfo()
    {
        return !empty($_SESSION['venues_info']) ? $_SESSION['venues_info'] : array();
    }

    /**
     * 获取当前场馆的ID
     *
     */
    public static function getCurrentVenuesId()
    {
        $venuesInfo = self::getCurrentVenuesInfo();
        return isset($venuesInfo['venues_id']) ? $venuesInfo['venues_id'] : 0;
    }
    
    /**
     * 获取当前场馆分类列表
     */
    public static function getCurrentCatList()
    {
        $venues_id = self::getCurrentVenuesId();
        $list = self::getVenuesCategory();
        $catList = [];
        foreach ($list AS $v) {
            if ($venues_id == $v['business_id']) {
                $catList = array_column($v['categories'], 'category_name', 'category_id');
                break;
            }
        }
        return $catList;
    }

    /**
     * 获取场馆当前的项目分类
     *
     * @param string $cat_id 当前项目分类ID
     *
     * @return mixed
     * @author bumtime
     */
    public static function setVenuesCatID($cat_id)
    {
        $_SESSION['venues_cat_id'] = $cat_id;
    }


    /**
     * 获取场馆当前的项目分类
     *
     * @return string
     * @author bumtime
     */
    public static function getVenuesCatID()
    {
        return !empty($_SESSION['venues_cat_id']) ? $_SESSION['venues_cat_id'] : "";
    }

    /***
     * 登录成功取场馆信息分类信息
     *
     */
    protected static function getVenuesCategory()
    {
    	$list = [];
        $suppliers_id  = helper_LoginHelper::getUserField('suppliers_id') ?: 0 ;
        $suppliers_headquarters_id = helper_LoginHelper::getUserField("suppliers_headquarters_id") ?: 0 ;      

       /*  if(!empty($suppliers_id) || !empty($suppliers_headquarters_id)){
            $redis = baf_Redis::factory();
            $cacheKey = 'venuesList:' . $suppliers_headquarters_id . '-' . $suppliers_id;
            $list = $redis->getArrayValue($cacheKey);
        } */
    
        if (empty($list)) {
            //场馆列表
            try {
                $list = Loader::api('venues')->getVenuesCategory($suppliers_id, $suppliers_headquarters_id);
 
            } catch (Exception $e) {
                baf_Logger::log2File('venues.api取场馆列表出错'. ' error: '. $e->getMessage().';supplier_id'.$suppliers_id.';suppliers_headquarters_id:'.$suppliers_headquarters_id.';SESSION:'.json_encode($_SESSION), 'venues_api_error');
            }
          /*   if (!empty($list)) {
                $redis->setArrayValue($cacheKey, $list, 600);
            } */
        }

        return empty($list) ? [] : $list;
    }

    /**
     * 取场馆列表
     */
    public static function getCurrentVenuesList()
    {
        $venueList = [];
        $list = self::getVenuesCategory();
        if (!empty($list)) {
            $venueList = array_column($list, 'name', 'business_id');
        }
        if(empty($venueList)){
            throw new InvalidArgumentException("账号未关联场馆，请联系趣运动！");
        }
        return $venueList;
    }

    /**
     * 取营业时间
     */
    public static function getServiceTime($cat_id){
        $venues_id = self::getCurrentVenuesId();
        $list = self::getVenuesCategory();
        foreach ($list AS $v) {
            if ($venues_id == $v['business_id']) {
                $catList = array_column($v['categories'], 'service_time', 'category_id');
                return isset($catList[$cat_id]) ? $catList[$cat_id] : [];
            }
        }
        return [];
    }

    /**
     * 取场地列表
     */
    public static function getCourses($cat_id){
        $venues_id = self::getCurrentVenuesId();
        $redis = baf_Redis::factory();
        $cacheKey = 'venuesList:' . $venues_id . '-' . $cat_id;
        $courseList = $redis->getArrayValue($cacheKey);
        if (empty($courseList)) {
            //场馆列表
            try {
                $list = Loader::api('venues')->getCourses($venues_id, $cat_id);
                $courseList = isset($list[$cat_id]) ? $list[$cat_id] : [];
            } catch (Exception $e) {
                baf_Logger::log2File('venues.api取场地列表出错venues_id:'.$venues_id.';cat_id:'.$cat_id. ' error: '. $e->getMessage(), 'venues_api_error');
            }
            if (!empty($courseList)) {
                $redis->setArrayValue($cacheKey, $courseList, 600);
            }
        }
        return empty($courseList) ? [] : $courseList;
    }

    /**
     * 是否显示新推广列表
     */
    public static function showSpreadLogNew($suppliers_id){
        //是否显示新推广记录,开通新推广或有新推广记录
        $showNewLog = false;
        $currentVenuesInfo = helper_VenuesHelper::getCurrentVenuesInfo();
        if((isset($currentVenuesInfo['return_rule']) && $currentVenuesInfo['return_rule'] == 1) || Loader::modelSlave('SuppliersSpreadLogNew')->hasLogRecord($suppliers_id)){
            $showNewLog = true;
        }
        return $showNewLog;
    }
    
    /**
     * 取管理员列表(redis)
     */
    public static function getProAdminList($supplier_id){
    	$venues_id = self::getCurrentVenuesId();
    	$redis = baf_Redis::factory();
    	$cacheKey = 'adminUserList:' . $venues_id ;
    	$adminList = $redis->getArrayValue($cacheKey);
    	if (empty($adminList)) {
    		//场馆列表
    		try {
    			//管理员
    			$param = [ 'suppliers_id'	=>	$supplier_id ];
    			$repList = Loader::api('Business')->getAdminList($param);
    			$adminList = isset($repList['data']) ? $repList['data'] : [];
    			
    		} catch (Exception $e) {
    			baf_Logger::log2File('Business.api取推广管理员列表出错venues_id:'.$venues_id. ' error: '. $e->getMessage(), 'business_api_error');
    		}
    		if (!empty($adminList)) {
    			$redis->setArrayValue($cacheKey, $adminList, 600);
    		}
    	}
    	return empty($adminList) ? [] : $adminList;
    }

    /**
     * 取所有商家id
     */
    public static function getSuppliersList()
    {
        $list = self::getVenuesCategory();
        return !empty($list) ? array_column($list, 'suppliers_id') : [];
    }
    
    /**
     * 取渠道来源
     */
    public static function getutmSource($id ='')
    {
    	return 'shangjia';
    }
    
    /**
     * 取平台来源
     */
    public static function getutmMedium($id ='')
    {
    	return 'reserve';
    }
    
    /**
     * 取场地配置(redis)
     */
    public static function getShowConfig($supplier_id){
    	$venues_id = self::getCurrentVenuesId();
    	$redis = baf_Redis::factory();
    	$cacheKey = 'getShowConfig:' . $venues_id ;
    	$showConfig = $redis->getArrayValue($cacheKey);
    	if (empty($showConfig)) {
    		//场地配置
    		try {
    				$param = [
						'suppliers_id'	=>	$supplier_id
					];
					$config_rep =Loader::api('Venues')->getSuppliersShowConfig($param);
    				$showConfig = isset($config_rep['data']) ? $config_rep['data'] : [];
    			 
    		} catch (Exception $e) {
    			baf_Logger::log2File('venues.api取场地配置出错venues_id:'.$venues_id. ' error: '. $e->getMessage(), 'venues_api_error');
    		}
    		if (!empty($showConfig)) {
    			$redis->setArrayValue($cacheKey, $showConfig, 600);
    		}
    	}
    	return empty($showConfig) ? ["is_show_name"=> 1, "is_merge"=> 1] : $showConfig;
    }
    
    /**
     * 修改场地配置(redis)
     */
    public static function updateShowConfig($supplier_id, $is_show_name, $is_merge){
    	$venues_id = self::getCurrentVenuesId();
    	$redis = baf_Redis::factory();
    	$cacheKey = 'getShowConfig:' . $venues_id ;
    	
    	//调用接口
    	$param = [
    			'suppliers_id'	=>	$supplier_id,
    			'is_show_name'	=>	$is_show_name,
    			'is_merge'	    =>	$is_merge
    	];
    	$info = Loader::api('Venues')->updateSuppliersShowConfig($param);
    	$redis->delValue($cacheKey);
    	
    	return $info;
    }
    
    
    
}
