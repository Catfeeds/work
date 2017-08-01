<?php
if (IS_PRODUCT_ENVIRONMENT) { // 正式环境
	define('STMP_HOST', 'smtp.exmail.qq.com');
	define('STMP_PORT', 465);
	define('STMP_USERNAME', 'monitor_auto@ningmi.net');
	define('STMP_PASSWORD', 'dev@123');
} else { // 测试环境
    define('STMP_HOST', 'smtp.exmail.qq.com');
	define('STMP_PORT', 465);
	define('STMP_USERNAME', 'monitor_auto@ningmi.net');
	define('STMP_PASSWORD', 'dev@123');
}
