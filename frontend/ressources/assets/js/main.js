"use strict";

// internal object
var covmunity = covmunity || {};

// dirty config structure
covmunity.config = {
	debug: true // can be used to enable / disable console output
};

// dirty frontend -> backend api code
covmunity.api = {
	//
	// The API hooks from Fomantic-UI can also be used.
	// See them before coding? :D
	// - https://fomantic-ui.com/behaviors/api.html
	//
	// It won't conflict with 'page.js' as 'page.js' is reacting only
	// when a 'click' event is matching a defined route.
	//
	// In case of issues on 'page.js' side, the last '*' route might be called.
	//

	getAccount: function (ctx, next) {
		console.group('API');
		console.log('[account]', ctx);
		console.groupEnd();
		
		// api call account details
		var account = getAccountProfile();

		// TODO: prepare/forward JSobject to UI element*
		// 
		// * The 'ctx' object can be used to store data that is transient between pages
		//
		// See: 'Context' method in the 'page.js' documentation
		// - https://github.com/visionmedia/page.js#context

		// debug output
		console.log(account.email)

		next(); // callback is here just for an indication of the behaviour (exactly)
		// If removed, the second passed callback defined in the route won't be called.
	},
	hello: function (ctx, next) {
		console.group('API');
		console.info('[hello]', ctx);
		console.groupEnd();

		// do the display logic here

		next(); // call next defined action
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
		// Call the above init function.
		// Can be useful for loaders or things similar.
		this.init();

		//
		// Call the URL handler 'page.js'
		//
		// When 'click' is set to true, all navigation clicks will be captured
		// then handled by the specified method / class defined for the matching route.
		//
		// When 'popstate' is set to true, the navigation history is populated.
		//
		// Routes are defined at the bottom of this file.
		//
		// See documentation here:
		// - https://github.com/visionmedia/page.js
		//

		// Here we are setting the run options of 'page.js'
		page({
			click: true, // Listen on 'click' events or not
			dispatch: false, // Dispatch request to backend or not (beware that the request will still get dispatched on page reloads)
			popstate: true // Change address bar URL or not (also populate the history stack)
		});

		// Process current URL
		page(window.location.pathname);
	},
	showSection: function(section) {
		if (!section) { section = 'error'; }
		var container = '#variable-container';
		var file = section.replace('/', '');
		var filePath = 'ressources/sections/' + file + '.html';
		console.log('Loading ' + filePath + '...');
		$.get(filePath)
		 .done(function (data) {
			console.log('Content loaded.');
			$(container).html(data);
		 })
		 .fail(function (jqXHR) {
			var errorContent = '<h2>Covmunity Unknow Error</h2><a href="#!" onclick="window.history.back();">Back</a>';
			$(container).html(errorContent);
			console.error('Failed to load content.', jqXHR);
		 });
	},
	getIPAddress: function(callback) {
		console.log('Searching user IP address...');
		$.getJSON('https://api.ipify.org?format=json', function(data) {
			console.log('Found IP address:');
			console.log(JSON.stringify(data, null, 2));
			if (callback && typeof callback === 'function') {
				callback(data);
			}
		});
	},
	getLocation: function(callback) {
		// TODO: Put the key somewhere else...
		const apiKey = '097b8d59d4ded433de83da780f42127c';

		console.log('Searching user location...');
		$.getJSON('http://api.ipstack.com/check?access_key=' + apiKey + '&format=1', function(data) {
			console.log('Found location:');
			console.log(JSON.stringify(data, null, 2));
			if (callback && typeof callback === 'function') {
				callback(data);
			}
		});
	},
	getDataSource: function(callback) {
		console.log('Importing data source...');
		$.getJSON('https://corona-stats.online/?format=json', function(data) {
			console.log('Data source imported:');
			console.log(JSON.stringify(data, null, 2));
			if (callback && typeof callback === 'function') {
				callback(data);
			}
		});
	},
	getMap: function (location) {
		console.group('Map');
		console.log('Loading map with this data.', location);

		var myLatLng = {
			lat: location.latitude,
			lng: location.longitude
		};

		console.log('Map centered too:', myLatLng);
		
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 4,
			center: myLatLng
		});

		var contentString = '' +
			'<div id="content">' +
			'<h4 class="ui header" style="margin-top: 1px; margin-bottom: 0;">' +
			'<i class="search location icon"></i>' +
			'<div class="content">Location</div>' +
			'</h4>' +
			'<div class="ui bulleted list" style="margin-top: 10px;">' +
			'<div class="item">Country: ' + location.country_name + '</div>' +
			'<div class="item">Region: ' + location.region_name + '</div>' +
			'<div class="item">City: ' + location.city + '</div>' +
			'<div class="item">Zip: ' + location.zip + '</div>' +
			'</div>';
			'</div>';

		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});

		var marker = new google.maps.Marker({
			position: myLatLng,
			map: map,
			title: 'Hello World!'
		});

		marker.addListener('click', function() {
			infowindow.open(map, marker);
		});

		// Showing map with transition
		// See: https://fomantic-ui.com/modules/transition.html
		$('#map').transition('fade up');
		
		console.groupEnd();
	},
	getHeatMap: function (location) {
		console.group('Heat Map');
		console.log('Loading map with this data.', location);

		//
		// TODO: Implement this: https://developers.google.com/maps/documentation/javascript/examples/layer-heatmap
		// TODO: Implement data source
		//

		var myLatLng = {
			lat: location.latitude,
			lng: location.longitude
		};

		console.log('Map centered too:', myLatLng);
		
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 4,
			center: myLatLng
		});

		var contentString = '' +
			'<div id="content">' +
			'<h4 class="ui header" style="margin-top: 1px; margin-bottom: 0;">' +
			'<i class="search location icon"></i>' +
			'<div class="content">Location</div>' +
			'</h4>' +
			'<div class="ui bulleted list" style="margin-top: 10px;">' +
			'<div class="item">Country: ' + location.country_name + '</div>' +
			'<div class="item">Region: ' + location.region_name + '</div>' +
			'<div class="item">City: ' + location.city + '</div>' +
			'<div class="item">Zip: ' + location.zip + '</div>' +
			'</div>';
			'</div>';

		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});

		var marker = new google.maps.Marker({
			position: myLatLng,
			map: map,
			title: 'Hello World!'
		});

		marker.addListener('click', function() {
			infowindow.open(map, marker);
		});

		// Showing map with transition
		// See: https://fomantic-ui.com/modules/transition.html
		$('#map').transition('fade up');
		
		console.groupEnd();
	},
	displayHeatMap: function () {
		const self = this;
		this.getLocation(function (data) {
			self.getHeatMap(data);
		});
	},
	displayMap: function () {
		const self = this;
		this.getLocation(function (data) {
			self.getMap(data);
		});
	},
	reload: function () {
		console.log('Reloading section...');
		
		// Process current URL
		page(window.location.pathname);
	}
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

		// hide sidebar if opened
		if ($('.ui.sidebar').sidebar('is visible') === true) {
			console.log('Sidebar is open, closing it.');
			$('.ui.sidebar').sidebar('hide');
		}

		next(); // Must be the last line, uncomment to cascade callbacks
	},
	dashboard: function (ctx) {
		console.group('Page.js');
		console.info('Loading [dashboard] client code...', ctx);
		console.groupEnd();

		// do the display logic here
		covmunity.app.showSection('/dashboard');
	},
	account: function (ctx) {
		console.group('Page.js');
		console.info('Loading [account] client code...', ctx);
		console.groupEnd();

		// do the display logic here
	},
	form: function (ctx) {
		console.group('Page.js');
		console.info('Loading [form] client code...', ctx);
		console.groupEnd();

		// do the display logic here
		covmunity.app.showSection(ctx.pathname);
	},
	charts: function (ctx) {
		console.group('Page.js');
		console.info('Loading [charts] client code...', ctx);
		console.groupEnd();

		// do the display logic here
		covmunity.app.showSection(ctx.pathname);
	},
	maps: function (ctx) {
		console.group('Page.js');
		console.info('Loading [maps] client code...', ctx);
		console.groupEnd();

		// do the display logic here
		covmunity.app.showSection(ctx.pathname);

		// display map
		covmunity.app.displayMap();
	},
	help: function (ctx) {
		console.group('Page.js');
		console.info('Loading [help] client code...', ctx);
		console.groupEnd();

		// do the display logic here
		covmunity.app.showSection(ctx.pathname);
	},
	hello: function (ctx) {
		console.group('Page.js');
		console.info('Loading [hello] client code...', ctx);
		console.groupEnd();

		// do the display logic here
	},
	login: function (ctx) {
		console.group('Page.js');
		console.info('Loading [hello] client code...', ctx);
		console.groupEnd();

		// do the display logic here
	},
};


/***********************************************************************************************
 * Define all client-side routes - Should be same as server ones                               *
 * Just replace '@' by ':' for parameters (if needed, depending on server side parameter mask) *
 ***********************************************************************************************/

// App routes
// page('*', covmunity.api.getAccount, covmunity.pages.init); // It should work with just the 'init' method
page('*', covmunity.pages.init); // Initialize on every requests (no need to change here normally)
page('/', covmunity.pages.dashboard); // Call the method that will render the 'dashboard' content
page('/dashboard', covmunity.pages.dashboard); // Call the method that will render the 'dashboard' content
page('/account', covmunity.pages.account); // Call the method that will render the 'account' content
page('/form', covmunity.pages.form); // Call the method that will render the 'form' content
page('/charts', covmunity.pages.charts); // Call the method that will render the 'charts' content
page('/maps', covmunity.pages.maps); // Call the method that will render the 'maps' content
page('/help', covmunity.pages.help); // Call the method that will render the 'help' content

// Auth part 
page('/login', covmunity.pages.login); // Call the method that will render the 'login' content

// User part
page(
	'/profile', // Client side URL
	covmunity.api.getAccount, // API method to send request to backend
	covmunity.pages.account // When request is sent to backend, call the associated render method
);

// API Test
page(
	'/hello', // Client side URL
	covmunity.api.getAccount, // API method to send request to backend
	covmunity.pages.account // When request is sent to backend, call the associated render method
);

// Unexpected events / errors
page('*', covmunity.pages.error); // Will be called on any errors, like 404, 500, etc...

// Boot stuff when DOM is loaded
$(function () {
	console.group('App');
	console.info('DOM Loaded.');

	// Once the DOM is loaded, we are calling our 'page.js' wrapper.
	// This wrapper will call 'page.js' which then, will parse the defined routes above.
	// This is how the main app code is started.
	covmunity.app.run();

	console.groupEnd();
});

// GoogleMaps wrapper
// window.initMap = covmunity.app.initMap;