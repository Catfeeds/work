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
        Yaf_Dispatcher::getInstance()->autoRender(false);  // 关闭自动加载模板
    }

    /**
     * 初始化插件
     *
     * @param Yaf_Dispatcher $dispatcher
     */
    public function _initPlugin(Yaf_Dispatcher $dispatcher) {
        // 注册layout插件
        $dispatcher->registerPlugin(new LayoutPlugin());
    }
    
}