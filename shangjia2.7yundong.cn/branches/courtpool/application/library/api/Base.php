<?php
/**
 * 接口基础类
 * 
 * @author xiaoyanchun
 * @date 2015-05-09
 */
abstract class api_Base
{    
    /**
     * 本系统的api key 主要是别的系统请求过来时用到
     * 
     * @var string
     */
    const SELF_API_KEY = 'orderapi4a33b88e37e2e2934f493458';    
    
    /**
     * api 秘钥
     *
     * @var string
     */
    protected $apiKey = '';
    
    /**
     * 正式环境的api地址
     *
     * @var string
     */
    protected $apiProductUrl = '';
    
    /**
     * 开发环境的api地址
     *
     * @var string
     */
    protected $apiDevelopmentUrl = '';
    
    /**
     * 是否记录api请求失败的log
     *
     * @var bool
     */
    protected $writeFailedLog = true;
    
    
    /**
     * 加密签名(主要是别的系统请求过来时用到)
     * 
     * @param array $param
     */
    public static function makeSelfsign(array $param, $key = self::SELF_API_KEY)
    {
        if(empty($param)){
            return '';
        }
        unset($param['api_sign']);
        ksort($param);
        
        $s = '';
        foreach ($param as $key=>$row){
            $s .= $key.'='.$row.'&';
        }
        return md5($s.$key);       
    }
     
    /**
     * 加密签名 (主要是请求外部系统使用)
     *
     * @param array $param
     * @return string
     */
    public function makeSign(array $param)
    {
        if (empty($param)) {
            return '';
        }
         
        unset($param['api_sign']);
    
        ksort($param);
    
        $s = '';
        foreach ($param as $key => $row) {
            $s .= $key.'='.$row.'&';
        }
    
        return md5($s.$this->getApiKey());
    }
    
    
    /**
     * 获取api请求地址
     *
     * @return string
     */
    public function getApiUrl()
    {
        if (IS_PRODUCT_ENVIRONMENT) { // 正式环境
            return $this->apiProductUrl;
        }
        
        return $this->apiDevelopmentUrl; // 测试环境 
    }
    
    /**
     * 获取api秘钥
     *
     * @return string
     */
    public function getApiKey()
    {
        return $this->apiKey;
    }
    
    /**
     * api post请求
     * 
     * @param array  $params 参数数组
     * @param string $path   请求的路径
     * @return string|false
     */
    public function requestPost(array $params, $path = '')
    {
        // 添加公共参数
        $params = $this->addPublicParams($params);
    
        // 拼接url
        $url = $this->getApiUrl()."{$path}";
        
        // 请求
        $response = $this->curlPost($url, $params);
    
        $processData = $this->processResponse($response);
    
        if ($processData === false) { // 返回的数据不正确, 返回错误数据
    
            if ($this->writeFailedLog) {
                $logContent  = "Post: url: ".$url." params:".json_encode($params)." response: {$response}";
                baf_Logger::log2RedisList($this->getLogFileName(), $logContent, baf_Logger::LEVEL_ERROR);
            }
            return $response;
        }
    
        // 返回解析后的数据
        return $processData;
    }
    
    /**
     * api get请求
     * 
     * @param array $params 参数数组
     * @param string $path  请求的路径
     * @return string|false
     */
    public function requestGet(array $params, $path = '')
    {
        // 添加公共参数
        $params = $this->addPublicParams($params);

        //拼接URL
        $url = $this->getApiUrl()."{$path}?".http_build_query($params);
     
        // 请求
        $response = $this->curlGet($url);
      
        // 处理返回数据
        $processData = $this->processResponse($response);
    
        if ($processData === false) { // 返回的数据不正确, 返回错误数据
    
            if ($this->writeFailedLog) {
                $logContent  = "Get: uri: {$url} response: {$response}";
                baf_Logger::log2RedisList($this->getLogFileName(), $logContent, baf_Logger::LEVEL_ERROR);
            }
    
            return $response;
        }
    
        // 返回解析后的数据
        return $processData;
    }
    
    /**
     * 添加公共参数
     *
     * @param array $params 参数数组
     * @return array
     */
    public function addPublicParams(array $params)
    {
        if ( empty($params['utm_medium']) ){
            $params['utm_medium'] = 'shangjia.7yundong.cn';
        }
        $params['client_time'] = time();
        
        // 重新生成加密串
        $params['api_sign'] = $this->makeSign($params);
    
        return $params;
    }
    
    /**
     * 获取api请求失败时记录log的log文件名
     *
     * @return string
     */
    protected function getLogFileName()
    {
        return get_class($this);
    }
    
    /**
     * 处理api请求返回的数据
     *
     * @param string $responseData
     * @return false | array 数据解析失败返回false,成功返回解析后的数组
     */
    protected function processResponse($responseData)
    {
        //数据是否合法
        if (!empty($responseData) && is_string($responseData) && in_array($responseData[0], array('[', '{'))) {
            $response = json_decode($responseData, true);
    
            if (is_array($response)) { // 数据解析成功
                return $response;
            }
        }
    
        // 数据格式不符或解析失败返回 false
        return false;
    }
    
    /**
     * curl post请求
     *
     * @param string $url
     * @param string $method
     * @param array $postfields
     * @return string
     */
    public function curlPost($url, array $postData)
    {
        $ch = curl_init();
    
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30 ); // 连接超时
        curl_setopt($ch, CURLOPT_TIMEOUT, 30 ); // 执行超时
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true ); // 文件流的形式返回，而不是直接输出
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postData); // post数据 可为数组、连接字串
    
        $ret = curl_exec($ch);
    
        if (false === $ret) {
            $ret = curl_error($ch);
        }
    
        curl_close($ch);
        return $ret;
    }
    
    /**
     * curl get请求
     *
     * @param string $url
     * @param string $method
     * @param array $postfields
     * @return string
     */
    public function curlGet($url)
    {
        $ch = curl_init ();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30); // 连接超时
        curl_setopt($ch, CURLOPT_TIMEOUT, 30); // 执行超时
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // 文件流的形式返回，而不是直接输出
        curl_setopt($ch, CURLOPT_HEADER, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    
        $ret = curl_exec($ch);
    
        if (false === $ret) {
            $ret = curl_error($ch);
        }
    
        curl_close($ch);
    
        return $ret;
    }

}