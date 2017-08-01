<?php 
/**
* 
*/
class ext_Channel
{
	/**
	 * 迪卡侬渠道
	 */
	public static function decathlonInit(){
		ext_Decathlon::getMember();
	}
	
	/**
	 * 广汽福利渠道
	 */
	public static function gagcInit($phone){
		return ext_Gagc::getMember($phone);
	}
}