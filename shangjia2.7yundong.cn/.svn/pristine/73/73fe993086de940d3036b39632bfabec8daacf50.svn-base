<?php 
/**
 * 加载器
 * 
 * @author xiaoyanchun
 * @date 2016-06-18
 */
class Loader
{
    /**
     * 获取主数据库的连接
     *
     * @param string $className
     */
    public static function modelMaster($className = '')
    {
        return self::model($className, 'master');
    }
    
    /**
     * 获取从数据库的连接
     *
     * @param string $className
     */
    public static function modelSlave($className = '')
    {
        return self::model($className, 'slave');
    }
    
    /**
     * 获取db连接
     *
     * @param string $className
     * @param string $dbServer  master|slave
     * @return object
     */
    private static function model($className = '', $dbServer = 'master')
    {
        static $instance = array();
    
        if (!$className) { // 如果没有传具体的模型类名，则返回一个空的模型(没有指定数据表的数据库连接)
            $className = 'empty';
        }
    
        $className = ucfirst($className) . 'Model';
    
        $cacheKey = $className . '-' . $dbServer;
         
        if (empty($instance[$cacheKey])) {
    
            $dbConfig = baf_Common::getConfig('database');
    
            if (!isset($dbConfig[$dbServer])) {
                throw new Exception("数据库配置未找到: {$dbServer}");
            }
    
            $pdo = baf_Mysql::factory($dbServer, $dbConfig[$dbServer]);
            $instance[$cacheKey] = new $className($pdo);
        }
    
        return $instance[$cacheKey];
    }
    
    /**
     * 获取business数据库连接
     *
     * @param string $className
     * @param string $dbServer
     * @throws Exception
     * @return object
     */
    public static function businessModel($className = '', $dbServer = 'master')
    {
        static $instance = array();
    
        if (!$className) { // 如果没有传具体的模型类名，则返回一个空的模型(没有指定数据表的数据库连接)
            $className = 'empty';
        }
    
        $className = ucfirst($className) . 'Model';
         
        $cacheKey = $className . '-' . $dbServer;
         
        if (empty($instance[$cacheKey])) {
    
            $dbName = 'business';
    
            $dbConfig = baf_Common::getConfig('database', $dbName);
    
            if (empty($dbConfig)) {
                throw new Exception("数据库配置未找到: {$dbName}");
            }
    
            $pdo = baf_Mysql::factory($dbName.'-'.$dbServer, $dbConfig);
            $instance[$cacheKey] = new $className($pdo);
        }
    
        return $instance[$cacheKey];
    }
    
    /**
     * 加载验证类
     * 
     * @param string $name 验证类名
     * @throws Exception 
     * @return validate_Validate
     */
    public static function validate($name = '', array $rules = [], array $message = []) {
        $class = 'validate_Validate'; // 默认验器
        
        if ($name) {
            $class = "validate_{$name}";
        }
        
        if (!class_exists($class)) {
            throw new Exception("验证类 {$class} 不存在");
        }
        
        $validate = new $class($rules, $message);

        if (!$validate instanceof validate_Validate) {
            throw new Exception("验证类 {$class} 不存在必须继承 validate_Validate 类");
        }
        
        return $validate;
    }
    
    /**
     * 创建api对象(只需传类名即可， 前缀和后缀会自动拼 例如： 'api_'.$apiName.'Api')
     * 
     * @param string $apiName
     * @return object
     * @throws Exception
     */
    public static function api($apiName)
    {
        if (empty($apiName)) {
            throw new Exception("apiName 不能为空");
        }
        
        $class = 'api_'.ucfirst($apiName).'Api';
        
        if (!class_exists($class)) {
            throw new Exception("api类 {$class} 不存在");
        }

        $obj = new $class;
        
        if (!$obj instanceof api_Base) {
            throw new Exception("子类 {$class} 必须是 api_Base 子类");
        }
        
        if (!$obj->getApiKey()) {
            throw new Exception("子类 ".get_class ($obj)." 属性 apiKey 不能为空");
        }
         
        if (!$obj->getApiUrl()) {
            throw new Exception("子类 ".get_class ($obj)." 属性 apiProductUrl 或 apiDevelopmentUrl 不能为空");
        }
    
        return $obj;
    }
    
}