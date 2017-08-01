<?php
/**
 * 此文件主要是定义一些全局共用的常量
 */
 
if(getenv('PAY_HOST') || (isset($_SERVER['SERVER_ADDR']) && in_array($_SERVER['SERVER_ADDR'],array('127.0.0.1')))){
	define('IS_PRODUCT_ENVIRONMENT', 0);	// 是否是正式环境
	define('SHANGJIA_DOMAIN', 'qydw.net');
}
else{	
	ini_set('display_errors', 0);			//正式环境不显示错误
	define('IS_PRODUCT_ENVIRONMENT', 1);	// 是否是正式环境
	define('SHANGJIA_DOMAIN', '7yundong.cn');	
}
error_reporting(E_ALL);	//报告错误报告---错误会写入php配置的error_log文件中