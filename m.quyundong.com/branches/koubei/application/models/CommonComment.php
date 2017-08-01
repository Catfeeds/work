<?php
/**
 * 公共评论
 *
 * @param
 */
class CommonCommentModel extends AbstractModel{
    protected $_table = 'gs_common_comment';
    protected $_primary = 'id';
    /**
     * 判断是否存在，并且返回个数
     *
     * @param [array] [array(
     *    'relation_id'=>1,
     *    'user_id'    =>1,
     *    'is_show'    =>1,
     *    'comment_type'=>0,//评论类型
     * )]
     */
    public function checkExists($param){
        $sql     = "SELECT count(*) as total FROM ".$this->_table." AS cc WHERE ";
        $where   = '';
        $bindArr = array();
        foreach ($param as $k => $v) {
            if($bindArr)
                $where  .= " AND cc.{$k}=:{$k} ";
            else
                $where  .= " cc.{$k}=:{$k} ";
            $bindArr[":{$k}"]=$v;
        }
        $sql .= $where.' order by id DESC';
        return $this->fetchOne($sql,$bindArr);
    }
    //添加评论
   public function addComment($param){
       if(empty($param['user_id']) || $param['user_id'] < 1 || empty($param['relation_id']) || $param['relation_id'] < 1 || empty($param['content']) || empty($param['ip_address'])) return false;
       if($this->commentLimit('relation_id'.$param['relation_id'].'type'.$param['comment_type'],$param['user_id'])){
           return -1;
       }

       //插入记录
       $insert = array(
           'user_id' => $param['user_id'],
           'comment_type' => $param['comment_type'],
           'add_time' => CURRENT_TIMESTAMP,
           'relation_id' => $param['relation_id'],
           'content' => $param['content'],
           'ip_address' => $param['ip_address'],
       );
       $insertId = $this->insert($insert);
       if($insertId > 0){
           $this->setLimit($param['user_id'],'relation_id'.$param['relation_id'].'type'.$param['comment_type']);
       }
       return $insertId;
   }
    //发帖限制
    protected function commentLimit($hz='',$uid,$content=''){
        if($uid < 1) return false;
        $key = 'm_comment:comment_limit:'.$uid.$hz;
        $redis = baf_Redis::factory('master');
        $limit = $redis->get($key);
        if($limit == 1){
            return true;
        }
        return false;
    }

    //设置限制
    protected function setLimit($uid,$hz){
        if($uid < 1) return false;
        $redis = baf_Redis::factory('master');
        $key = 'm_comment:comment_limit:'.$uid.$hz;
        $redis->set($key,1);
        $timeLimit = api_Config::getConfigByKey('forum_post_time_limit',300,'forum_api:config:');
        $redis->expire($key, $timeLimit);  //设置30秒限制
    }


    public function getConmentList($param)
    {
        $sql     = "SELECT cc.* FROM ".$this->_table." AS cc WHERE ";
        $start = ($param['page'] - 1) * $param['page_size'];
        $where = " cc.is_show=1 AND cc.comment_type={$param['comment_type']}";
        if(isset($param['is_unicom_comment'])&&$param['is_unicom_comment']){
            $where .= " AND cc.relation_id in({$param['relation_id']})";
        }else {
            $where .= " AND cc.relation_id={$param['relation_id']}";
        }
        $sql .= $where.' order by cc.is_top DESC,cc.top_weight DESC,cc.id DESC LIMIT '.$start.','.$param['page_size'];
        return $this->fetchAll($sql);
    }
    public function getCount($param)
    {
        $sql     = "SELECT count(cc.id) as total FROM ".$this->_table." AS cc LEFT JOIN `gs_user_extend` as ue ON cc.user_id=ue.user_id WHERE ";
        $start = ($param['page'] - 1) * $param['page_size'];
        $where = " cc.is_show=1 AND cc.comment_type={$param['comment_type']}";
        if(isset($param['is_unicom_comment'])&&$param['is_unicom_comment']){
            $where .= " AND cc.relation_id in({$param['relation_id']})";
        }else {
            $where .= " AND cc.relation_id={$param['relation_id']}";
        }
        $sql .= $where;
        return $this->fetchOne($sql);
    }
}
