<?php
/**
 * Author: xieyunxia
 * Date: 2016/7/13
 */
class ActivitySignupUserModel extends AbstractModel{
    protected $_table = 'gs_activity_signup_user';
    protected $_primary = 'id';

    public function addUser($param)
    {
        return $this->multiInsert($param);
    }



}
