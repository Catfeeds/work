<?php
/**
 * 验证两次密码是否一致
 * 
 * @author xiaoyanchun
 * @date 2016-06-30
 */
trait validate_trait_TwicePasswordIsSame {
	
    /**
     * 检测两次密码是否一致
     * 
     * @param mixed $value
     * @param mixed $rule
     * @param mixed $data
     */
    public function twicePasswordIsSame($value, $rule, $data) {
        if (strcmp($data['password'], $value) == 0) {
            return true;
        } else {
            return '两次密码不一致';
        }
    }
	
}
    