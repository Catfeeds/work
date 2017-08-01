<?php
/**
 * Author: SZJ
 * Date: 2016/4/18 15:40
 */
class BadmintonSignupModel extends AbstractModel{
    protected $_table = 'wx_badminton_signup';
    protected $_primary = 'id';

    public function checkExists($param){
        if(!isset($param['phone'])||!isset($param['name'])||!isset($param['type'])){
            return false;
        }
        $sql = "SELECT count(id) as total FROM ".$this->_table." WHERE phone=:phone AND `name`=:name AND `type`=:type AND status=1";
        $bindArr=array(':phone'=>$param['phone'],':name'=>$param['name'],':type'=>$param['type']);
        if(isset($param['phase'])){
            $sql .= ' AND `phase`=:phase ';
            $bindArr[':phase']=$param['phase'];
        }
        return $this->fetchOne($sql,$bindArr);
    }

    public function checkCount($type,$phase=''){
        //$key = '7yundong:badminton:signtotal'.$type.$phase;
        //$count = baf_Redis::factory()->get($key);
        //if(!$count) {
            $sql = "SELECT Sum(number) as total FROM " . $this->_table . " WHERE `type` = :rType AND status<>2 AND status<>3";
            $bindArr=array(':rType' => $type);
            if($phase){
                $sql .= " AND `phase`=:phase ";
                $bindArr[':phase']=$phase;
            }
            $count = $this->fetchOne($sql, $bindArr);
            //baf_Redis::factory()->set($key,$count,60);
        //}
        return $count;
    }
    
    public function getByOpenId($openId){
        $sql = "SELECT * FROM ".$this->_table." WHERE open_id=:openId ORDER BY add_time DESC";
        return $this->fetchAll($sql,array(':openId'=>$openId));
    }

    public function getByPhone($phone){
        $sql = "SELECT * FROM ".$this->_table." WHERE phone=:phone AND type=4 ORDER BY add_time DESC";
        return $this->fetchAll($sql,array(':phone'=>$phone));
    }

    public function updateStatus($statusData){
        $status_1 = $status_2 = $status_3 = ARRAY();
        foreach($statusData as $v){
            if($v['status']==1){
                $status_1[] = $v['id'];
            }else if($v['status']==2){
                $status_2[] = $v['id'];
            }else if($v['status']==3){
                $status_3[] = $v['id'];
            }
        }
        //更新数据
        if(!empty($status_1)){
            $status1Str = implode(',',$status_1);
            $this->update(array('status'=>1),"id IN (".$status1Str.")");
        }
        if(!empty($status_2)){
            $status2Str = implode(',',$status_2);
            $this->update(array('status'=>2),"id IN (".$status2Str.")");
        }
        if(!empty($status_3)){
            $status3Str = implode(',',$status_3);
            $this->update(array('status'=>3),"id IN (".$status3Str.")");
        }
    }
    
    public function getByStatusZ(){
        $sql = "SELECT id,order_id,status FROM ".$this->_table." WHERE order_id<>0 AND status=0 LIMIT 50";
        return $this->fetchAll($sql);
    }
}