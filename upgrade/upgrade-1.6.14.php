<?php
if (!defined('_PS_VERSION_'))
    exit;

function upgrade_module_1_6_14($object)
{
		/* Update hooks */
		$object->registerHook('displayBackOfficeHeader');
		return true;
}


