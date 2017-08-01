<?php
/**
 * 场馆管理员模型类
 * 
 * @author xiaoyanchun
 * @date 2016-07-04
 */
class SuppliersAdminModel extends AbstractModel
{
    /**
     * 获取商家的管理员数组  
     * 返回格式: [管理员id => 管理员名称] 
     * 
     * @param int $suppliersId 商家id
     * @return array
     */
	public function getSuppliersAdminArr($suppliersId) {
	    $ret = [];
	    
	    if ($suppliersId <= 0) {
	        return $ret;
	    }
	    
	    $sqls = "SELECT id, admin_name FROM gs_suppliers_admin WHERE suppliers_id = :suppliers_id AND status = '1' ";
	    $list = $this->fetchAll($sqls, [':suppliers_id' => $suppliersId]);
	    
	    if (!empty($list)) {
	        $ret = array_column($list, 'admin_name', 'id');
	    }
	    
	    return $ret;
	}
}