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

});
