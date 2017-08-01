<?php
/**
 * Author: xieyunxia
 * Date: 2016/4/18 15:40
 */
class ActivitySignupCommonModel extends AbstractModel{
    protected $_table = 'gs_activity_signup_common';
    protected $_primary = 'id';

    public function checkExists($param,$fileds='count(s.id) as total'){
        if(empty($param['user_id']) || isset($param['is_need_userinfo'])&&$param['is_need_userinfo']==1&&(empty($param['phone']) || empty($param['name'])) || isset($param['is_need_card'])&&$param['is_need_card']==1&&empty($param['card']) || empty($param['act_id'])){
            return 'no';
        }
        if(isset($param['venues_id'])&&$param['venues_id']>0){//线下
            $sql = "SELECT {$fileds} FROM ".$this->_table." AS s LEFT JOIN `gs_order_info` AS o ON s.order_id=o.order_id LEFT JOIN `gs_activity_signup_user` AS u ON s.id=u.signup_id WHERE o.order_status = 1 AND s.act_id=:act_id ";
            $bindArr=array(':act_id'=>$param['act_id']);
        }else{
            $sql = "SELECT {$fileds} FROM ".$this->_table." AS s  LEFT JOIN `gs_activity_signup_user` AS u ON s.id=u.signup_id  WHERE  s.act_id=:act_id ";
            $bindArr=array(':act_id'=>$param['act_id']);
        }
        $sql .= "AND ( s.user_id=:user_id ";
        $bindArr[':user_id']=$param['user_id'];
        if(!empty($param['is_need_userinfo'])){
            $sql .= " OR u.phone = :phone ";
            $bindArr[':phone']=$param['phone'];
        }
        if(!empty($param['is_need_card'])){
            $sql .= " OR u.card = :card";
            $bindArr[':card']=$param['card'];
        }
        $sql .= ')';
        foreach ($bindArr as $k => $v) {
            $sql=str_replace($k,$v,$sql);
        }
        return $this->fetchOne($sql,$bindArr);
    }

}
