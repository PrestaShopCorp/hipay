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

/**
 * @since 1.5.0
 */

class HipayRedirectModuleFrontController extends ModuleFrontController
{
	public $display_column_left = false;
	
	public function __construct()
	{
		parent::__construct();
		$this->display_column_left = false;
	}

	public function initContent()
	{
		parent::initContent();
		if (!Context::getContext()->customer)
			Tools::redirect('index.php?controller=authentication&back=order.php');
		$hipay = Module::getInstanceByName('hipay');
		if (Validate::isLoadedObject($hipay))
			if ($hipay->payment() === false)
				return $this->setTemplate('redirect.tpl');
	}
}
