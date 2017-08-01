<?php
/**
 * 封装redis基本操作
 */
class baf_BaseRedis extends Redis
{
	public $keyPrefix='cache:';
    /**
     * 序列化值以支持数组等
     * @param string $key
     * @param string $value
     * @param int $timeout
     */
    public function setValue( $key, $value, $timeout = 0 )
    {
        $value = serialize($value);
        return parent::set($this->keyPrefix.$key,$value,$timeout);
    }

    /**
     * @param string $key
     * @return string
     */
    public function getValue($key)
    {
    	$val = parent::get($this->keyPrefix.$key);
        $val = $val ? unserialize($val) : $val;
        if(is_array($val)){
        	return $val[0];
        }
        return false;
    }
}
