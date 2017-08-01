<?php
class baf_SessionRedis implements SessionHandlerInterface{
    private $lifeTime;

    public function create_sid(){
        return session_id();
    }

    public function open($save_path, $session_id)
    {
        $this->lifeTime = intval(ini_get('session.gc_maxlifetime'));
        $this->lifeTime = $this->lifeTime > 0 ? $this->lifeTime : 1800*4;
        $redis = baf_Redis::factory('master');
        if(!$redis){
            return false;
        }
        return true;
    }

    public function read($session_id)
    {
        $redis = baf_Redis::factory();
        $data = $redis->get('mobile:session:'.$session_id);
        return $data?$data:'';
    }

    public function write($session_id, $session_data)
    {
        $redis = baf_Redis::factory();
        $lifeTime = (int)get_cfg_var("session.gc_maxlifetime");
        return $redis->set('mobile:session:'.$session_id,$session_data, $this->lifeTime);
    }

    public function close(){
        return true;
    }

    public function destroy($session_id)
    {
        $redis = baf_Redis::factory();
        return $redis->delete('mobile:session:'.$session_id);
    }

    public function gc($maxlifetime){
        return true;
    }
}