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
	var pathname = window.location.pathname;

	$(window).resize(function () {
		win_width = $(window).width();
		if (active === true) {
			$(main).css("padding-left", 0);
			$(footer).css("padding-left", 0);
		}

	});

	// Banner
	$(window).resize(function () {
		win_width = $(window).width();
		if (win_width > 768  && win_width < 1440) {
			$(".img-banner").attr("src", "/images/logos/hb-banner-v2b-1440px.jpg");
		}else if (win_width > 426  && win_width < 770) {
			$(".img-banner").attr("src", "/images/logos/hb-banner-v2b-768px.jpg");
		}else if (win_width > 300  && win_width < 426) {
			$(".img-banner").attr("src", "/images/logos/hb-banner-v2b-425px.jpg");
		}
	});

	// Menu

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
	if(pathname === "/store/product/get"){
		$(document).ready(function(){
			$('.collapsible').collapsible();
		});
	}

	// Signup validators
	if(pathname === "/signup"){

		var form = $('#register');
		var Msg = $('div#message');

		var validator = form.validate({
			rules: {
				first: {
					required: true,
					minlength: 1,
					maxlength: 100
				},
				last: {
					required: true,
					minlength: 1,
					maxlength: 100
				},
				email: {
					required: true,
					email:true,
					maxlength: 100
				},
				password: {
					required: true,
					minlength: 8,
					maxlength: 16
				},
				repassword: {
					required: true,
					minlength: 8,
					maxlength: 16,
					equalTo: "#password"
				},
			},
			//Messages
			messages: {
				first:{
					required: "Enter your first name.",
					minlength: "Enter at least 1 character."
				},
				last:{
					required: "Enter your last name.",
					minlength: "Enter at least 1 character."
				},
				email:{
					required: "Enter your email."
				},
				password:{
					required: "Enter your password.",
					minlength: "Enter at least 8 characters."
				},
				repassword:{
					required: "Enter your password again.",
					equalTo: "Passwords do not match."
				},
			},
			errorElement : 'div',
			errorPlacement: function(error, element) {
				var placement = $(element).data('error');

				if (placement) {
					$(placement).append(error);
				} else {
					error.insertAfter(element);
				}
			}
		});

		// Signup post

		form.submit(function(event) {

			event.preventDefault();

			var firstName = form.find('input[name="first"]').val();
			var lastName = form.find('input[name="last"]').val();
			var email = form.find('input[name="email"]').val();
			var pass = form.find('input[name="password"]').val();

			var	url = "/signup";

			var data = { name: {first: firstName , last: lastName}, email: email, password: pass };
			
			if(validator.form() === true){

			$.post({
                    url,
                    data,
                    success: function(res) {
                        window.location.pathname = res.redirect;
                    },
                    error: function(err) {

                        Msg.removeClass();
                        Msg.addClass("show alert alert-danger");
                        Msg.html('<span>' + err.responseJSON.message + '</span>');
                    }
                });

			 }else{
			 	Msg.removeClass();
			 	Msg.addClass("show alert alert-danger");
			 	Msg.html('<span> Check the missing data. </span>');
			 }
		});
	}


	
	
	else if(768 < win_width && win_width < 1023){
		$(".img-banner").attr("src", "/images/logos/hb-banner-v2b-768px.jpg");
	}else if(320 < win_width && win_width < 426){
		$(".img-banner").attr("src", "/images/logos/hb-banner-v2b-425px.jpg");
	}

	// Search menu bar

$('#inputSearch').autocomplete({

});

	// Map contact

	if(pathname === "/contact"){


		
		function initialize() {

			var body = document.body, html = document.documentElement;
			var height = Math.max(html.clientHeight);
			var mapvar = document.getElementById('gmap-styled');
			mapvar.style.height = height/2 + 'px';

			geocoder = new google.maps.Geocoder();

			var address = localAddress;

			geocoder.geocode({
				'address': address
			}, function (results, status) {

				if (status == google.maps.GeocoderStatus.OK) {

					var latitude = results[0].geometry.location.lat();

					var longitude = results[0].geometry.location.lng();

					var latlng = new google.maps.LatLng(latitude, longitude);

					var mapOptions = {
						center: latlng,
						mapTypeId: google.maps.MapTypeId.ROADMAP,
						zoom: 14,
						zoomControl: true,
						mapTypeControl: false,
						scaleControl: false,
						streetViewControl: false,
						rotateControl: false,
						styles: [{"stylers":[{"saturation":-100},{"gamma":1}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"on"},{"saturation":50},{"gamma":0},{"hue":"#50a5d1"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"color":"#333333"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"weight":0.5},{"color":"#333333"}]},{"featureType":"transit.station","elementType":"labels.icon","stylers":[{"gamma":1},{"saturation":50}]}]
					}

					map = new google.maps.Map(document.getElementById('gmap-styled'), mapOptions);

					var latlng = new google.maps.LatLng(latitude, longitude);
					map.setCenter(latlng);

					var marker = new google.maps.Marker({
						position:  latlng,
						map: map,
						title: "I'm here!"
					});
				}

			});
		}
		
		google.maps.event.addDomListener(window, 'load', initialize);
	}
});
