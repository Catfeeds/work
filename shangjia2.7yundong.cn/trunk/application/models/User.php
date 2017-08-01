<?php
/**
 * 用户模型类
 * 
 * @author xiaoyanchun
 * @date 2015-06-24
 */
class UserModel extends AbstractModel
{
    /**
     * 表名
     *
     * @var string
     */
    protected $_table = 'gs_suppliers_users';
    
    /**
     * 主键
     *
     * @var string
     */
    protected $_primary = 'id';
    
    /**
     * 验证用户登录
     * 
     * @param string $username 用户名称
     * @param string $password 明文密码
     * @return boolean
     */
	public function login($username, $password) {

		$sql = "SELECT id, password, status FROM {$this->_table} WHERE username=:username LIMIT 1";
		$userInfo = $this->fetchRow($sql, [':username' => $username]);
		

		if (empty($userInfo)) { // 用户不存在
		    return false;
		}
		
		
		if ($userInfo['status'] != 1) { // 账号被禁言了
		    return false;
		}
		
		if (md5($password) != $userInfo['password']) { // 密码错误
		    return false;
		}
		
		$userInfo = $this->getUserInfo($userInfo['id']);

		return $userInfo;
	}
	
	/**
	 * 获取用户信息
	 * 
	 * @param int $id
	 * @return false|array
	 */
	public function getUserInfo($id) {
	    $sql = "SELECT id, username, nickname, suppliers_id, suppliers_headquarters_id FROM {$this->_table} WHERE id=:id ";
	    return $this->fetchRow($sql, [':id' => $id]);
	}

	/**
	 * 验证用户是否存在
	 */
	public function checkUser($username,$password){
		$sql = "SELECT id FROM gs_suppliers_users WHERE username=:username AND password=:password LIMIT 1";
		$one = $this->fetchOne($sql,[':username'=>$username,':password'=>md5($password)]);
		return $one ? true : false;
	}

}