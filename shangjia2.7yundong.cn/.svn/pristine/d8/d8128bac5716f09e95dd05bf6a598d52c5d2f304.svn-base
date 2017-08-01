<?php
/**
 * 请求7yundong系统相关的接口
 * 
 * @author chenchao
 */
class api_QydApi extends api_Base
{    
    /**
     * api 秘钥
     * 
     * @var string
     */
    protected $apiKey = '4b111cc14a33b88e37e2e2934f493458';
    
    /**
     * 正式环境的api地址
     *
     * @var string
     */
    protected $apiProductUrl = 'http://api.7yundong.cn/app/v2/';
    
    /**
     * 开发环境的api地址
     *
     * @var string
     */
    protected $apiDevelopmentUrl = 'http://api.qydw.net/app/v2/';

     /**
     * 发送短信
     *
     * @param string $phone   手机号码
     * @param number $type    类型
     * @return bool
     */
    public function sendSmsCode($phone, $type = 0)
    { 
        $params = array();
        $params['action']  = 'get_sms_code';
        $params['phone']   = $phone;
        $params['type']    = $type;
    
        $res = $this->requestGet($params);
    
        if (is_array($res) && isset($res['status']) && $res['status'] == '0000') {
            return true;
        }else{
            baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($params). "，response:" . json_encode($res), 'Qyd_api_error');
        }
    
        return false;
    }
 
}