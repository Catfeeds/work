<?php
/**
 * base 
 * @author bigticket.zhang
 *
 */ 

class baf_Base{
	
	/**
	 * 获得  当前环境的 URL 地址
	 */
	public static function base_url()
	{
		/* 协议 */		
		$protocol = (isset($_SERVER['HTTPS']) && (strtolower($_SERVER['HTTPS']) != 'off')) ? 'https://' : 'http://';	
		$here = 0;
		if($protocol == 'http://'){
			$here = 1;
		}
		
		/* 域名或IP地址 */
		if (isset($_SERVER['HTTP_X_FORWARDED_HOST']))
		{
			$host = $_SERVER['HTTP_X_FORWARDED_HOST'];
			$here = 2;
		}
		elseif (isset($_SERVER['HTTP_HOST']))
		{
			$host = $_SERVER['HTTP_HOST'];
			$here = 3;
		}
		else
		{
			/* 端口 */
			if (isset($_SERVER['SERVER_PORT']))
			{
				$port = ':' . $_SERVER['SERVER_PORT'];
		
				if ((':80' == $port && 'http://' == $protocol) || (':443' == $port && 'https://' == $protocol))
				{
					$port = '';
				}
			}
			else
			{
				$port = '';
			}
		
			if (isset($_SERVER['SERVER_NAME']))
			{
				$host = $_SERVER['SERVER_NAME'] . $port;
			}
			elseif (isset($_SERVER['SERVER_ADDR']))
			{
				$host = $_SERVER['SERVER_ADDR'] . $port;
			}
		}
		
		//写log跟踪
		if(IS_PRODUCT_ENVIRONMENT == 1 && $protocol == 'http://'){
			$protocol = 'https://';			
		}

		return $protocol . $host;
	}
	
	//调试输出
	public static function debug_output($content){
		header("Content-type:text/html;charset=utf-8");
		if(is_array($content)){
			$content = json_encode($content);
			echo $content;
		}
		else{
			var_dump($content);
		}		
		exit;
	}
	
	public static function Clientip(){
		static $onlineip = '';
		if ($onlineip) {
			return $onlineip;
		}
		if(getenv('HTTP_CLIENT_IP') && strcasecmp(getenv('HTTP_CLIENT_IP'), 'unknown')) {
			$onlineip = getenv('HTTP_CLIENT_IP');
		} elseif(getenv('HTTP_X_FORWARDED_FOR') && strcasecmp(getenv('HTTP_X_FORWARDED_FOR'), 'unknown')) {
			$onlineip = getenv('HTTP_X_FORWARDED_FOR');
		} elseif(getenv('REMOTE_ADDR') && strcasecmp(getenv('REMOTE_ADDR'), 'unknown')) {
			$onlineip = getenv('REMOTE_ADDR');
		} elseif(isset($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] && strcasecmp($_SERVER['REMOTE_ADDR'], 'unknown')) {
			$onlineip = $_SERVER['REMOTE_ADDR'];
		}
		preg_match('/[\d\.]{7,15}/', $onlineip, $onlineipmatches);
		$onlineip = $onlineipmatches[0] ? $onlineipmatches[0] : 'unknown';
		return $onlineip;
	}
	
	//获取服务器ip
	public static function getServerIp() {
		if (isset($_SERVER)) {
			if($_SERVER['SERVER_ADDR']) {
				$server_ip = $_SERVER['SERVER_ADDR'];
			} else {
				$server_ip = $_SERVER['LOCAL_ADDR'];
			}
		} else {
			$server_ip = getenv('SERVER_ADDR');
		}
		return $server_ip;
	}

	
	/**
	 * 获取登录验证加密串
	 * 加密串原始字符串：base64_encode($user_id).','.$date
	 *
	 * @return  string
	 */
	public static function getAuthstr($user_id, $pass, $date)
	{
	    if (empty($user_id) || empty($date)){
	        return false;
	    }
	    //返回字符串
	    $encr_code = '';
	
	    $user_id_code = base64_encode($user_id);
	    $str = $user_id_code.','.$pass.','.$date;
	    //加密
	    $encr_code = baf_Des::encrypt($str);

	    //返回
	    if (!empty($encr_code)){
	        return $encr_code;
	    }else{
	        return false;
	    }
	}
	
	/**
	 * 获取登录验证解密
	 * @return  array
	 */
	public static function getDecodeAuthstr($str)
	{
	    if (empty($str)){
	        return false;
	    }
	    //返回字符串
	    $encr_arr = array();
	    //解密
	    $code = baf_Des::decrypt($str);
	    //分切字符串
	    if (!empty($code)){
	        $code_arr = explode(',',$code);
	    }else{
	        return false;
	    }
	    //返回数组
	    if (isset($code_arr[0]) && isset($code_arr[1]) && isset($code_arr[2])){
	        $encr_arr['user_id'] = base64_decode($code_arr[0]);
	        $encr_arr['pass'] = $code_arr[1];
	        $encr_arr['date_time'] = $code_arr[2];
	    }else{
	        return false;
	    }
	
	    return $encr_arr;
	}
	
	/**
	 * 读取日期所在星期开始与结束
	 * @param $prefix 前缀
	 * @author chenchao
	 * @return array
	 */
	public static function getWeekDays($day){
	    $ret=array();
	    $lastday =date('Y-m-d',strtotime("$day Sunday"));
	    $firstday=date('Y-m-d',strtotime("$lastday -6 days"));
	    $ret['sdate']=$firstday;
	    $ret['edate']=$lastday;
	    return $ret;
	}
	
	/**
	 * 读取月份的开始与结束
	 * @param $prefix 前缀
	 * @author chenchao
	 * @return array
	 */
	public static function getMonthRange($date){
	    $ret=array();
	    $timestamp=strtotime($date);
	    $mdays=date('t',$timestamp);
	    $ret['sdate']=date('Y-m-1 00:00:00',$timestamp);
	    $ret['edate']=date('Y-m-'.$mdays.' 23:59:59',$timestamp);
	    return $ret;
	}
	
	/**
	 * 读取月份的每个星期开始和结束
	 * @param $month 前缀
	 * @author chenchao
	 * @return array
	 */
	public static function getMonthWeekRange($month){
	    $ret = array();
	    $lastday =date('Y-m-d',strtotime("$month-01 Sunday"));
	    $flag = true;
	    while($flag){
	        $week        = self::getWeekDays($lastday); //读取一个星期的第一天和最后一天
	        $lastday     = date('Y-m-d',strtotime("$week[edate] +1 days")); //下个星期的第一天
	        $end_month   = date('Y-m',strtotime($week['edate'])); //月份
	        $start_month = date('Y-m',strtotime($week['sdate'])); //月份
	        if (($end_month == $month) || ($start_month == $month)){
	            //月份跨度在这个月份内，都有效
	            $ret[] = array('sdate'=>$week['sdate'], 'edate'=>$week['edate']);
	        }else{
	            $flag  = false;
	        }
	    }
	    return $ret;
	}

    /**
     * 验证输入的手机号码
     *
     * @access  public
     * @param   string      $user_mobile      需要验证的手机号码
     *
     * @return bool
     */
    public static function is_mobile_new($user_mobile)
    {
        $chars = "/^((\(\d{2,3}\))|(\d{3}\-))?1\d{10}$/";

        if (preg_match($chars, $user_mobile))
        {
            return true;
        }else
        {
            return false;
        }
    }

    /**
     * 检查日期是否合法日期
     * 
     * @param $date 年-月-日
     * @return bool
     */
    public static function isDate($date) {
        $dateArr = explode("-", $date);
        if (is_numeric($dateArr[0]) && is_numeric($dateArr[1]) && is_numeric($dateArr[2]))
        {
            return checkdate($dateArr[1],$dateArr[2],$dateArr[0]);
        }
        return false;
    }
    
    /**
     * 通过出身年月日计算年龄
     * 
     * @param string $date 出身日期 (格式: 1945-10-01)
     * @return false|int 返回false表示计算失败，返回数组表示年龄
     */
    public static function birthdayToAge($date){
        if (!self::isDate($date)) {
            return false;
        }
        
        // 日期
        $dateArr = explode('-', $date);
        
        // 当前年份
        $currentYear = date('Y');
        
        // 日期的年份大于当前年份了
        if ($dateArr[0] > $currentYear) {
            return false;
        }
        
        return $currentYear - $dateArr[0];
    }
    
    /**
     * 检测身份证号是否正确
     * 
     * @param string $idcard 身份证号
     * @return false|string
     */
    public static function checkIdCard($idcard){
       
        $city = array(11=>"北京",12=>"天津",13=>"河北",14=>"山西",15=>"内蒙古",21=>"辽宁",22=>"吉林",23=>"黑龙江",31=>"上海",32=>"江苏",33=>"浙江",34=>"安徽",35=>"福建",36=>"江西",37=>"山东",41=>"河南",42=>"湖北",43=>"湖南",44=>"广东",45=>"广西",46=>"海南",50=>"重庆",51=>"四川",52=>"贵州",53=>"云南",54=>"西藏",61=>"陕西",62=>"甘肃",63=>"青海",64=>"宁夏",65=>"新疆",71=>"台湾",81=>"香港",82=>"澳门",91=>"国外");
        $iSum = 0;
        $idCardLength = strlen($idcard);
        
        //长度验证
        if (!preg_match('/^\d{17}(\d|x)$/i',$idcard) and!preg_match('/^\d{15}$/i',$idcard)) {
             return false;
        }
        
        //地区验证
        if(!array_key_exists(intval(substr($idcard,0,2)), $city)) {
            return false;
        }
        
        // 15位身份证验证生日，转换为18位
        if ($idCardLength == 15){
            $sBirthday = '19'.substr($idcard,6,2).'-'.substr($idcard,8,2).'-'.substr($idcard,10,2);
            $d = new DateTime($sBirthday);
            $dd = $d->format('Y-m-d');
            if($sBirthday != $dd){
                return false;
            }
            $idcard = substr($idcard,0,6).'19'.substr($idcard,6,9);//15to18
            $Bit18 = self::verifyCardBit($idcard);//算出第18位校验码
            $idcard = $idcard.$Bit18;
        }
       
        // 判断是否大于2078年，小于1900年
        $year = substr($idcard,6,4);
        if ($year<1900 || $year>2078) {
            return false;
        }

        //18位身份证处理
        $sBirthday = substr($idcard,6,4).'-'.substr($idcard,10,2).'-'.substr($idcard,12,2);
        $d = new DateTime($sBirthday);
        $dd = $d->format('Y-m-d');
       
        if($sBirthday != $dd){
            return false;
        }
       
        //身份证编码规范验证
        $idcard_base = substr($idcard,0,17);
        if(strtoupper(substr($idcard,17,1)) != self::verifyCardBit($idcard_base)){
            return false;
        }
        
        return true;
    }
    
    // 计算身份证校验码，根据国家标准GB 11643-1999
    public static function verifyCardBit($idcard_base){
        if(strlen($idcard_base) != 17){
            return false;
        }
            
        //加权因子 
        $factor = array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        
        //校验码对应值
        $verify_number_list = array('1', '0', 'X', '9', '8', '7', '6', '5', '4','3', '2');
        $checksum = 0;
        
        for ($i = 0; $i < strlen($idcard_base); $i++) {
            $checksum += substr($idcard_base, $i, 1) * $factor[$i];
        }
        
        $mod = $checksum % 11;
        $verify_number = $verify_number_list[$mod];
        return $verify_number;
    }
    
    /**
     * 从身份证号码中提取出身年月日
     * 
     * @param string $idcard 身份证号码(15位或18位)
     * @return string 出身年月日(格式: 1945-10-01)
     */
    public static function getBirthdayFromIdCard($idcard){
        if (strlen($idcard) == 15) {
            return '19'.substr($idcard, 6, 2).'-'.substr($idcard, 8, 2).'-'.substr($idcard, 10, 2);
        }
        
        if (strlen($idcard) == 18) {
            return substr($idcard, 6, 4).'-'.substr($idcard, 10, 2).'-'.substr($idcard, 12, 2);
        }
        
        return '';
    }
    
    /**
     * 从身份证号码中提取性别
     *
     * @param string $idcard 身份证号码(15位或18位)
     * @return string 返回m表示男，返回f表示女
     */
    public static function getGenderFromIdCard($idcard){
        
        if (strlen($idcard) == 15) {
            // 最后一位是单数为男， 双数为女
            return ((substr($idcard, -1, 1) % 2) == 0) ? 'f' : 'm';
        }
        
        if (strlen($idcard) == 18) {
            // 第17位，单数为男， 双数为女
            return ((substr($idcard, 16, 1) % 2) == 0) ? 'f' : 'm';
        }
    
        return '';
    }

    public static function strLength($str,$charset='utf-8'){
        if($charset=='utf-8') $str = iconv('utf-8','gb2312//ignore',$str);
        $num = strlen($str);
        $cnNum = 0;
        for($i=0;$i<$num;$i++){
            if(ord(substr($str,$i+1,1))>127){
                $cnNum++;
                $i++;
            }
        }
        $enNum = $num-($cnNum*2);
        $number = ($enNum/2)+$cnNum;
        return ceil($number);
    }

    /**
     * author lishiyuan
     * 替换银行卡、手机号码为**。
     * @param type $str 要替换的字符串
     * @param type $startlen 开始长度 默认4
     * @param type $endlen 结束长度 默认3
     * @return type
     */

    public static function strreplace($str, $startlen = 4, $endlen = 3) {
        $repstr = "";
        if (strlen($str) < ($startlen + $endlen+1)) {
            return $str;
        }
        $count = strlen($str) - $startlen - $endlen;
        for ($i = 0; $i < $count; $i++) {
            $repstr.="*";
        }
        return preg_replace('/(\d{' . $startlen . '})\d+(\d{' . $endlen . '})/', '${1}' . $repstr . '${2}', $str);
    }



}