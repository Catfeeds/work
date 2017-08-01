<?php
/**
 * 趣运动用户表
 * 
 * @author bumtime
 * @date 20170111
 *
 */
Class QydUserModel extends AbstractModel
{
    /**
     *  表名
     *
     * @var string
     */
    protected $_table = 'gs_users';

    /**
     * 主键
     *
     * @var string
     */
    protected $_primary = 'user_id';


	/**
	 * 根据手机取用户信息
	 *
	 *
	 * @param int $id  卡Id
	 * @param int $venues_id  场馆id
	 * @return array
	 */
    public function getUserInfo($phone){
    	$user_info = [];
    	
    	if (empty($phone)) {
    		return $user_info;
    	}
    	$user_info = $this->fetchRow("SELECT user_id ,user_name, mobile_phone FROM  `gs_users` WHERE mobile_phone=:mobile_phone", [':mobile_phone' => $phone ]);
    	 
    	baf_Logger::log2File(__METHOD__.":".json_encode($user_info), 'UserCard_log');
    	return $user_info;
    }
}
    