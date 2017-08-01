<?php
/**
 * 入口文件
 */
//session_start();
date_default_timezone_set('Asia/Shanghai');
define("RUMSTARTTIME",microtime(TRUE));
define("APP_PATH",realpath(dirname(__FILE__).'/../'));
$app  = new Yaf_Application(APP_PATH . "/conf/application.ini");
require 'define_base.php';
$app->bootstrap()->run();