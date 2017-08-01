<?php
/**
 * 常用函数类
 * 
 */


class api_FrontHelper
{


    /**
     * 获取登录验证加密串
     * 加密串原始字符串：base64_encode($user_id).','.$date
     *
     * @return  string
     */
    public static function getAuthstr($user_id,$date,$dbMd5pwd='')
    {
    	if (empty($user_id) || empty($date)){
    		return false;
    	}
    	//返回字符串
    	$encr_code = '';
    
    	$user_id_code = base64_encode($user_id);
    	$str = $user_id_code.','.$date;
    	if($dbMd5pwd) $str .= ','.$dbMd5pwd;
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
    	if (isset($code_arr[0]) && isset($code_arr[1])){
    		$encr_arr['user_id'] = base64_decode($code_arr[0]);
    		$encr_arr['last_update_time'] = $code_arr[1];
    		if(isset($code_arr[2])) $encr_arr['dbmd5_pwd'] = $code_arr[2];//若含有加密串则返回
    	}else{
    		return false;
    	}
    
    	return $encr_arr;
    }
   

}