<?php
/**
 * 用户验证类
 * 
 * @author xiaoyanchun
 * @date 2016-06-21
 */
class validate_UserLogin extends validate_Validate
{
    /**
     * 验证规则
     *
     * @var array
     */
    protected $rule = [
        'username'  => ['require', 'max' => 32],
        'password'  => ['require', 'max' => 32],
    ];

    /**
     * 验证失败的消息
     *
     * @var array
     */
    protected $message  =   [
        'username.require' => '请填写用户名',
        'username.max'     => '用户名最多不能超过32个字符',
        'password.require' => '请填写密码',
        'password.max'     => '密码最多不能超过32个字符',
    ];
    
}