// This needs to be optimized.

$(document).ready(function () {

	// Side-Menu Script

	var B_collapse = $('a.button-collapse.show-on-large'); // Menu button.
	var B_HideMenu = $('a#sidemenu'); // Menu button for screens < width: 768px.
	var sideMenu = $('ul#mobile-menu'); // Side-menu.
	var main = $('main'); // Main content of the page.
	var footer = $('footer.page-footer'); // footer of the page.
	var active = false; // Variable bool, to see if the menu is active.
	var win_width = $(window).width(); // Width of screen resolution.
	var ani_duration = 400; // Animation duration.
	var sizex_sidemenu = 250; // Side-Menu width.

	$(window).resize(function () {
		win_width = $(window).width();

		if (active === true) {
			$(main).css("padding-left", 0);
			$(footer).css("padding-left", 0);
		}

	});

	$(B_collapse).click(function () {

		win_width = $(window).width();

		if (active === false) {
			$(sideMenu).transition({
				x: '0%'
			}, ani_duration, 'ease');

			if (win_width > 1025) {
				$(main).transition({
					"padding-left": sizex_sidemenu
				}, ani_duration, 'ease');
				$(footer).transition({
					"padding-left": sizex_sidemenu
				}, ani_duration, 'ease');
			}

			active = true;
		} else {
			$(sideMenu).transition({
				x: '-100%'
			}, ani_duration, 'ease');

			if (win_width > 1025) {
				$(main).transition({
					"padding-left": 0
				}, ani_duration, 'ease');
				$(footer).transition({
					"padding-left": 0
				}, ani_duration, 'ease');
			}

			active = false;
		}
	});

	$(B_HideMenu).click(function () {
		if (active === true) {
			$(sideMenu).transition({
				x: '-100%'
			}, ani_duration, 'ease');
			$(main).transition({
				"padding-left": 0
			}, ani_duration, 'ease');
			$(footer).transition({
				"padding-left": 0
			}, ani_duration, 'ease');
			active = false;
		}
	});

	// collapsible init

	$('.collapsible').collapsible();

	// Map contact

	var pathname = window.location.pathname;
	
	

	if(pathname === "/contact"){

		var body = document.body, html = document.documentElement;
		var height = Math.max(html.clientHeight);
		var mapvar = document.getElementById('gmap-styled');
		mapvar.style.height = height/2 + 'px';

		var mapOptions = {
			zoom: 14,
			zoomControl: true,
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			rotateControl: false,
			center: new google.maps.LatLng(40.6700, -73.9400), // New York

			styles: [{"stylers":[{"saturation":-100},{"gamma":1}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"on"},{"saturation":50},{"gamma":0},{"hue":"#50a5d1"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"color":"#333333"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"weight":0.5},{"color":"#333333"}]},{"featureType":"transit.station","elementType":"labels.icon","stylers":[{"gamma":1},{"saturation":50}]}]
		};

		var mapElement = document.getElementById('gmap-styled');

		var map = new google.maps.Map(mapElement, mapOptions);

		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(40.6700, -73.9400),
			map: map,
			title: 'Hello!!'
		});
	}
});
