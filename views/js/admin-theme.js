/*!
* 2007-2016 PrestaShop 
*
* NOTICE OF LICENSE
*
* This source file is subject to the Open Software License (OSL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/osl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author PrestaShop SA <contact@prestashop.com>
*  @copyright  2007-2016 PrestaShop SA
*  @license    http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*/

//build confirmation modal
function confirm_modal(heading, question, left_button_txt, right_button_txt, left_button_callback, right_button_callback) {
	var confirmModal =
		$j1124('<div class="bootstrap modal hide fade">' +
			'<div class="modal-dialog">' +
			'<div class="modal-content">' +
			'<div class="modal-header">' +
			'<a class="close" data-dismiss="modal" >&times;</a>' +
			'<h3>' + heading + '</h3>' +
			'</div>' +
			'<div class="modal-body">' +
			'<p>' + question + '</p>' +
			'</div>' +
			'<div class="modal-footer">' +
			'<a href="#" id="confirm_modal_left_button" class="btn btn-primary">' +
			left_button_txt +
			'</a>' +
			'<a href="#" id="confirm_modal_right_button" class="btn btn-primary">' +
			right_button_txt +
			'</a>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>');
	confirmModal.find('#confirm_modal_left_button').click(function () {
		left_button_callback();
		confirmModal.modal('hide');
	});
	confirmModal.find('#confirm_modal_right_button').click(function () {
		right_button_callback();
		confirmModal.modal('hide');
	});
	confirmModal.modal('show');
}

//build error modal
/* global error_continue_msg */
function error_modal(heading, msg) {
	var errorModal =
		$j1124('<div class="bootstrap modal hide fade">' +
			'<div class="modal-dialog">' +
			'<div class="modal-content">' +
			'<div class="modal-header">' +
			'<a class="close" data-dismiss="modal" >&times;</a>' +
			'<h4>' + heading + '</h4>' +
			'</div>' +
			'<div class="modal-body">' +
			'<p>' + msg + '</p>' +
			'</div>' +
			'<div class="modal-footer">' +
			'<a href="#" id="error_modal_right_button" class="btn btn-default">' +
			error_continue_msg +
			'</a>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>');
	errorModal.find('#error_modal_right_button').click(function () {
		errorModal.modal('hide');
	});
	errorModal.modal('show');
}

//move to hash after clicking on anchored links
function scroll_if_anchor(href) {
	href = typeof(href) === "string" ? href : $j1124(this).attr("href");
	var fromTop = 120;
	if(href.indexOf("#") === 0) {
		var $target = $j1124(href);
		if($target.length) {
			$j1124('html, body').animate({ scrollTop: $target.offset().top - fromTop });
			if(history && "pushState" in history) {
				history.pushState({}, document.title, window.location.href + href);
				return false;
			}
		}
	}
}

$j1124(document).ready(function() {
	//set main navigation aside
	/* global employee_token */
	function navSidebar(){
		var sidebar = $j1124('#nav-sidebar');
		sidebar.off();
		$j1124('.expanded').removeClass('expanded');
		$j1124('.maintab').not('.active').closest('.submenu').hide();
		sidebar.on('click','.submenu_expand', function(){
			var $navId = $j1124(this).parent();
			$j1124('.submenu-collapse').remove();
			if($j1124('.expanded').length ){
				$j1124('.expanded > ul').slideUp('fast', function(){
					var $target = $j1124('.expanded');
					$target.removeClass('expanded');
					$j1124($navId).not($target).not('.active').addClass('expanded');
					$j1124($navId).not($target).not('.active').children('ul:first').hide().slideDown();
				});
			}
			else {
				$j1124($navId).not('.active').addClass('expanded');
				$j1124($navId).not('.active').children('ul:first').hide().slideDown();
			}
		});
		//sidebar menu collapse
		sidebar.find('.menu-collapse').on('click',function(){
			$j1124(this).toggleClass('icon-rotate-90');

			if ($j1124(this).hasClass('icon-rotate-90')) {
				$j1124(this).css('margin-left', '5px');
				$j1124('.page-head .page-title').css('padding-left', '70px');
				$j1124('.page-head .breadcrumb').css('left', '70px');
				$j1124('.page-head .page-subtitle').css('left', '70px');

			} else {
				$j1124(this).css('margin-left', '');
				$j1124('.page-head .page-title').css('padding-left', '230px');
				$j1124('.page-head .breadcrumb').css('left', '230px');
				$j1124('.page-head .page-subtitle').css('left', '230px');
			}

			$j1124('body').toggleClass('page-sidebar-closed');
			$j1124('.expanded').removeClass('expanded');
			$.ajax({
				url: "index.php",
				cache: false,
				data: "token="+employee_token+'&ajax=1&action=toggleMenu&tab=AdminEmployees&collapse='+Number($j1124('body').hasClass('page-sidebar-closed'))
			});
		});

		var menuCollapse = sidebar.find('.menu-collapse');

		if ($j1124('body').hasClass('page-sidebar-closed')) {
			menuCollapse.addClass('icon-rotate-90');
			menuCollapse.css('margin-left', '5px');
			$j1124('.page-head .page-title').css('padding-left', '70px');
			$j1124('.page-head .breadcrumb').css('left', '70px');
			$j1124('.page-head .page-subtitle').css('left', '70px');

		}
	}

	function navTopbarReset() {
		ellipsed = [];
		$j1124('#ellipsistab').remove();
		$j1124('#nav-topbar ul.menu').find('li.maintab').each(function(){
			$j1124(this).removeClass('hide');
		});
	}

	//agregate out of bounds items from top menu into ellipsis dropdown
	function navTopbarEllipsis() {
		navTopbarReset();
		$j1124('#nav-topbar ul.menu').find('li.maintab').each(function(){
			if ($j1124(this).position().top > 0) {
				ellipsed.push($j1124(this).html());
				$j1124(this).addClass('hide');
			}
		});
		if (ellipsed.length > 0) {
			$j1124('#nav-topbar ul.menu').append('<li id="ellipsistab" class="subtab has_submenu"><a href="#"><i class="icon-ellipsis-horizontal"></i></a><ul id="ellipsis_submenu" class="submenu"></ul></li>');
			for (var i = 0; i < ellipsed.length; i++) {
				$j1124('#ellipsis_submenu').append('<li class="subtab has_submenu">' + ellipsed[i] + '</li>');
			}
		}
	}

	//set main navigation on top
	function navTopbar() {
		navTopbarReset();
		$j1124('#nav-sidebar').attr('id','nav-topbar');
		var topbar = $j1124('#nav-topbar');
		topbar.off();
		$j1124('span.submenu_expand').remove();
		$j1124('.expanded').removeClass('expanded');
		// expand elements with submenu
		topbar.on('mouseenter', 'li.has_submenu', function(){
			$j1124(this).addClass('expanded');
		});
		topbar.on('mouseleave', 'li.has_submenu', function(){
			$j1124(this).removeClass('expanded');
		});
		// hide element over menu width on load
		navTopbarEllipsis();
		//hide element over menu width on resize
		$j1124(window).on('resize', function() {
			navTopbarEllipsis();
		});
	}

	//set main navigation for mobile devices
	function mobileNav() {
		navTopbarReset();
		// clean actual menu type
		// get it in navigation whatever type it is
		var navigation = $j1124('#nav-sidebar,#nav-topbar');
		navigation.find('.menu').hide();
		var submenu = "";
		// clean trigger
		navigation.off().attr('id','nav-mobile');
		$j1124('span.menu-collapse').off();
		navigation.on('click.collapse','span.menu-collapse',function(){
			if ($j1124(this).hasClass('expanded')){
				$j1124(this).html('<i class="icon-align-justify"></i>');
				navigation.find('ul.menu').hide();
				navigation.removeClass('expanded');
				$j1124(this).removeClass('expanded');
				//remove submenu when closing nav
				$j1124('#nav-mobile-submenu').remove();
			}
			else {
				$j1124(this).html('<i class="icon-remove"></i>');
				navigation.find('ul.menu').removeClass('menu-close').show();
				navigation.addClass('expanded');
				$j1124(this).addClass('expanded');
			}
		});
		//get click for item which has submenu
		navigation.on('click.submenu','.maintab.has_submenu a.title', function(e){
			e.preventDefault();
			navigation.find('.menu').addClass('menu-close');
			$j1124('#nav-mobile-submenu').remove();
			//create submenu
			submenu = $j1124('<ul id="nav-mobile-submenu" class="menu"><li><a href="#" id="nav-mobile-submenu-back"><i class="icon-arrow-left"></i>'+ $j1124(this).html() +'</a></li></ul>');
			submenu.append($j1124(this).closest('.maintab').find('.submenu').html());
			//show submenu
			navigation.append(submenu);
			submenu.show();
		});
		navigation.on('click.back','#nav-mobile-submenu-back',function(e){
			e.preventDefault();
			submenu.remove();
			navigation.find('.menu').removeClass('menu-close').show();
		});
	}

	//unset mobile nav
	function removeMobileNav(){
		var navigation = $j1124('#nav-mobile');
		$j1124('#nav-mobile-submenu').remove();
		$j1124('span.menu-collapse').html('<i class="icon-align-justify"></i>');
		navigation.off();
		if ($j1124('body').hasClass('page-sidebar')){
			navigation.attr('id',"nav-sidebar");
			navSidebar();
		} else if ($j1124('body').hasClass('page-topbar')){
			navigation.attr('id',"nav-topbar");
			navTopbar();
		}
		navigation.find('.menu').show();
	}

	//init main navigation
	function initNav(){
		if ($j1124('body').hasClass('page-sidebar')){
			navSidebar();
		}
		else if ($j1124('body').hasClass('page-topbar')) {
			navTopbar();
		}
	}

	//show footer when reach bottom
	function animateFooter(){
		if($j1124(window).scrollTop() + $j1124(window).height() === $j1124(document).height()) {
			$j1124('#footer:hidden').removeClass('hide');
		} else {
			$j1124('#footer').addClass('hide');
		}
	}

	//scroll top
	function animateGoTop() {
		if ($j1124(window).scrollTop()) {
			$j1124('#go-top:hidden').stop(true, true).fadeIn();
			$j1124('#go-top:hidden').removeClass('hide');
		} else {
			$j1124('#go-top').stop(true, true).fadeOut();
		}
	}

	var ellipsed = [];
	initNav();

	// prevent mouseout + direct path to submenu on sidebar uncollapsed navigation + avoid out of bounds
	var closingMenu, openingMenu;
	$j1124('li.maintab.has_submenu').hover(function() {
		var submenu = $j1124(this);
		if (submenu.is('.active') && submenu.children('ul.submenu').is(':visible')) {
			return;
		}
		clearTimeout(openingMenu);
		clearTimeout(closingMenu);
		openingMenu = setTimeout(function(){
			$j1124('li.maintab').removeClass('hover');
			$j1124('ul.submenu.outOfBounds').removeClass('outOfBounds').css('top',0);
			submenu.addClass('hover');
			var h = $j1124( window ).height();
			var x = submenu.find('.submenu li').last().offset();
			var l = x.top + submenu.find('.submenu li').last().height();
			var f = 25;
			if ($j1124('#footer').is(':visible')){
				f = $j1124('#footer').height() + f;
			}
			var s = $j1124(document).scrollTop();
			var position = h - l - f + s;
			var out = false;
			if ( position < 0) {
				out = true;
				submenu.find('.submenu').addClass('outOfBounds').css('top', position);
			}
		},50);
	}, function() {
		var submenu = $j1124(this);
		closingMenu = setTimeout(function(){
			submenu.removeClass('hover');
		},250);
	});

	$j1124('ul.submenu').on('mouseenter', function(){
		clearTimeout(openingMenu);
	});

	//media queries - depends of enquire.js
	/*global enquire*/
	enquire.register('screen and (max-width: 1200px)', {
		match : function() {
			if( $j1124('#main').hasClass('helpOpen')) {
				$j1124('.toolbarBox a.btn-help').trigger('click');
			}
		},
		unmatch : function() {

		}
	});
	enquire.register('screen and (max-width: 768px)', {
		match : function() {

			$j1124('body.page-sidebar').addClass('page-sidebar-closed');
		},
		unmatch : function() {
			$j1124('body.page-sidebar').removeClass('page-sidebar-closed');
		}
	});
	enquire.register('screen and (max-width: 480px)', {
		match : function() {
			$j1124('body').addClass('mobile-nav');
			mobileNav();
		},
		unmatch : function() {
			$j1124('body').removeClass('mobile-nav');
			removeMobileNav();
		}
	});

	//bootstrap components init
	$j1124('.dropdown-toggle').dropdown();
	$j1124('.label-tooltip, .help-tooltip').tooltip();
	$j1124('#error-modal').modal('show');

	//init footer
	animateFooter();

	// go on top of the page
	$j1124('#go-top').on('click',function() {
		$j1124('html, body').animate({ scrollTop: 0 }, 'slow');
		return false;
	});

	var timer;
	$j1124(window).scroll(function() {
		if(timer) {
			window.clearTimeout(timer);
		}
		timer = window.setTimeout(function() {
			animateGoTop();
			animateFooter();
		}, 100);
	});

	// search with nav sidebar closed
	$j1124(document).on('click', '.page-sidebar-closed .searchtab' ,function() {
		$j1124(this).addClass('search-expanded');
		$j1124(this).find('#bo_query').focus();
	});

	$j1124('.page-sidebar-closed').click(function() {
		$j1124('.searchtab').removeClass('search-expanded');
	});

	$j1124('#header_search button').on('click', function(e){
		e.stopPropagation();
	});

	//erase button search input
	if ($j1124('#bo_query').val() !== '') {
		$j1124('.clear_search').removeClass('hide');
	}

	$j1124('.clear_search').on('click', function(e){
		e.stopPropagation();
		e.preventDefault();
		var id = $j1124(this).closest('form').attr('id');
		$j1124('#'+id+' #bo_query').val('').focus();
		$j1124('#'+id+' .clear_search').addClass('hide');
	});
	$j1124('#bo_query').on('keydown', function(){
		if ($j1124('#bo_query').val() !== ''){
			$j1124('.clear_search').removeClass('hide');
		}
	});

	//search with nav sidebar opened
	$j1124('.page-sidebar').click(function() {
		$j1124('#header_search .form-group').removeClass('focus-search');
	});

	$j1124('#header_search #bo_query').on('click', function(e){
		e.stopPropagation();
		e.preventDefault();
		if($j1124('body').hasClass('mobile-nav')){
			return false;
		}
		$j1124('#header_search .form-group').addClass('focus-search');
	});

	//select list for search type
	$j1124('#header_search_options').on('click','li a', function(e){
		e.preventDefault();
		$j1124('#header_search_options .search-option').removeClass('active');
		$j1124(this).closest('li').addClass('active');
		$j1124('#bo_search_type').val($j1124(this).data('value'));
		$j1124('#search_type_icon').removeAttr("class").addClass($j1124(this).data('icon'));
		$j1124('#bo_query').attr("placeholder",$j1124(this).data('placeholder'));
		$j1124('#bo_query').focus();
	});

	// reset form
	/* global header_confirm_reset, body_confirm_reset, left_button_confirm_reset, right_button_confirm_reset */
	$j1124(".reset_ready").click(function () {
		var href = $j1124(this).attr('href');
		confirm_modal( header_confirm_reset, body_confirm_reset, left_button_confirm_reset, right_button_confirm_reset,
			function () {
				window.location.href = href + '&keep_data=1';
			},
			function () {
				window.location.href = href + '&keep_data=0';
		});
		return false;
	});

	//scroll_if_anchor(window.location.hash);
	$j1124("body").on("click", "a.anchor", scroll_if_anchor);
}); //end dom ready
