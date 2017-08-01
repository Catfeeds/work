<?php
/**
* QQ钱包联合登陆
*/
class api_QqWallet extends api_Base
{
	/**
     * 获取qq用户基本信息
     * @param  string $value [description]
     * @return [type]        [description]
     */
    public static function getQqUserInfo()
    {	
    	//获取到session中的值
    	$openid = isset($_SESSION['qqwallet_openid']) ? $_SESSION['qqwallet_openid'] : '';
		$access_token = isset($_SESSION['qqwallet_access_token']) ? $_SESSION['qqwallet_access_token'] : '';

    	if (empty($openid) || empty($access_token)) return false;

    	$QqUserInfoKey = 'qqwallet_app:fans_info'.$openid;
        $res = baf_Redis::factory()->get($QqUserInfoKey);
        if($res){
            $res = unserialize($res);
        }else{
	    	$url = 'https://graph.qq.com/user/get_user_info?access_token='.$access_token.'&oauth_consumer_key=101347397&openid='.$openid;
	    	$userInfo = baf_Http::httpGet($url);
	    	if (!empty($userInfo) && $userInfo['ret']=='0') {
	    		$res = $userInfo;
                baf_Redis::factory()->set($QqUserInfoKey, serialize($res), 3000);
                baf_Common::log('qqwallet_api_log', 'INFO', 'getUserInfo', $userInfo);
	    	}else {
                $userInfo['requestUrl'] = $url;
                baf_Common::log('qqwallet_api_log', 'INFO', 'getUserInfo', $userInfo);
            }
        }
    	
        return $res;
    }

}