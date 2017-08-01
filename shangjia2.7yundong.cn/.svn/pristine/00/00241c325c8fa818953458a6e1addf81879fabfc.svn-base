<?php

/**
 * 用户控制器
 */
class UserController extends BaseController
{
    /**
     * 修改密码
     */
    public function modifyPasswordAction()
    {
        $userId = helper_LoginHelper::getUserField('id');
        if ($userId < 1) {
            throw new Exception('获取用户id失败');
        }
        
        $userModel = Loader::modelMaster('User');
        
        $userInfo = $userModel->find($userId);
        if (empty($userInfo)) {
            throw new Exception("用户不存在");
        }
        
        $validateHelper = new validate_Helper();
         
        if ($this->getRequest()->isPost()) {
            $params = [];
            $params['old_password'] = trim($this->getParam('old_password', ''));
            $params['password'] = trim($this->getParam('password', ''));
            $params['repassword'] = trim($this->getParam('repassword', ''));
        
            // 创建验证器进行验证
            $validate = Loader::validate('ResetPassword');
            if($validate->batch()->check($params)){ // 验证成功
        
                if (helper_CoreHelper::createPassword($params['old_password']) == $userInfo['password']) {
                    $data = [];
                    $data['password'] = helper_CoreHelper::createPassword($params['password']);
                    $data['update_time'] = date('Y-m-d H:i:s', CURRENT_TIMESTAMP);
        
                    $affected = $userModel->update($data, ['id' => $userId]);
                    if ($affected > 0) {
                        $_SESSION['reset_password_flag'] = 1;
                        
                        helper_CoreHelper::addAdminLog('修改密码', '');
                        
                        $this->redirect('/index/user/modifyPassword');
                        return;
                    } else {
                        $validateHelper->setError('tips_error', '更新密码失败');
                    }
                } else {
                    $validateHelper->setError('old_password', '旧密码错误');
                }
            } else { // 验证失败
                $validateHelper->setErrors($validate->getError());
            }
        }
        
        $resetPasswordFlag = 0;
        
        if (isset($_SESSION['reset_password_flag'])) {
            $resetPasswordFlag = 1;
            unset($_SESSION['reset_password_flag']);
        }
        
        $this->display('modifyPassword', [
            'validateHelper' => $validateHelper,
            'resetPasswordFlag' => $resetPasswordFlag,
        ]);
    }

    /**
     * 超级管理员修改密码
     * 
     * @author xiaoyanchun
     */
    public function modifyPasswordSpAction() {
        if (!helper_LoginHelper::isSuperUser()) { // 不是超级管理员
            $this->redirect('/');
            return;
        }
        
        $userId = helper_LoginHelper::getSuperUserField('id');
        if ($userId < 1) {
            throw new Exception('获取用户id失败');
        }
        
        $userModel = Loader::modelMaster('User');
        
        $userInfo = $userModel->find($userId);
        if (empty($userInfo)) {
            throw new Exception("用户不存在");
        }
        
        $validateHelper = new validate_Helper();
         
        if ($this->getRequest()->isPost()) {
            $params = [];
            $params['old_password'] = trim($this->getParam('old_password', ''));
            $params['password'] = trim($this->getParam('password', ''));
            $params['repassword'] = trim($this->getParam('repassword', ''));
        
            // 创建验证器进行验证
            $validate = Loader::validate('ResetPassword');
            if($validate->batch()->check($params)){ // 验证成功
        
                if (helper_CoreHelper::createPassword($params['old_password']) == $userInfo['password']) {
                    $data = [];
                    $data['password'] = helper_CoreHelper::createPassword($params['password']);
                    $data['update_time'] = date('Y-m-d H:i:s', CURRENT_TIMESTAMP);
        
                    $affected = $userModel->update($data, ['id' => $userId]);
                    if ($affected > 0) {
                        $_SESSION['reset_password_flag'] = 1;
                        
                        helper_CoreHelper::addAdminLog('超级管理员修改密码', '');
                        
                        $this->redirect('/index/user/modifyPasswordSp');
                        return;
                    } else {
                        $validateHelper->setError('tips_error', '更新密码失败');
                    }
                } else {
                    $validateHelper->setError('old_password', '旧密码错误');
                }
            } else { // 验证失败
                $validateHelper->setErrors($validate->getError());
            }
        }
        
        $resetPasswordFlag = 0;
        
        if (isset($_SESSION['reset_password_flag'])) {
            $resetPasswordFlag = 1;
            unset($_SESSION['reset_password_flag']);
        }
        
        $this->display('modifyPasswordSp', [
            'validateHelper' => $validateHelper,
            'resetPasswordFlag' => $resetPasswordFlag,
        ]);
        
    }

}