{**
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
 *
 *}

<p>
	{l s='Your order on' mod='hipay'} <span class="bold">{$shop_name|escape:'htmlall':'UTF-8'}</span> {l s='is complete.' mod='hipay'}
	<br /><br />
	{l s='You have chosen the HiPay method.' mod='hipay'}
	<br /><br /><span class="bold">{l s='Your order will be sent very soon.' mod='hipay'}</span>
	<br /><br />{l s='For any questions or for further information, please contact our' mod='hipay'} <a href="{$link->getPageLink('contact', true)}" target="_blank">{l s='customer support' mod='hipay'}</a>.
</p>
