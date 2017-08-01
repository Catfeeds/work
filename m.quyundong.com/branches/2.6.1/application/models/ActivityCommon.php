<?php
/**
 * Author: xieyunxia
 * Date: 2016/4/18 15:40
 */
class ActivityCommonModel extends AbstractModel{

    /**
     * 表名
     * @var string
     */
    protected $_table = 'gs_activity_common';

    /**
     * 主键
     * @var string
     */
    protected $_primary = 'act_id';

    /**
     * 获取活动详情数据
     *
     * @date   2016-06-23
     * @param  int $param 查询条件数组
     * @return array      返回查询结果
     */
    public function getOne($param)
    {
        $sql     = "SELECT ac.* FROM ".$this->_table." AS ac WHERE ";
        $where   = '';
        $bindArr = array();
        foreach ($param as $k => $v) {
            if($bindArr)
                $where  .= " AND ac.{$k}=:{$k} ";
            else
                $where  .= " ac.{$k}=:{$k} ";
            $bindArr[":{$k}"]=$v;
        }
        $sql .= $where;
        return $this->fetchRow($sql,$bindArr);
    }

    /**
     * 获取订单商品的数量
     *
     * @author RedBo
     * @date   2016-06-27
     *
     * @param array  $bindArr 查询参数
     * @return array 返回查询结果
     */
    public function getOrderGoodsSum($bindArr)
    {
        $sql = "SELECT IFNULL(SUM(og.goods_number),0) as number
                FROM `gs_order_goods` og LEFT JOIN `gs_order_info` as of
                ON of.order_id  = og.order_id
                WHERE og.goods_id = :goods_id AND of.order_type = 1 AND of.order_status = 1 ";
        return $this->fetchRow($sql,$bindArr);
    }

    /**
     * 获取每个活动分组的子活动数据
     *
     * @author RedBo
     * @date   2016-06-23
     *
     * @param  int $groId 活动名称
     * @return array 返回活动结果
     */
    public function getActivityGroup($groId)
    {
        $sql     = "SELECT `act_id`,`act_group_name` FROM {$this->_table} WHERE is_online = 1 AND gro_id = :groId";
        $bindArr = array(':groId' => $groId);
        return $this->fetchAll($sql,$bindArr);
    }

    /**
     * 获取活动参与的人数
     *
     * @author RedBo
     * @date   2016-06-23
     *
     * @param  float $actPirce 活动价格
     * @return int 活动的参与人数
     */
    public function getActivityJoinInfo($actInfo)
    {
        $joinNum = 0;
        if($actInfo['venues_id'] >0) {
            $joinNum = $this->getOfflineActJoinNum($actInfo['act_id']);
        } else if($actInfo['is_need_userinfo']) {
            $joinNum = $this->getOnlineActJoinNum($actInfo['act_id']);
        }
        return $joinNum;
    }

    /**
     * 获取线下活动参与人数
     * @author RedBo
     * @date   2016-06-28
     * @param  int     $actId 活动的id
     * @return int     活动的参与人数
     */
    private function getOfflineActJoinNum($actId)
    {
        if(!$actId)
            return 0;
        $sql = "SELECT IFNULL(SUM(gasc.number),0) `number`
                FROM `gs_activity_signup_common` `gasc`
                LEFT JOIN `gs_order_info` `of` ON gasc.order_id = of.order_id
                WHERE gasc.act_id = :act_id
                AND of.order_type = 1
                AND of.order_status = 1";

        $bindArr = array(':act_id' => $actId);
        $data = $this->fetchRow($sql,$bindArr);
        return $data ? $data['number'] : 0;
    }

    /**
     * 线上活动参与人数情况
     * @author RedBo
     * @date   2016-06-28
     * @param  int  $actId 活动的id
     * @return int  活动的参与人数
     */
    private function getOnlineActJoinNum($actId)
    {
        if(!$actId)
            return 0;
        $sql     = "SELECT IFNULL(SUM(`number`),0) as number FROM `gs_activity_signup_common` WHERE act_id =:actId";
        $bindArr = [':actId' => $actId];
        $data = $this->fetchRow($sql,$bindArr);
        return $data ? $data['number'] : 0;
    }

    /**
     * 修改活动的阅读次数
     *
     * @author RedBo
     * @date   2016-06-27
     *
     * @param  int     $actId  活动的id
     * @param  integer $number 阅读的次数
     */
    public function changeActReadNum($actId,$number = 1)
    {
        if($actId)
        {
            $sql     = "UPDATE `gs_activity_common` SET `read_number` = `read_number` + :number WHERE act_id = :actId;";
            $bindArr = [':number' => $number,':actId' => $actId];
            $res     = $this->updateBySql($sql,$bindArr);
        }
    }

    /**
     * 获取用户线下活动参与情况
     * @author RedBo
     * @date   2016-06-28
     * @param  int    $act_id 活动的id
     * @param  int    $uid    [description]
     * @return int             [description]
     */
    public function getUserActOrderCount($act_id,$uid)
    {
        if(!$act_id||!$uid)
            return FALSE;
            $sql = "SELECT IFNULL(SUM(gasc.number),0) `number`
                    FROM `gs_activity_signup_common` `gasc`
                    LEFT JOIN `gs_order_info` `of` ON gasc.order_id = of.order_id
                    WHERE gasc.act_id = :act_id
                    AND of.order_type = 1
                    AND of.order_status = 1
                    AND of.user_id = :user_id";
        $bindArr = array(':act_id' => $act_id,':user_id' => $uid);
        $data = $this->fetchRow($sql,$bindArr);
        $number = 0;
        if($data)
            $number = $data['number'];
        return $number;

    }

    /**
     * 获取用户线上订单的参与次数
     *
     * @author RedBo
     * @date   2016-06-28
     * @param  array $parmas 参数数组
     * @return int  返回参与的个数
     */
    public function getUserofflineAactjoinCount($parmas = [])
    {
        if(!$parmas)
            return FALSE;
        $sql = 'SELECT IFNULL(count(`id`),0) as number FROM `gs_activity_signup_common`';
        $where   = '';
        $bindArr = [];
        foreach ($parmas as $k => $v) {
            if(!$bindArr)
                $where  = " WHERE {$k}=:{$k} ";
            else
                $where .=" AND {$k}=:{$k} ";
            $bindArr[":{$k}"]=$v;
        }
        $sql .= $where;
        $data = $this->fetchRow($sql,$bindArr);
        $number = 0;
        if($data)
            $number = $data['number'];
        return $number;
    }
}
