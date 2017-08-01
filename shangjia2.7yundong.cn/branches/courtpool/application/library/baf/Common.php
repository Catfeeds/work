<?php

//常用

class baf_Common
{
    /**
     * 获取yaf配置信息
     * 
     * @param string $key  配置键名
     * @param string $deep 更深一层的配置
     * @return mixed
     * @author xiaoyanchun
     */
	public static function getConfig($key, $deep = null)
	{
	    $config = Yaf_Application::app()->getConfig(); // 把配置保存起来
	     
	    $value = $config->$key;
	    
	    if ($value instanceof Yaf_Config_Ini) {
	        $arr = $value->toArray();
	    
	        if (!$deep) { // 没有更深一层
	            return $arr;
	        }
	    
	        if (isset($arr[$deep])) {
	            return $arr[$deep];
	        }
	    }
	    
	    return null;
	}
   
	
    /**
     * 初始化接口返回结构
     * 
     * @param string $isObject
     * @return object stdClass
     */
    public static function initRes($isObject = true)
    {
        $res = new stdClass();
        $res->status = baf_ErrorCode::OK;
        $res->msg = 'success';
    
        if ($isObject) {
            $res->data = new stdClass();
        } else {
            $res->data = array();
        }
    
        return $res;
    }
    
    /**
     * 验证输入的手机号码
     *
     * @access  public
     * @param   string      $user_mobile      需要验证的手机号码
     *
     * @return bool
     */
    public static function isMobile($user_mobile)
    {
    	$return = false;
    	$chars = "/^1\d{10}$/";
    
    	if (preg_match($chars, $user_mobile))
    	{
    		$return = true;
    	}
    	
    	return $return;
    }
    
    /**
     * 去掉字符中的空格
     *
     * @access  public
     * @param   string      $str      字符
     *
     * @return bool
     */
    public static function strReplaceSpace($str)
    {
    	$reg_str=array(" ", "　", "\t", "\n", "\r");
    	$rep_str=array("", "", "", "", "");
    	return str_replace($reg_str, $rep_str, $str);
    }

    /**
     * 检查字符串中是否存在空格
     *
     * @access  public
     * @param   string      $str      字符
     *
     * @return bool true存在空格  false不存在
     */
    public static function isCheckSpace($str)//删除空格
    {
    	$return = false;
    	$arry_str=array(" ", "　", "\t", "\n", "\r");
    	foreach ($arry_str as $value){
    		if(strpos($str, $value) !== false){
    			$return = true;
    			break;
    		}    			
    	}
		
    	return $return;
    }
}

