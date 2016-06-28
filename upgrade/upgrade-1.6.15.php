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

if (!defined('_PS_VERSION_'))
    exit;

function upgrade_module_1_6_15($object)
{
	/* Update hooks */
	$object->registerHook('displayBackOfficeHeader');
	return true;
}


