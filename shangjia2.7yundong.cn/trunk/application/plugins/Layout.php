<?php 
/**
 * 布局插件
 * 
 * @author xiaoyanchun
 * @date 2016-06-24
 */
class LayoutPlugin extends Yaf_Plugin_Abstract
{
    /**
     * 路由结束之后触发
     *
     * @param Yaf_Request_Abstract $request
     * @param Yaf_Response_Abstract $response
     */
    public function routerShutdown(Yaf_Request_Abstract $request, Yaf_Response_Abstract $response) {
        // 获取application目录的绝对路径
        $applicationPath = $this->getApplicationPath();
    
        // 获取分发对象
        $dispatcher = Yaf_Dispatcher::getInstance();
    
        // 关闭自动加载模板
        $dispatcher->autoRender(false);
    
        $config = Yaf_Application::app()->getConfig();
        
        // 默认视图模板目录
        $viewsDir = "views";
        
        // 获取模块名称
        $moduleName = $request->getModuleName(); 
        
        // 获取多模块配置
        $modules = $config->application->get('modules'); 

        if ($modules && strtolower($moduleName) != 'index') {// 启用了多模块, 当前的模块不是index模块
            $viewsDir = "modules/{$moduleName}/views";
        }
        
        // 重新设置视图
        $sdkView = new baf_LayoutView($applicationPath.$viewsDir);
        $this->setLayoutInfo($sdkView);
        $dispatcher->setView($sdkView);
    }
    
    /**
     * 设置layout信息
     * 
     * @param baf_LayoutView $sdkView
     * @throws Exception
     */
    private function setLayoutInfo(baf_LayoutView $sdkView) {
        $config = Yaf_Application::app()->getConfig();
        
        // 获取layout配置
        $layoutConfig = $config->get('layout');
        
        if (!$layoutConfig instanceof Yaf_Config_Ini) {
            throw new Exception("未找到layout配置信息");
        }
        
        $sdkView->setLayoutDir(strval($layoutConfig->get('dir')));
        $sdkView->setLayoutFile(strval($layoutConfig->get('file')));
    }
    
    /**
     * 获取application目录的绝对路径
     *
     * @return string
     */
    private function getApplicationPath() {
        $config = Yaf_Application::app()->getConfig();
        $value = $config->application;
    
        if ($value instanceof Yaf_Config_Ini) {
            return $value->directory;
        }
    
        return '';
    }
}