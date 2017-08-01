<?php
/**
* 记录LOG类
* 
* @date 2015-08-30
*/
class baf_Logger
{
    /**
     * 日志目录
     * 
     * @var string
     */
    protected static $logDir = '/home/logs/shangjia.7yundong.cn/';
    
    /**
     * 记录日志的路径
     * 
     * @var string
     */
    public static $path;
    
    /**
     * trace 最大记录层级
     * 
     * @var int
     */
    const MAX_TRACE_LEVEL = 4;
    const SYSTEM_LOG_REDIS_LIST_NAME = "shangjia-system-log";

    const LEVEL_INFO = 0;//info
    const LEVEL_WARNING = 1; // warning
    const LEVEL_ERROR = 2; // error

    /**
     * 获取日志文件路径
     */
    private static function logPath()
    {
        $path = self::$logDir.date('Ymd', CURRENT_TIMESTAMP).'/';
    
        if (!is_dir($path)) {
            mkdir($path, 0755, true);
        }
    
        self::$path = $path;
    }
    
    /**
    * 写LOG文件
    * 
    * @param $content 内容
    * @param $logname LOG名称
    * 
    * @author chenchao
    */
    public static function log2File($content, $logname)
    {
        self::logPath(); //文件夹路径
                
        $logfilename = self::$path.$logname. '.log';
        $str = date('Y-m-d H:i:s') . " ".$content."\r\n";
        if (PHP_VERSION >= '5.0') {
            file_put_contents ( $logfilename, $str, FILE_APPEND);
        } else {
            $fp = @fopen ( $logfilename, 'ab+' );
            if ($fp) {
                fwrite ( $fp, $str );
                fclose ( $fp );
            }
        }
    }
    
    /**
     * 日志
     *
     * @param string $file
     * @param string $priority
     *       EMERG       紧急:系统无法使用  数据库连不上、redis连不上等
     *       ALERT       警告:必须采取行动
     *       CRIT        关键:关键条件
     *       ERR         错误:错误条件
     *       WARN        警告:警告条件
     *       NOTICE      注意:正常的但重要的条件
     *       INFO        信息:信息消息
     *       DEBUG       调试:调试消息
     * @param string $title  标题
     * @param mixed  $logArr  可以是字符串、数组（推荐数组）
     * @example baf_Common::log('file', 'DEBUG', '测试标题', '测试内容');
     * @return boolean
     */
    public static function logTrace($file, $priority, $title, $logArr = '')
    {
        static $logSwitch = null;
    
        $priorities = array('DEBUG', 'INFO', 'WARN', 'ERR', 'CRIT', 'ALERT', 'EMERG');
    
        // 日志分隔符
        $split = ' || ';
    
        $priority = strtoupper($priority);
        if (!in_array($priority, $priorities)) {
            $priority = 'ERR';
        }
    
        // 可在后台控制开关 后台设置的为关闭的
        if (in_array($priority, array('DEBUG', 'INFO', 'WARN'))) {
    
            if ($logSwitch === null) {
                $logSwitch = '';
            }
    
            if (!empty($logSwitch) && !empty($logSwitch[0]) && in_array($priority, $logSwitch)) {
                return false;
            }
    
        }
    
        if (strpos($file, '/') !== false) { // 有包含路径的
            $dir = dirname($file);
            $file = basename($file);
        } else {
            self::logPath();
            $dir = self::$path;
        }
    
        if (!is_dir($dir)) {
            mkdir($dir, 0777, true);
        }
    
        // 获取IP
        if (php_sapi_name() == 'cli') {
            $ip = '127.0.0.1';  // 脚本模式，也记录一下占个位置
        } else {
            $ip = helper_CoreHelper::getClientIp();
        }
    
        // 完整路劲
        $fullFile = $dir . '/' . $file . '.log';
    
        // 获取到上一级执行的类名::方法 或者 文件名::行号
        /*
        $arr = debug_backtrace();
    
        if (isset($arr[1])) { // 是在类的方法中执行
            if (isset($arr[1]['class'])) {
                $backtrace1 = $arr[1]['class'];
                $backtrace2 = $arr[1]['function'];
            } else {
                $backtrace1 = basename($arr[1]['file']);
                $backtrace2 = $arr[1]['line'];
            }
        } else { // 取文件名和行号
            $backtrace1 = basename($arr[0]['file']);
            $backtrace2 = $arr[0]['line'];
        }
    
        $backtrace = $backtrace1 . '::' . $backtrace2;
        */
        
        //-- modify by xiaoyanchun 2015-09-16
        $traces = debug_backtrace();
        $count  = 0;
        $backtrace  = '';
        
        foreach ($traces as $trace) {
            if (isset($trace['file'], $trace['line'])) {
                $backtrace .="\n ".$trace['file'].' ('.$trace['line'].')';
                if(++$count >= self::MAX_TRACE_LEVEL)
                    break;
            }
        }
        //---end
        
        // 日志内容-数组自动处理
        if (is_array($logArr)) {
            $arr = array();
            foreach ($logArr as $k => $v) {
                $v = is_array($v) ? json_encode($v) : $v;
                $arr[] = is_numeric($k) ? $v : ($k . ':' . $v);
            }
            $content = implode($split, $arr);
        } else {
            $content = $logArr;
        }
    
        // 去除换行，确保每条日志是一行
        $content = preg_replace('/(\r\n)|\r|\n/', ' ', $content);
    
        // 完整日志
        $str = date('Y-m-d H:i:s') . ' [' . $priority . '] trace:' . self::getTraceId() . ' ' . $backtrace . "\nip: " .  $ip . "\n[" . $title . ']';
    
        if ($content) {
            $str .= ' == ' . $content;
        }
    
        $fp = fopen($fullFile, "a");
        flock($fp, LOCK_EX);
        fwrite($fp, $str . "\r\n");
        flock($fp, LOCK_UN);
        fclose($fp);
    
        return true;
    }
    
    /**
     * 获取backtrace字符串
     * 
     * @param int $maxTraceLevel
     * @return string
     * @author xiaoyanchun
     */
    public static function getBacktraceString($maxTraceLevel = self::MAX_TRACE_LEVEL)
    {
        $traces = debug_backtrace();
        $count  = 0;
        $backtrace  = array();

        foreach ($traces as $key => $trace) {
            
            if ($key == 0) { // 将调用自己的那一层trace排除
                continue;
            }
            
            if (isset($trace['file'], $trace['line'])) {
                $backtrace[] = $trace['file'].' ('.$trace['line'].')';
                if(++$count >= $maxTraceLevel)
                    break;
            }
        }
        
        $string = '';
        
        if (!empty($backtrace)) {
            $string = implode("\n", $backtrace);
        }

        return $string;
    }
    
    /**
     *
     * @return String
     */
    public static function getTraceId(){
        return CURRENT_TIMESTAMP . rand(10000,99999);
    }

    /**
     * log写到队列
     */
    public static function log2RedisList($category, $content, $level = self::LEVEL_INFO, $venues_id=0)
    {
        if (empty($category)) {
            return false;
        }

        $redis = baf_Redis::factory();

        if (!is_string($category)) {
            throw new InvalidArgumentException('$category 参数不是字符串类型');
        }

        // 如果是数组或对象，进行json编码
        if (is_array($content) || is_object($content)) {
            $content = json_encode($content);
        }

        //分类有可能会有两级  add_order:start
        $position = strpos($category, ':');
        $subCategory = '';
        if ($position > 0) {
            $subCategory = substr($category, $position + 1); // 子分类
            $category = substr($category, 0, $position);
        }

        $object = array(
            "venues_id" => $venues_id,
            "category" => $category,
            "sub_category" => $subCategory,
            "content" => $content,
            "level" => $level,
            "add_time" => time(),
        );

        return $redis->rPush(self::SYSTEM_LOG_REDIS_LIST_NAME, serialize($object));
    }


}