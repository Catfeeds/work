<?php
/**
 * 推广记录模型类
 * 
 * @author zhuangsheng
 * @date 2016-07-18
 */
class suppliersSpreadLogNewModel extends AbstractModel
{
    /**
     * 表名
     *
     * @var string
     */
    protected $_table = 'gs_suppliers_spread_log_new';
    
    /**
     * 主键
     *
     * @var string
     */
    protected $_primary = 'id';

    /**
     * 是否存在新推广记录
     */
    public function hasLogRecord($suppliers_id){
        //是否存在新的推广记录
        $sql = "SELECT count(id) AS cnt FROM ".$this->_table." WHERE spread_suppliers_id=:suppliers_id";
        return $this->fetchOne($sql,[':suppliers_id'=>$suppliers_id]);
    }
    
}