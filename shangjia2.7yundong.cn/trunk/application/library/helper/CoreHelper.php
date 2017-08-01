<?php
/**
 * 核心助手类
 * 
 * @date 2015-10-09
 * @author xiaoyanchun
 */
class helper_CoreHelper
{
    /**
     * 处理逗号分隔的数据
     *
     * @param string $commaData 格式: 1,6,8
     * @return string
     */
    public static function handleCommaData($commaData)
    {
        $commaData = trim(trim($commaData), ',');
         
        if (!$commaData) {
            return '';
        }
    
        $tmpArr = explode(',', $commaData);
        $tmpArr = array_filter($tmpArr); // 去掉空字段
        $tmpArr = array_unique($tmpArr); // 去掉重复值
    
        return implode(',', $tmpArr);
    }

    /**
     * 根据时间戳获取对应是周几
     */
    public static function getWeekName($date_time)
    {
        if (empty($date_time)){
            return false;
        }else{
            $week = date("w",$date_time);
            if ($week == '0'){
                $week = '周日';
            }else if ($week == '1'){
                $week = '周一';
            }else if ($week == '2'){
                $week = '周二';
            }else if ($week == '3'){
                $week = '周三';
            }else if ($week == '4'){
                $week = '周四';
            }else if ($week == '5'){
                $week = '周五';
            }else if ($week == '6'){
                $week = '周六';
            }
            return $week;
        }
    }
   
    /**
     * 修正分页的页码
     *
     * @param int $page
     * @return int
     * @author xiaoyanchun
     */
    public static function correctionPage($page) {
        $page = intval($page);
    
        if ($page < 1) {
            $page = 1;
        }
    
        return $page;
    }

    /**
     * 检查日期是否合法日期 (格式: YYYY-MM-dd)
     *
     * @param $date 年-月-日
     * @return bool
     */
    public static function isLawfulDate($date) {
        $dateArr = explode("-", $date);
        
        if (count($dateArr) != 3) {
            return false;
        }
        
        if (is_numeric($dateArr[0]) && is_numeric($dateArr[1]) && is_numeric($dateArr[2])) {
            return checkdate($dateArr[1], $dateArr[2], $dateArr[0]);
        }
        
        return false;
    }

    /**
     * 获取客户端地址
     * 
     * @author xiaoyanchun
     */
    public static function getClientIp() {
        $ip = '';
        
        if (getenv('HTTP_X_FORWARDED_FOR')) {
            $ip = getenv('HTTP_X_FORWARDED_FOR');
        } elseif (getenv('HTTP_CLIENT_IP')) {
            $ip = getenv('HTTP_CLIENT_IP');
        } else {
            $ip = getenv('REMOTE_ADDR');
        }
        
        return $ip;
    }
    
    /**
     * 生成用户密码
     * 
     * @param string $password 明文密码
     * @return string 加密后的密码
     * @author xiaoyanchun
     */
    public static function createPassword($password) {
        return md5($password);
    }
    
    
    /**
     * 添加后台的操作日志
     *
     * @param string $category
     * @param mixed $content
     * @throws Exception
     * @author xiaoyanchun
     */
    public static function addAdminLog($category, $content) {
        $request = Yaf_Dispatcher::getInstance()->getRequest();
    
        if (!is_string($category)) {
            throw new Exception('category 参数只能是字符串类型');
        }
    
        if (strlen($category) > 128) {
            throw new Exception('category 参数长度不能大于128个字符');
        }
    
        $data = [];
        $data['category'] = $category;
        $data['action']   = $request->getModuleName().'/'.$request->getControllerName().'/'.$request->getActionName();
        $data['user_id']  = (int) helper_LoginHelper::getUserField('id');
        $data['suppliers_id']  = (int) helper_LoginHelper::getCurrentSuppliersId('id');
        $data['super_user_id'] = (int) helper_LoginHelper::getSuperUserField('id');
        $data['content']  = json_encode($content);
        $data['ip']       = helper_CoreHelper::getClientIp();
        $data['add_time'] = time();
         
        $insertId = Loader::modelMaster('suppliersAdminLog')->insert($data);
        if(!$insertId){
        	baf_Logger::log2File("插入失败：data:".json_encode($data), 'admin_log_error');
        }
        //baf_Logger::log2File("插入成功：".$insertId, 'db_error_query');
    
        return $insertId;
    }
    
    /**
     * 返回每个星期数组，周四前：前一星期和当前星期，周四后：当前星期
     *
     * @author bumtime
     * @date 2016-08-07
     *
     *
     * @param int $startdate    起始时间
     * @param int $enddate		结束时间
     * @return array 每个星期的数组
     */
    public  static function getWeekListByTime()
    {
    	$return = [];
    	//参数不能为空
    	$time = time();
    	$week = date("w", $time);
    	if($week == 1){
    		$start_date = strtotime("last monday", $time);
    		$end_date   = $start_date + 14*24*3600;
    	}
    	else/* if( $week < 3  && $week > 0) */
    	{
    		$start_date	= strtotime("last monday -7day", $time);
    		$end_date   = $start_date + 14*24*3600;
    	}
    	/* else{
    	 $start_date = strtotime("last monday", $time);
    	 $end_date   = $start_date + 7*24*3600;
    	 }
    	 */    	//计算时间差多少周
    	$countweek = ($end_date-$start_date) / (7*24*3600);
    	 
    	for($i=0; $i<$countweek; $i++){
    		$sd		=	date("Y-m-d",$start_date);
    		$ed		=	strtotime("+ 6 days",$start_date);
    		$eed	=	date("Y-m-d",$ed);
    		$return[]	=	array($sd,$eed, date("W", $start_date));
    		$start_date	=	strtotime("+ 1 day", $ed);
    	}
    
    	return $return;
    }
    
    
    /**
     * 获取根据时间获取9天内的日是期
     *
     * @author bumtime
     * @date 2017-01-22
     *
     *
     * @param int $startdate    起始时间
     *
     * @return array  日期的数组
     */
    public  static function get9DayTime($date)
    {
    	$return = array();
    	//参数不能为空
    	if(!empty($date)){
    		$startdate = strtotime($date);
    		$enddate = strtotime("+ 8 days", $startdate);
    
    		$countdate = intval(($enddate - $startdate)/86400);
    		for($i=0; $i<=$countdate; $i++){
    			$ftime = strtotime("+ ".$i." days", $startdate);
    			$w = date("w", $ftime);
    			 
    			$return[$i] = [
    					"name" 		=>	$w,
    					"date_week"	=>	date("m-d", $ftime),
    					"date"		=>	date("Y-m-d", $ftime),
    			];
    
    		}
    	}
    	return $return;
    }
    
}



