<?php
include './extend_config.php';
if(getenv('PAY_HOST') || (isset($_SERVER['SERVER_ADDR']) && in_array($_SERVER['SERVER_ADDR'],array('127.0.0.1')))){
	define('IS_PRODUCT_ENVIRONMENT', 0);	// 是否是正式环境
}
else{	
	ini_set('display_errors', 0);			//正式环境不显示错误
	define('IS_PRODUCT_ENVIRONMENT', 1);	// 是否是正式环境
}
error_reporting(E_ALL);	//报告错误报告---错误会写入php配置的error_log文件中

define("COOKIE_PATH",'/');
define("COOKIE_DOMAIN",'');
define("COOKIE_PREFIX",'wx_');

define("CURRENT_TIMESTAMP",$_SERVER['REQUEST_TIME']);

define("ATTACHMENT",APP_PATH .'/public/attachment/');
define('TEMPLATE', '/themes/');
define('VERSION','001');

define('API_7YUNDONG', Config::get('api.7yundong').'app/v2/?');
define('API_7YUNDONG_COACH', Config::get('api.7yundong').'app/coach/?');
define('MON_CARD_API_URL', Config::get('api.7yundong').'app/moncard?');
define('COACH_API_HOST',Config::get('api.coach'));
define('COURT_API', Config::get('api.7yundong').'venue?');
define('VENUE_API', Config::get('api.venue').'venues?');
define('USER_API', Config::get('api.user'));
define('TICKET_API', Config::get('api.7yundong').'app/ticket?');
define('USER_CARD_API', Config::get('api.7yundong').'app/usercard/?'); // 会员卡相关api
define('PAY_API', Config::get('api.7yundong').'pay/?');
define('FORUM_IMG_API_URL', Config::get('api.forum').'image?');
define('ORDER_API', Config::get('api.order').'index?');
define('ME_API', Config::get('api.meapi').'business?');
define('FORUM_API', Config::get('api.forum').'post?');//用于获取圈子
define('NEWPAY_API', Config::get('api.pay'));//支付密码
define('WEIXIN_API', Config::get('api.weixin'));//微信api
define('ORDER_API_OTHER', Config::get('api.order').'other?');
define('ORDER_API_COURTJOIN', Config::get('api.order').'courtjoin?');
define('ORDER_API_APPLYREFUND', Config::get('api.order').'index?');

define('SUCCESS_STATUS', '0000');
define('ENCODE_KEY', 'wechat_bigticket_wx');
define('LOGIN_TIME_LIMIT', 259200);//登录有效时长3天

define('NODATAIMG','/themes/qu/images/nodata@2x.png');

/**
 * 用于页面传输，验证数据的完整性添加的key
 *
 * @var string
 * @author xiaosibo
 */
define('WAP_HASH_KEY',   'e9b8de458158717cc919aabd42be0042');
define('QQ_WALLET_APPID', '101347397');
define('QQ_BARGAINOR_ID','1900000109');

/**
 * 请求唯一标识
 */
define('REQUEST_IDENTIFIER', baf_Common::getRequestIdentifier());

class Config {
    public static $redisServer = null;
    public static $dbServer    = null;
    public static $apiUrl = null;
    
    public static $source4Nothing = array(
        'dianping',
    );
    
    public static $source4NotDownload = array(
        'dianping','sougoutong','piaoliang','alisports','liaoning','guangdong','shanghai','dealer_5','decathlon','gagc','xunqiu'
    );

    public static $hideItem = array(
            'liaoning','guangdong','shanghai'
        );
    
    //不开放中继订单的第三方
    public static $relayDenied = array(
            'liaoning','qqwallet','dianping','koubei','alisports','sougoutong','piaoliang','guangdong','shanghai','decathlon'
        );

    //配置渠道项目排序 数组为项目id按key值排序
    public static $sortChannelCategory = array('dealer_5'=>array(13));

    //需在链接保持传递的参数
    public static $preserveParamsKey = array('utm_source','f');
    public static $preserveParams = array();
    
    /**
     * 域名相关配置
     * 
     * @var array
     */
    private static $domains = array();
    
    /**
     * 批量设置域名配置
     * 
     * @param array $domains
     */
    public static function setDomains(array $domains){
        foreach ($domains as $key => $value) {
            self::setDomain($key, $value);
        }
    }
    
    /**
     * 设置域名配置
     * 
     * @param string $key   键名
     * @param mixed  $value 值
     */
    public static function setDomain($key, $value){
        self::$domains[$key] = $value;
    }
    
    /**
     * 获取配置域名
     * 
     * @param string $key     域名配置键名
     * @param string $default 不存在时的默认值
     * @return mixed
     */
    public static function getDomain($key, $default = null){
        if (isset(self::$domains[$key])) {
            return self::$domains[$key];
        }
        return $default;
    }
    
    
    /**
     * 获取配置
     * @param unknown $key
     */
    public static function get($key){
    	static $config;
        $key = explode('.', $key);
        if(!$config) $config = Yaf_Application::app()->getConfig();
     
        if(isset($key[0],$key[1])){
            $key0 = $key[0];
            $key1 = $key[1];
     
            if (isset($config->$key0)) {
                $data = $config->$key0->toArray();
                return isset($data[$key1]) ? $data[$key1] : null;
            }
        }
        return null;
    }
}