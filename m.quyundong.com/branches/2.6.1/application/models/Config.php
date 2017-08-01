<?php

class ConfigModel extends AbstractModel{


    protected $_table = 'wx_config';

    /**
     * 配置信息
     * @param
     * @return array
     */
    public function getAppConfig($param)
    {
        $config_arr = $update_profile = array();
        $config_arr['min_price'] = 30;
        $config_arr['max_price'] = 80;
        $config_arr['user_protocol_url'] =  api_Config::getConfigByKey('m', 'http://m.quyundong.com/').'appwebview/CoachProtocol'; // 用户协议地址 (webview链接)
        $config_arr['user_qa_url'] =  api_Config::getConfigByKey('m', 'http://m.quyundong.com/'). 'appwebview/CoachQa'; // 问题 (webview链接)
         
        $update_profile_message = "1.新增订单模块，可以查看和管理约练订单\n2.新增即时通讯，可以同学员进行聊天\n3.新增收支明细，可以查看自己在趣运动收支明细\n4.开放提现功能，可以将约练收入提取到银行卡中\n5.其他优化和修复";
        if ($param['from'] == 'ios'){ //IOS            
            $update_profile['app_version'] = api_Config::getConfigByKey('coach_ios_app_version','1.0.0');
            $update_profile['download_address'] =api_Config::getConfigByKey('coach_ios_www', 'https://itunes.apple.com/cn/app/qu-yun-dong/id717619906?mt=8'); 
            $update_profile['is_forced'] = api_Config::getConfigByKey('coach_ios_is_forced','0');
            $update_profile['last_version'] = api_Config::getConfigByKey('coach_ios_last_version','1.0.0');
            $update_profile['message'] = $update_profile_message;
        }else{//android
            $update_profile = array();
            $update_profile['app_version'] = api_Config::getConfigByKey('coach_android_app_version','1.0.0');
            $update_profile['download_address'] = api_Config::getConfigByKey('coach_android_www', 'http://www.quyundong.com/').'d/coach';
            $update_profile['is_forced'] = api_Config::getConfigByKey('coach_android_is_forced','0');
            $update_profile['last_version'] = api_Config::getConfigByKey('coach_android_last_version','1.0.0');
            $update_profile['message'] = $update_profile_message;
        }    
        $config_arr['update_profile'] = $update_profile;//
        return $config_arr;
    }


    public function getOneByKey($key){
        if(!$key){
            return false;
        }
        $sql = "SELECT option_value FROM ".$this->_table." WHERE option_key=:option_key";
        return $this->fetchOne($sql, array(':option_key' => $key));
    }
}