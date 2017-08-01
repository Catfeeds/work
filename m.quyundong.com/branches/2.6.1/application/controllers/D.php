<?php
/**
 * app下载入口
 *  
 * @author bigticket
 */
class DController extends DefaultController {
    public function indexAction(){
    	Yaf_Dispatcher::getInstance()->autoRender(FALSE);
		$this->getView()->display('d/coach.php');
    }
    
    /**
     *  教练端下载页面
     * 
     * @author bigticket
    */
    public function CoachAction(){
        $this->render('coach');
	}
	
	
	
	/**
	 * 与京东会员合作兑换优惠券
	 * 
	 * @author an
	 */
	public function JdvipAction(){
		$Config = new Config();
		//APP下载地址(默认安卓)
		$app_url = $Config->getDomain('www').'ad-download.html?medium=android&source=jd&campaign=&term=&';
		if ( isset($_SERVER["HTTP_USER_AGENT"]) && !empty($_SERVER["HTTP_USER_AGENT"]) ){
			$useragent = isset($_SERVER["HTTP_USER_AGENT"]) ? trim($_SERVER["HTTP_USER_AGENT"]) : '';
			//微信()
			if(strpos($useragent, 'MicroMessenger') ){//|| strpos($useragent, 'MQQBrowser')
				$app_url = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.gosport';
			}
			//苹果系统
			elseif( strpos($useragent, 'iPhone') || strpos($useragent, 'iPad')){
				$app_url = 'https://itunes.apple.com/cn/app/qu-yun-dong-yu-mao-qiu-zu/id717619906?mt=8';
			}
			//安桌系统
			elseif(strpos($useragent, 'Android')){
				$app_url = $Config->getDomain('www').'ad-download.html?medium=android&source=jd&campaign=&term=&';
			}
		}
		
		$this->_view->assign(array('app_url' => $app_url));
		
		Yaf_Dispatcher::getInstance()->autoRender(FALSE);
		$this->getView()->display('d/jdvip_app.php');
	}
	
	
}
