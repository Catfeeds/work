<?php
/**
 * 入口文件
 */
define("RUMSTARTTIME", microtime(TRUE));
define("APP_PATH", realpath(dirname(__FILE__).'/../'));
define('CURRENT_TIMESTAMP', $_SERVER['REQUEST_TIME']);

//session 过期时间设置为6个小时
ini_set('session.gc_maxlifetime', 3600*6);
ini_set('session.cookie_lifetime', 3600*6);
session_start();

$app  = new Yaf_Application(APP_PATH . "/conf/application.ini");

require_once APP_PATH . "/conf/define_base.php";

$app->bootstrap()->run();
