<?php
/**
 * 扩展原生Redis
 * 
 * @author: xiaoyanchun
 * @date: 2015-10-10
 */
class baf_MyRedis extends redis
{
    private $prefix = "shangjia";
    /**
     * 设置数组到redis中
     * 
     * @param string $key
     * @param array  $value
     * @param int $expire
     * @return bool
     */
    public function setArrayValue($key, array $value,  $expire = 0)
    {
        if (!is_string($key) || empty($key)) {
            return false;
        }
        
        $stringValue = json_encode($value);
        
        $res = $this->set($this->prefix.':'.$key, $stringValue);
        
        if ($expire > 0) {
            $this->expire($this->prefix.':'.$key, $expire);
        }
        
        return $res;
    }
    
    /**
     * 获取redis中的数组值
     * 
     * @param string $key
     * @return mixed|boolean
     */
    public function getArrayValue($key)
    {
        if (!is_string($key) || empty($key)) {
            return false;
        }
        
        $jsonString = $this->get($this->prefix.':'.$key);
        
        if ($jsonString) {
            $value = json_decode($jsonString, true);
            if (is_array($value)) {
                return $value;
            }
        }
        
        return false;
    }
    
    /**
     * 删除redis缓存
     *
     * @param string $key
     * @return mixed|boolean
     */
    public function delValue($key)
    {
    	if (!is_string($key) || empty($key)) {
    		return false;
    	}
    
    	$res = $this->del($this->prefix.':'.$key);
    	return $res;
    }
     
}
