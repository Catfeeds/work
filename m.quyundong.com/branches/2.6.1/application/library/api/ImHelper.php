<?php
/**
 * 
 * @author zhuangsheng
 *
 */
class api_ImHelper extends api_Base
{
    /**
     * 融云app key
     *
     * @var string
     */
    const RONG_YUN_APP_KEY = 'k51hidwq1mahb';

    /**
     * 融云 app secret
     *
     * @var string
     */
    const RONG_YUN_APP_SECRET = 'RXLpEzpVaH1F2';

    /**
     * @var 缓存SDK实例
     */
    private static $_imToken = null;

    /**
     * 取融云SDK实例
     *
     */
    protected static function getImToken()
    {
        if(is_null(self::$_imToken)){
            if(!class_exists('api_ImToken')){
                throw new Exception('融云SDK不存在！');
            }
            if(getenv('PAY_HOST')){
                $key = self::RONG_YUN_APP_KEY;
                $secret = self::RONG_YUN_APP_SECRET;
            }
            else{
                $key = 'tdrvipksr86v5';
                $secret = 'sK0QAq7gVtdTxi';
            }            
            
            self::$_imToken = new api_ImToken($key,$secret,'json');
        }
        return self::$_imToken;
    }

    /**
     * 加入黑名单
     * @param $user_id
     * @param $black_user_id
     * @return bool
     */
    public static function addBlackList(array $param)
    {
        try{
            $imToken = self::getImToken();
            $res_json = $imToken->userBlacklistAdd($param['user_id'],$param['black_user_id']);
            $res_arr = json_decode($res_json,true);
            if(is_array($res_arr) && $res_arr['code'] == 200){
                return true;
            }else{
                throw new Exception($res_json);
            }
        }catch (Exception $e){
            //出错写入log
            baf_Common::log('blacklist','ERR','加入融云黑名单出错', '发送：' . json_encode($param) . ' ERROR : ' . $e->getMessage());
            return false;
        }
    }

    /**
     * 移除黑名单
     * @param $user_id
     * @param $black_user_id
     * @return bool
     */
    public static function removeBlackList(array $param)
    {
        try{
            $imToken = self::getImToken();
            $res_json = $imToken->userBlacklistRemove($param['user_id'],$param['black_user_id']);
            $res_arr = json_decode($res_json,true);
            if(is_array($res_arr) && $res_arr['code'] == 200){
                return true;
            } else {
                throw new Exception($res_json);
            }
        }catch (Exception $e){
            //出错写入log
            baf_Common::log('blacklist','ERR','移除融云黑名单出错', '发送：' . json_encode($param) . ' ERROR : ' . $e->getMessage());
            return false;
        }
    }
}
