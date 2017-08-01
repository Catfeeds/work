<?php 
/**
 * SuppliersWeixinPhone.php

 * @author: bumtime
 * @date: 2016-09-29
 * @version: v1.0.0
 */

class SuppliersWeixinPhoneModel extends AbstractModel
{
	/**
	 * 表名
	 *
	 * @var string
	 */
	protected $_table = 'gs_suppliers_weixin_phone';

	/**
	 * 主键
	 *
	 * @var string
	 */
	protected $_primary = 'id';

	/**
	 * 检查是否有没绑定馆掌的微信的手机号
	 *
	 * @param string suppliers_id 商户ID
	 * @return boolean
	 */
	public function checkWeixinPhone($suppliers_id) {
		
		$return_info  = false;
		$sql = "SELECT id, bind_status FROM {$this->_table} WHERE type = 1 AND suppliers_id =:suppliers_id";
		$list = $this->fetchAll($sql, [':suppliers_id' => $suppliers_id]);
		 
		if(empty($list)){
			$return_info = true;
		} else {
			foreach ($list  as $value)
			{
				if($value['bind_status'] == 0){
					$return_info = true;
					break;
				}
			}
		}
		 
		return $return_info;
	
	}
}
?>

 
 