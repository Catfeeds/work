<?php
/**
 * 验证错误助手类
 * 
 * @author xiaoyanchun
 * @date   2016-06-17
 */
class validate_Helper
{
    /**
     * 保存数据的数组
     * 
     * @var array
     */
    private $_data = [];
    
    /**
     * 保存错误的数组
     * 
     * @var array
     */
    private $_errs = [];
    
    /**
     * 构造函数
     * 
     * @param array $data
     */
    public function __construct(array $data = []) {
        $this->setDatas($data);
    }
    
    
    /**
     * 单个设置数据
     *
     * @param string $name
     * @param string $value
     */
    public function setData($name, $value) {
    
        if (!is_string($name)) {
            throw new Exception('validate_Helper:设置数据的名称只能为字符串');
        }
    
        $this->_data[$name] = $value;
    }
    
    /**
     * 获取数据
     * 
     * @return mixed
     */
    public function getData($name, $default = null) {
        
        if (isset($this->_data[$name])) {
            return $this->_data[$name];
        }
        
        return $default;
    }
    
    /**
     * 批量设置数据
     *
     * @param array $errors
     */
    public function setDatas(array $data) {
        foreach ($data as $name => $value) {
            $this->setData($name, $value);
        }
    }
    
    /**
     * 获取所有的数据
     * 
     * @return array
     */
    public function getDatas() {
        return $this->_data;
    }
    
    /**
     * 单个设置错误信息
     * 
     * @param string $name
     * @param string $value
     */
    public function setError($name, $value) {
        
        if (!is_string($name)) {
            throw new Exception('validate_Helper:设置错误信息的名称只能为字符串');
        }
        
        $this->_errs[$name] = $value;
    }
    
    /**
     * 获取错误信息
     * 
     * @param string $name
     */
    public function getError($name) {
        if (isset($this->_errs[$name])) {
            return $this->_errs[$name];
        }
    }
    
    /**
     * 批量设置错误
     * 
     * @param array $errors
     */
    public function setErrors(array $errors) {
        foreach ($errors as $name => $value) {
            $this->setError($name, $value);
        }
    }
    
    /**
     * 获取所有错误信息
     * 
     * @return array
     */
    public function getErrors() {
        return $this->_errs;
    }
    
}
