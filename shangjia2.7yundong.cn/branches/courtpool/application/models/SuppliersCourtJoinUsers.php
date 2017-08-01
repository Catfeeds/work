<?php 
/**
 * 商家与用户关联信息表
 *
 * @author: chenchao
 * @date: 2017-02-13
 */

class SuppliersCourtJoinUsersModel extends AbstractModel
{
	/**
	 * 表名
	 *
	 * @var string
	 */
	protected $_table = 'gs_suppliers_court_join_users';

	/**
	 * 主键
	 *
	 * @var string
	 */
	protected $_primary = 'id';

	/**
    * 获取用户信息
    * 
    * @param int    $suppliersId 商家id
    * @return array
    */
   public function getUserInfo($suppliersId) {

       $bind = [
           ':suppliers_id' => $suppliersId
       ];
       
       $sql = "SELECT user_id, phone, user_money FROM {$this->_table} "
            . " WHERE suppliers_id = :suppliers_id AND is_delete = '0' ";
 
       $info = $this->fetchRow($sql, $bind);
       return $info;
   }

   /**
    * 获取用户头像
    * 
    * @param int    $suppliersId 商家id
    * @return array
    */
   public function getUserAvatar($suppliersId) {
   	
       $bind = [
           ':suppliers_id' => $suppliersId
       ];
       
       $sql = "SELECT u.user_id, u.phone, e.avatar FROM {$this->_table} AS u "
       		. " LEFT JOIN gs_user_extend AS e ON e.user_id = u.user_id "
            . " WHERE suppliers_id = :suppliers_id AND is_delete = '0' ";
 
       $info = $this->fetchRow($sql, $bind);
   }
}
?>

 
 