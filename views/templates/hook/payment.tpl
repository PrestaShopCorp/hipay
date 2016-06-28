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
 
{if version_compare($smarty.const._PS_VERSION_, '1.6.0.0', '>=')}<div class="row"><div class="col-xs-12 {if !$hide_left_column && !$hide_right_column}col-md-6{else if !$hide_left_column || !$hide_right_column}col-md-8{else}col-md-12{/if}">{/if}
<p class="payment_module hipay_payment_module">
	{if $cart->getOrderTotal() < 2}
		<a href="">
			<img src="{$this_path}payment_button/{$logo_suffix}.png" alt="{l s='Pay with Hipay' mod='hipay'}" />
			{l s='Minimum amount required in order to pay with Hipay:' mod='hipay'} {convertPrice price=2}
		</a>
	{else}
	<a href="{$redirection_url}" title="{l s='Pay with Hipay' mod='hipay'}">
		<img src="{$this_path}payment_button/{$logo_suffix}.png" alt="{l s='Pay with Hipay' mod='hipay'}" />
		{l s='Pay with Hipay' mod='hipay'} {if !$hipay_prod}{l s='(sandbox / test mode)' mod='hipay'}{/if}
	</a>
	{/if}
</p>
{if version_compare($smarty.const._PS_VERSION_, '1.6.0.0', '>=')}
</div></div>
<style type="text/css">p.hipay_payment_module a { padding-left: 10px; }</style>
{/if}
{if version_compare($smarty.const._PS_VERSION_, '1.5.0.0', '<') && isset($errors)}
<div class="error">
	<ol>
	{foreach from=$errors key=k item=error}
		<li>{$error|escape:'htmlall':'UTF-8'}</li>
	{/foreach}
	</ol>
</div>
{/if}
