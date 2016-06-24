<?php
//include(dirname(__FILE__).'/../../config/config.inc.php');
if (_PS_VERSION_ < '1.5') {
	// version 1.4
	require_once(_PS_ROOT_DIR_.'/modules/hipay/hipay-14.php');
} else {
	// Version 1.5 or above
	require_once(_PS_ROOT_DIR_.'/modules/hipay/hipay-15-16.php');
}