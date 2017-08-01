<?php
/**
 * 佣金报表模型类
 * 
 * @author xiaoyanchun
 * @date 2016-07-04
 */
class SuppliersSpreadAccountModel extends AbstractModel
{
    const SPREAD_OLD = 0;
    const SPREAD_NEW = 1;
    
    /**
     * 分页获取佣金报表数据
     * 
     * 搜索条件格式:
     * $search = [];
     * $search['admin_id']   = 3;            // 管理员id
     * $search['start_date'] = '2014-07-18'; // 开始日期
     * $search['end_date']   = '2016-07-04'; // 结束日期
     * 
     * @param array $search    搜索条件数组
     * @param int $suppliersId 商家id
     * @param int $currentPage 当前页
     * @param int $pageSize    每页显示数
     * @return array
     */
   public function getPageSpreadAccount(array $search, $suppliersId, $currentPage = 1, $pageSize = 15) {
       $startTime = strtotime($search['start_date']);
       $endTime   = strtotime($search['end_date'] . " 23:59:59");
       $offset = ($currentPage - 1) * $pageSize;
       
       $bind = [
           ':suppliers_id' => $suppliersId,
           ':start_time' => $startTime,
           ':end_time' => $endTime
       ];
       
       $where = " a.suppliers_id=:suppliers_id AND a.order_add_time >= :start_time AND a.order_add_time <= :end_time ";
       if ($search['admin_id'] > 0){
           $where .= " AND (sl.suppliers_admin_id = '{$search['admin_id']}' OR sln.spread_admin_id='{$search['admin_id']}')";
       }
       
       $countSql = "SELECT COUNT(a.id) FROM gs_suppliers_spread_account AS a "
               ." LEFT JOIN gs_suppliers_spread_log AS sl ON sl.id = a.spread_log_id AND a.spread_type=0 "
               ." LEFT JOIN gs_suppliers_spread_log_new AS sln ON sln.id = a.spread_log_id AND a.spread_type=1 "
               ." LEFT JOIN gs_suppliers_admin AS sa ON sa.id = sl.suppliers_admin_id OR sa.id=sln.spread_admin_id "
               ." WHERE {$where}";
       
       // 获取总记录数
       $totalNum = $this->fetchOne($countSql, $bind);
       $spreadAccountList = [];
       
       if ($totalNum > 0) {
           $sql = "SELECT a.id, sa.admin_name,(CASE WHEN sln.spread_phone IS NOT NULL THEN sln.spread_phone ELSE sl.phone END) AS phone, "
               ." (CASE WHEN sln.spread_time IS NOT NULL THEN sln.spread_time ELSE sl.add_time END) AS add_time, "
               ." a.order_sn, a.order_add_time, a.spread_amount FROM gs_suppliers_spread_account AS a "
               ." LEFT JOIN gs_suppliers_spread_log AS sl ON sl.id = a.spread_log_id AND a.spread_type=0 "
               ." LEFT JOIN gs_suppliers_spread_log_new AS sln ON sln.id = a.spread_log_id AND a.spread_type=1 "
               ." LEFT JOIN gs_suppliers_admin AS sa ON sa.id = sl.suppliers_admin_id OR sa.id=sln.spread_admin_id "
               ." WHERE {$where} ORDER BY a.order_add_time DESC LIMIT {$offset},$pageSize";
           
           $spreadAccountList = $this->fetchAll($sql, $bind);
       }

       return [
          'total_page' => $totalNum > $pageSize ? ceil($totalNum / $pageSize) : 0,
          'list' => $spreadAccountList,
       ];
   }
   
   /**
    * 获取指定时间段推广的二次下单数量
    * 
    * @param int    $suppliersId 商家id
    * @param string $startDate   开始日期 例如: 2016-06-30
    * @param string $endDate     结束日期 例如: 2016-07-30
    * @return int
    */
   public function getSecondOrderCount($suppliersId, $startDate, $endDate) {
       $startTime = strtotime($startDate);
       $endTime   = strtotime($endDate . " 23:59:59");
       
       $bind = [
           ':suppliers_id' => $suppliersId,
           ':start_time' => $startTime,
           ':end_time' => $endTime
       ];
       
       $sql = "SELECT COUNT(*) AS cnt FROM gs_suppliers_spread_account "
            . " WHERE suppliers_id = :suppliers_id AND type = '1' AND order_add_time >= :start_time AND order_add_time <= :end_time ";
 
       return $this->fetchOne($sql, $bind);
   }
   
   /**
    * 统计每个管理员的信息推广佣金
    * 
    * @param int $suppliersId  商家id
    * @param string $startDate 开始日期 例如: 2016-06-30
    * @param string $endDate   结束日期 例如: 2016-07-30
    * @return array
    */
   public function getAdminTotalAmount($suppliersId, $startDate = '', $endDate = '') {
       
       $bind = [':suppliers_id' => $suppliersId];
       $where = " a.type = '0' AND a.suppliers_id=:suppliers_id ";
       
       if ($startDate) {
           $where .= " AND a.order_add_time >= :start_time ";
           $bind[':start_time'] = strtotime($startDate);
       }
       
       if ($endDate) {
           $where .= " AND a.order_add_time <= :end_time ";
           $bind[':end_time'] = strtotime($endDate . " 23:59:59");
       }
       
       $sql = "SELECT SUM(a.spread_amount) AS aumont, sa.admin_name FROM gs_suppliers_spread_account AS a ".
           " LEFT JOIN gs_suppliers_spread_log AS sl ON sl.id = a.spread_log_id AND a.spread_type=0 ".
           " LEFT JOIN gs_suppliers_spread_log_new AS sln ON sln.id = a.spread_log_id AND a.spread_type=1 ".
           " LEFT JOIN gs_suppliers_admin AS sa ON sa.id = sl.suppliers_admin_id OR sa.id=sln.spread_admin_id ".
           " WHERE {$where} GROUP BY sa.id ";

       return $this->fetchAll($sql, $bind);
   }

    /**
     * 取推广记录对应的log
     * log的id和推广方式，推广类型(0旧的推广，1新的推广)
     * @param $log_ids
     * @param $spread_type
     */
    public function getSpreadLogAccount($log_ids,$spread_type){
        $sql = "SELECT spread_log_id,order_add_time FROM gs_suppliers_spread_account WHERE spread_log_id IN(".implode(',',$log_ids).") AND spread_type = ".$spread_type;

        $list = $this->fetchAll($sql);
        return !empty($list) ? array_column($list,NULL,'spread_log_id') : [];
    }
   
}