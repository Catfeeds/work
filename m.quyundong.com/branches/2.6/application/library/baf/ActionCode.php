<?php

class baf_ActionCode
{
    public static function getFilter($action)
    {
        //action 为空返回false
        if (empty($action)){
            return false;
        }
     
		$arr = array(
			'add_blackList' => 'addBlackList',//添加黑名单
			'remove_blacklist' => 'removeBlackList',//移除黑名单
			'query_blacklist' => 'queryBlackList',//查询黑名单列表
			'in_blacklist' => 'inBlackList',//是否在黑名单中				
		);
        //返回action
        if(isset($arr[$action])){
            return $arr[$action];
        }else{
            return false;
        }
    }
    
}