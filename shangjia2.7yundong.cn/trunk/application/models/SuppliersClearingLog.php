<?php
/**
 * 结算记录模型类
 * 
 * @author xiaoyanchun
 * @date 2016-07-06
 */
class suppliersClearingLogModel extends AbstractModel
{
    /**
     * 表名
     *
     * @var string
     */
    protected $_table = 'gs_suppliers_clearing_log';
    
    /**
     * 主键
     *
     * @var string
     */
    protected $_primary = 'id';
    
    /**
     * 获取场馆某段时间内的结算记录
     * 
     * @param int $suppliersId 商家id
     * @param int $startDate   开始日期(格式: YYYY-MM-dd)
     * @param int $endDate     结束日期(格式: YYYY-MM-dd)
     * @return array
     * @author xiaoyanchun
     */
    public function getTimeRangeList($suppliersId, $startDate, $endDate) {
        $bind = [
            ':suppliers_id' => $suppliersId,
        ];
        
        $where = '';
        
        if ($startDate && helper_CoreHelper::isLawfulDate($startDate)) {
            $where .= " AND clearing_time >= :start_time ";
            $bind[':start_time'] = strtotime($startDate);
        }
        
        if ($endDate && helper_CoreHelper::isLawfulDate($endDate)) {
            $where .= " AND clearing_time <= :end_time ";
            $bind[':end_time'] = strtotime($endDate) + 86400 - 1;
        }
        
        $sql = "SELECT cycle_start_time, cycle_end_time, clearing_time, total_settle_amount, status FROM {$this->_table} WHERE suppliers_id=:suppliers_id {$where} ";

        return $this->fetchAll($sql, $bind);
    }
    
}