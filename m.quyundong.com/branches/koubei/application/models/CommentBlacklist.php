<?php
/**
 * post_blacklist model
 * @author xieyunxia
 *
 */

class CommentBlacklistModel extends AbstractModel
{
    /**
     * 表名
     *
     * @var string
     */
    protected $_table = 'gs_comment_blacklist';

    /**
     * 主键
     *
     * @var string
     */
    protected $_primary = 'id';


    /**
     * 判断用户是否是黑名单
     */
    public function checkUserIsBlack($user_id){
        if($user_id < 1) return false;

        if($this->getBlack($user_id)){
            return true;
        }
        $sql = 'select user_id,add_time,duration from '.$this->_table .' where user_id = ' . $user_id .' limit 1';
        $res = $this->fetchRow($sql);
        if(isset($res['user_id'])){
            if($res['duration'] == 0){
                $this->setBlack($res['user_id'],10*60);
                return true;
            }

            $expire = CURRENT_TIMESTAMP - ($res['add_time'] + $res['duration']);
            if($res['duration'] > 0 && $expire < 0){
                $this->setBlack($res['user_id'],10*60);
                return true;
            }
        }
        return false;
    }

    //设置黑名单缓存
    public function setBlack($user_id,$expire=3600){
        if($user_id < 1 || $expire < 2) return false;

        $key = 'm_comment:comment_black_list:'.$user_id;
        $redis = baf_Redis::factory('master');
        $redis->set($key,1);
        $redis->expire($key, $expire);
    }

    //获取黑名单
    public function getBlack($user_id){
        if($user_id < 1) return false;

        $key = 'm_comment:comment_black_list:'.$user_id;
        $redis = baf_Redis::factory('master');
        return $redis->get($key);
    }

    //检测敏感词
    public function sensitiveContent($content){
        if(!$content) return false;
        $forbiddenContent = api_Config::getConfigByKey('forum_forbidden_content','fuck','forum_api:config:');
        if($forbiddenContent){
            $forbiddenArr = explode(',', $forbiddenContent);
            foreach($forbiddenArr as $low){
                if($low && strpos($content,$low) !== false) return true;
            }
        }
        return false;
    }
}
