<?php
/**
 * HiPay 
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Apache 2.0 License
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * @author HiPay <support.wallet@hipay.com>
 * @copyright Copyright (c) 2016 - HiPay
 * @license http://www.apache.org/licenses/LICENSE-2.0 Apache 2.0 License
 */

if (_PS_VERSION_ < '1.5') {
	// version 1.4
	require_once(_PS_ROOT_DIR_.'/modules/hipay/hipay-14.php');
} else {
	// Version 1.5 or above
	require_once(_PS_ROOT_DIR_.'/modules/hipay/hipay-15-16.php');
}