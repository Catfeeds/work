<?php
/**
 * 请求短信系统相关的接口
 * 
 * @author xiaoyanchun
 */
class api_SmsApi extends api_Base
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
    protected $apiProductUrl = 'http://sms.api.7yundong.cn/';
    
    /**
     * 开发环境的api地址
     *
     * @var string
     */
    protected $apiDevelopmentUrl = 'http://sms.api.qydw.net/';
  
    /**
     * 发送短信
     *
     * @param string $phone   手机号码
     * @param string $content 内容
     * @param number $type    类型
     * @return bool
     */
    public function send($phone, $content, $type = 0)
    {
        $params = array();
        $params['action']  = 'send_phone_message';
        $params['phone']   = $phone;
        $params['message'] = $content;
        $params['type']    = $type;
    
        $res = $this->requestGet($params, 'sms');
    
        if (is_array($res) && isset($res['status']) && $res['status'] == '0000') {
            return true;
        }else{
            baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($params). "，response:" . json_encode($res), 'Sms_api_error');
        }
    
        return false;
    }
 
}