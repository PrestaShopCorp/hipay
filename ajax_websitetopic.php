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

/* Getting cookie or logout */
include(dirname(__FILE__).'/../../config/config.inc.php');
require_once(dirname(__FILE__).'/../../init.php');
require_once(dirname(__FILE__).'/hipay.php');

if (Tools::substr(Tools::encrypt('hipay/websitetopic'),0,10) != Tools::getValue('token') || !Module::isInstalled('hipay'))
	die('Bad token');

$params = array(
	'params' => array(
		'locale' => Tools::getValue('locale'),
		'business_line' => Tools::getValue('business_line')
	),
	'method' => 'getWebtopic'
);

echo Hipay::getWsClient()->getWebtopic(Tools::getValue('locale'), Tools::getValue('business_line'));

