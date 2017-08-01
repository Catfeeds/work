<?php
/**
 * 所有在Bootstrap类中, 以_init开头的方法, 都会被Yaf调用,
 * 这些方法, 都接受一个参数:Yaf_Dispatcher $dispatcher
 * 调用的次序, 和申明的次序相同
 */
class Bootstrap extends Yaf_Bootstrap_Abstract {
	/**
	 * 初始化配置文件
	 */
	public function _initConfig() {
		$arrConfig = Yaf_Application::app ()->getConfig (); // 把配置保存起来		
// 		Yaf_Dispatcher::getInstance()->autoRender(FALSE);  // 关闭自动加载模板 

		Config::$dbServer = $arrConfig->database->toArray();
		Config::$redisServer = $arrConfig->redis->toArray();
		Config::$apiUrl = $arrConfig->api->toArray();
		
		if ($arrConfig->domain instanceof Yaf_Config_Ini) {
		    Config::setDomains($arrConfig->domain->toArray());
		}

		//定义测试模式
		if(isset($arrConfig->test->mode) && $arrConfig->test->mode == 1){
			define("TESTMODE",1);
		}
	}	
}