var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'Content';

	locals.data = {
		articles: [
			{ name: "Article 1", url: "images/articles/article-test.png", id: 1, description: "Description of article.", price: 10 }, 
			],
		details:[
			{ id: 1, name: "Content 1", url: "images/content/content-test-big.png", description: "Description of content.", 
                pub_date: "January 1, 2017", author: "author", 
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat elit sed velit fermentum, in rutrum metus facilisis. Mauris consequat urna nec dui ultrices, id egestas felis sodales. Quisque elementum eros sodales erat faucibus, vehicula viverra purus ullamcorper. Donec sollicitudin dolor varius, dictum metus at, sollicitudin turpis. In cursus condimentum tempor. Morbi tincidunt feugiat velit id tristique. Integer ligula felis, blandit pulvinar ex non, dictum condimentum erat. Nam mattis lobortis risus, eget luctus nisl vehicula sit amet. Aliquam enim lacus, condimentum et sagittis sit amet, facilisis sit amet tellus. Nulla quis dolor et turpis vehicula eleifend. Nam ut molestie dui, a lobortis eros. Nam gravida pretium ligula, quis auctor velit porta eget. Donec accumsan justo interdum sapien gravida ultricies. Nulla vel finibus elit, at laoreet diam. Fusce id tellus est. Nulla ac tortor dictum arcu tincidunt iaculis ut feugiat sapien. Nam pulvinar elit est, at cursus nibh mattis ut. Donec tortor nunc, condimentum eget maximus vehicula, gravida in augue. Donec mattis leo neque. Suspendisse potenti. Pellentesque ac mauris sit amet lorem sodales blandit. Pellentesque faucibus sollicitudin enim, id commodo massa iaculis et. Nam eget enim ac massa auctor sollicitudin." }, 
		],
	};

	// Render the view
	view.render('content');
};
