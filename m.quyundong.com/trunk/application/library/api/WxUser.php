<?php
class api_WxUser
{
	public static $nick_name;
	public static $avatar;
	public static $phone;
	//写登录cookies
	public static function setLoginCookie($data,$expire){
		if(empty($data) || !is_array($data)) return false;
		
		$expire = $expire > 0 ? $expire : 0;
	
		if(isset($data['user_id'])){
			api_CoreHelper::setCookie('uid',api_CoreHelper::authcode($data['user_id'],'ENCODE',ENCODE_KEY),$expire);
		}
		if(isset($data['nick_name'])){
			self::$nick_name = $data['nick_name'];
			api_CoreHelper::setCookie('nick_name',$data['nick_name'],$expire);
		}
		if(isset($data['phone'])){
			self::$phone = $data['phone'];
			api_CoreHelper::setCookie('phone',$data['phone'],$expire);
		}
		if(isset($data['phone'])){
			api_CoreHelper::setCookie('userToken',api_CoreHelper::authcode($data['phone'],'ENCODE',ENCODE_KEY),$expire);
		}
		if(isset($data['avatar'])){
			self::$avatar = $data['avatar'];
			api_CoreHelper::setCookie('avatar',$data['avatar'],$expire);
		}
		api_CoreHelper::setCookie('timeLimit',1,LOGIN_TIME_LIMIT);
		//将清除回跳链接
		api_CoreHelper::setCookie('__return_url','',0);
	}
}