<?php
class UserBaseController extends DefaultController
{
	protected function init(){
		parent::init();
		if($this->getRequest()->isXmlHttpRequest()){
			$this->isAjax = 1;
		}
		$requestUri = $this->getRequest()->getRequestUri();
		if(strpos($requestUri,'srbac') === false){
			if (!$this->isAjax && CHANNEL_SOURCE=='qqwallet') $this->setReturnUrl($this->redirectUrl());//设置当前地址为referer
			$this->checkLogin();
		}
	}
}