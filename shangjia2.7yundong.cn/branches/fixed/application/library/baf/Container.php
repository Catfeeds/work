<?php
/**
 * 容器类
 * 
 * @author xiaoyanchun
 * @date   2016-06-17
 */
class baf_Container implements IteratorAggregate, arrayaccess
{
    /**
     * 容器
     * 
     * @var array
     */
    private $container = [];
    
    /**
     * 单个设置数据
     * 
     * @param string $name
     * @param mixed $value
     */
    public function setItem($key, $item) {
        $this->container[$key] = $item;
    }
    
    /**
     * 设置多个数据
     * 
     * @param array $errors
     */
    public function setItems(array $items) {
        $this->container = array_merge($this->container, $items);
    }
    
    /**
     * 魔术方法-获取属性
     * 
     * @param string $key
     * @return mixed
     */
    public function __get($key) {       
        if (isset($this->container[$key])) {
            return $this->container[$key];
        }
    }
    
    /**
     * 魔术方法-设置属性
     * 
     * @param string $key
     * @param string $value
     */
    public function __set($key, $value) {
        $this->container[$key] = $value;
    }
    
    /**
     * (non-PHPdoc)
     * @see IteratorAggregate::getIterator()
     */
    public function getIterator() {
        return new ArrayIterator($this->container);
    }
    
    /**
     * (non-PHPdoc)
     * @see ArrayAccess::offsetSet()
     */
    public function offsetSet($offset, $value) {
        $this->container[$offset] = $value;
    }
    
    /**
     * (non-PHPdoc)
     * @see ArrayAccess::offsetExists()
     */
    public function offsetExists($offset) {
        return isset($this->container[$offset]);
    }
    
    /**
     * (non-PHPdoc)
     * @see ArrayAccess::offsetUnset()
     */
    public function offsetUnset($offset) {
        unset($this->container[$offset]);
    }
    
    /**
     * (non-PHPdoc)
     * @see ArrayAccess::offsetGet()
     */
    public function offsetGet($offset) {
        return isset($this->container[$offset]) ? $this->container[$offset] : null;
    }
     
}
