<?php
/**
 * 主页
 */
class IndexController extends BaseController
{
	
    public function indexAction() { //默认Action
		$redirectPath = helper_LoginHelper::getRedirectPath();
		$this->redirect($redirectPath);
    }
    
    
}