<?php
/**
 * @name ErrorController
 * @desc 错误控制器, 在发生未捕获的异常时刻被调用
 * @see http://www.php.net/manual/en/yaf-dispatcher.catchexception.php
 * @author root
 */
class ErrorController extends BaseController
{
	//从2.1开始, errorAction支持直接通过参数获取异常
	public function errorAction($exception)
	{
	    // 重新设置视图目录， 防止多模块的时候把view目录指向到了模块的view目录
	    $this->setViewPath(APP_PATH.'/application/views');
		//baf_Logger::logTrace('error', 'EMERG', '异常错误',$exception);

        /* error occurs */  
        switch ($exception->getCode()) {  
            case YAF_ERR_NOTFOUND_MODULE:  
            case YAF_ERR_NOTFOUND_CONTROLLER:  
            case YAF_ERR_NOTFOUND_ACTION:  
            case YAF_ERR_NOTFOUND_VIEW:  
                //404
                $this->redirect("/");
                break;  
            default :  
               	$this->display('error', ['exception' => $exception,'errorMsg'=>IS_PRODUCT_ENVIRONMENT ? 'NOT FOUND!' : '']);
                break;  
        }  

	}
	

}