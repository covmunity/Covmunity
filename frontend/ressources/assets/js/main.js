"use strict";

// internal state
window.init = {
	theme: ''
};

// internal object
var covmunity = covmunity || {};

// app ui
$(document).ready(function() {
	// Disabled links
	$('a[href="#!"]').on('click', function(event) {
		event.preventDefault();
	});

	// Fix top menu when passed
	$('.ui.large.secondary.inverted.menu').visibility({
		once: false,
		onBottomPassed: function() {
			$('.fixed.menu').transition('fade in');
		},
		onBottomPassedReverse: function() {
			$('.fixed.menu').transition('fade out');
		}
	});

	// Create sidebar and attach to menu open
	$('.ui.sidebar')
		// .sidebar('setting', { transition: 'scale down', mobileTransition: 'scale down' })
		.sidebar('setting', { transition: 'overlay', mobileTransition: 'overlay' })
		.sidebar('attach events', '.toc.item');
	
	// Dropdowns
	$('.ui.dropdown').dropdown({
		on: 'hover'
	});

	// Accordions
	$('.ui.accordion').accordion();

	// Dismissable messages
	$('.message .close').on('click', function() {
		$(this).closest('.message').transition('fade');
	});

	// Tooltips
	$('.tooltipped').popup();

	// Scrolling tables
	// TODO: Add throttling...
	$('.scrolling-table').on('scroll', function (event) {
		// console.log('User is scrolling the table content.', event);
		// console.info('Scroll position:', event.target.scrollTop);
		// console.info('This:', $(this));
		// console.info('Table header:', $(this).find('.ui.table.sticky-headed thead tr:first-child > th'));

		// Store scroll position
		var pos = event.target.scrollTop;

		// Target next table with sticky headers
		var $tableHeaders = $(this).find('.ui.table.sticky-headed thead tr:first-child > th');

		// Set a darker background color when user is scrolling table content
		if (pos !== 0) {
			if (!$tableHeaders.hasClass('darken')) {
				$tableHeaders.addClass('darken');
			}
		}
		else {
			if ($tableHeaders.hasClass('darken')) {
				$tableHeaders.removeClass('darken');
			}
		}
	});

	// ui theme elements
	var $themeElements = [
		{ name: 'dividingHeaders', target: $('.ui.dividing.header') },
		{ name: 'iconHeaders', target: $('.ui.icon.header') },
		{ name: 'tooltippedIcons', target: $('.tooltipped.icon') },
		{ name: 'cardsContainer', target: $('.ui.cards') },
		{ name: 'cards', target: $('.ui.card') },
		{ name: 'dropdowns', target: $('.ui.dropdown') },
		{ name: 'fixedMenu', target: $('.ui.top.fixed.menu') },
		{ name: 'breadcrumb', target: $('.ui.breadcrumb') },
		{ name: 'tables', target: $('.ui.table') },
		{ name: 'segments', target: $('.ui.segment').not('.inverted') },
		{ name: 'placeholders', target: $('.ui.placeholder') }
	];
	var $themeValue = $('#theme-value');
	var $darkThemeButton = $('div.right.menu div#dark-theme');
	var $lightThemeButton = $('div.right.menu div#light-theme');

	// query light / dark theme selection
	if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
		console.log('🎉 Dark mode is supported');

		// detect dark mode
		var darkMatcher = window.matchMedia('(prefers-color-scheme: dark)');

		// attach dark mode listener
		darkMatcher.addListener(onUpdate);

		// remove listener on window unload
		window.unload = function (event) {
			console.log('window unloaded.', event);
			console.log('removing listeners.');

			darkMatcher.removeListener(onUpdate);
		}

		// set and display initial theme value
		$themeValue.text((darkMatcher.matches === true ? 'dark' : 'light') + ' (media-query)');
		window.init.theme = (darkMatcher.matches === true ? 'dark' : 'light');

		// initial theme buttons state
		if (darkMatcher.matches === true) {
			$lightThemeButton.toggleClass('hide');
		}
		else {
			$darkThemeButton.toggleClass('hide');
		}

		// apply initial theme
		applyTheme();
	}

	// light / dark theme buttons
	$darkThemeButton.on('click', function (event) {
		console.log('Theme selector clicked.', event);

		// inverted logic because of animated buttons
		window.init.theme = 'light';

		// display active theme
		$themeValue.text(window.init.theme + ' (user-event)');

		// delayed button change
		var toggleState = setTimeout(function(){
			switchButtons();
			clearTimeout(toggleState);
		}, 600);

		// apply defined theme
		applyTheme();
	});
	$lightThemeButton.on('click', function (event) {
		console.log('Theme selector clicked.', event);

		// inverted logic because of animated buttons
		window.init.theme = 'dark';

		// display active theme
		$themeValue.text(window.init.theme + ' (user-event)');

		// delayed button change
		var toggleState = setTimeout(function(){
			switchButtons();
			clearTimeout(toggleState);
		}, 600);

		// apply defined theme
		applyTheme();
	});

	// light / dark theme event handler
	function onUpdate(event) {
		console.log('Theme changed.', event);
		console.log('Previous theme value:', window.init.theme);

		// set and display gathered theme value
		window.init.theme = (event.matches === true ? 'dark' : 'light');
		$themeValue.text(window.init.theme + ' (media-event)');

		// toggle theme buttons
		switchButtons();

		// apply gathered theme
		applyTheme();
	}

	// light / dark theme button toggler
	function switchButtons() {
		$darkThemeButton.toggleClass('hide');
		$lightThemeButton.toggleClass('hide');
	}

	// light / dark theme apply
	function applyTheme() {
		console.log('Theme applied.', (!event ? '(auto)' : event));
		console.log('New theme value:', window.init.theme);
		console.log('Dark mode is ' + (window.init.theme === 'dark' ? '🌒 on' : '☀️ off') + '.');
		console.log('Theme elements:');
		console.table($themeElements);
		$($themeElements).each(function () {
			console.log('Styling element [' + $(this)[0].name + ']:', $(this)[0].target);
		});

		switch (window.init.theme) {
			case 'dark':
				$($themeElements).each(function () {
					var $target = $(this)[0].target;

					// Apply dark theme
					$target.addClass('inverted');

					// Remove uggly extra shadow
					if ($target.hasClass('floating')) {
						$target.removeClass('floating');
						$target.addClass('floating-disabled');
					}
				});

				// Apply dark theme on tooltips
				$('.tooltipped').attr('data-variation', 'inverted');
				break;
		
			case 'light':
			default:
				$($themeElements).each(function () {
					var $target = $(this)[0].target;
					
					// Remove dark theme
					$target.removeClass('inverted');

					// Add nice floating shadow
					if ($target.hasClass('floating-disabled')) {
						$target.removeClass('floating-disabled');
						$target.addClass('floating');
					}
				});

				// Remove dark theme on tooltips
				$('.tooltipped').attr('data-variation', '');
				break;
		}
	}
});

// dirty config structure
covmunity.config = {
	debug: true
};

// dirty frontend -> backend api code
covmunity.api = {
	getAccount: function (ctx, next) {
		console.group('API');
		console.log('[account]', ctx);
		console.groupEnd();
		// api call account details
		var account = getAccount();
		//TODO: prepare/forward JSobject to UI element
		console.log(account.email)
		next(); // callback is here just for an indication of the behaviour
	},
};

// quick routing code
covmunity.app = {
	init: function () {
		console.group('Page.js');
		console.log('App:', this);
		console.groupEnd();
	},
	run: function () {
		this.init();

		/*
		TODO: Fix this part. I'm gonna eat something
		*/

		// page();
		page({
			click: true,
			dispatch: true,
			popstate: true
		});
		/* page({
			click: false, // Change this to get back on client-side only
			popstate: false, // Change this to get back on client-side only
		}); */
		/* page({
			click: true, // Change this to get back on client-side only
			popstate: true, // Change this to get back on client-side only
		}); */
	},
};

// available pages
covmunity.pages = {
	error: function () {
		console.group('Page.js');
		console.error('Route not defined.', this);
		console.groupEnd();
	},
	init: function (ctx, next) {
		console.group('Page.js');
		console.info('Attached scopes:', ctx, covmunity);
		console.groupEnd();

		next(); // Must be the last line, uncomment to cascade callbacks
	},
	hello: function (ctx) {
		console.group('Page.js');
		console.info('Client [hello] API call visual return', ctx);
		console.groupEnd();

		// do the display logic here
	},
	home: function (ctx) {
		console.group('Page.js');
		console.info('Welcome to the Homepage !', ctx);
		console.groupEnd();

		// next(); // Must be the last line, uncomment to cascade callbacks
	},
};

// Define all client-side routes - Must be same as server ones
// Just replace '@' by ':' for parameters
page('*', covmunity.api.getAccount, covmunity.pages.init);
page('/', covmunity.pages.home);
page('/account/profile', covmunity.api.getAccount, covmunity.pages.hello);
page('*', covmunity.pages.error);

// Boot stuff when DOM is loaded
$(function (event) {
	console.group('App');
	console.info('DOM Loaded.', event);
	covmunity.app.run();
	console.groupEnd();
});