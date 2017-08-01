<?php 
switch ($id) {
	case 'balance':
		$this->display('appwebview/balance.html');
		break;
	case 'coupon':
		$this->display('appwebview/coupon.html');
		break;
	case 'myorder':
		$this->display('appwebview/myorder.html');
		break;
	case 'rule':
		$this->display('appwebview/rule.html');
		break;
	case 'myorderall':
		$this->display('appwebview/myorderall.html');
		break;	
	default:
		# code...
		break;
}