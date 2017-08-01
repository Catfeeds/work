<?php
/**
 * 超级管理员重置密码验证类
 * 
 * @author xiaoyanchun
 * @date 2016-07-12
 */
class validate_ResetPassword extends validate_Validate
{
    use validate_trait_TwicePasswordIsSame;
    
    /**
     * 验证规则
     *
     * @var array
     */
    protected $rule = [
        'old_password'  => ['require', 'max' => 32],
        'password'  => ['require', 'min' => 6, 'max' => 32],
        'repassword'  => ['require','min' => 6, 'max' => 32 , 'twicePasswordIsSame:placeholder'],
    ];

    /**
     * 验证失败的消息
     *
     * @var array
     */
    protected $message  =   [
        'old_password.require' => '请填写旧密码',
        'username.max'     => '旧密码最多不能超过32个字符',
        'password.require' => '请填写密码',
        'password.min'     => '密码不能小于6个字符',
        'password.max'     => '密码最多不能超过32个字符',
        'repassword.require' => '请填写重复密码',
        'repassword.min'     => '重复密码不能小于6个字符',
        'password.max'     => '重复密码最多不能超过32个字符',
    ];
    
   
}