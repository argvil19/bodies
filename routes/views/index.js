var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'Home';

	locals.data = {
		title: ["The best articles"],

		articles: [
			{ name: "Article 1", url: "images/articles/article-test.png", id: 1 }, 
			{ name: "Article 2", url: "images/articles/article-test.png", id: 2 }, 
			{ name: "Article 3", url: "images/articles/article-test.png", id: 3 }, 
			{ name: "Article 4", url: "images/articles/article-test.png", id: 4 },
			{ name: "Article 5", url: "images/articles/article-test.png", id: 5 }, 
			{ name: "Article 6", url: "images/articles/article-test.png", id: 6 }, 
			{ name: "Article 7", url: "images/articles/article-test.png", id: 7 }, 
			{ name: "Article 8", url: "images/articles/article-test.png", id: 8 }
			],

		transformations: [
			{ id: 1, url: "images/transformations/transformations-test.png" },
			{ id: 2, url: "images/transformations/transformations-test.png" },
			{ id: 3, url: "images/transformations/transformations-test.png" }, 
			{ id: 4, url: "images/transformations/transformations-test.png" }, 
			{ id: 5, url: "images/transformations/transformations-test.png" }, 
			{ id: 6, url: "images/transformations/transformations-test.png" }
			],

		testimonials: [
			{ name: "John A.", testimonial: "Very good articles, recommended.", url: "images/witnesses/witnesses-test.png" },
			{ name: "Yenny G.", testimonial: "Very good articles, recommended.", url: "images/witnesses/witnesses-test.png"},
			{ name: "Ciro P.", testimonial: "Very good articles, recommended.", url: "images/witnesses/witnesses-test.png" }
			],
	};

	// Render the view
	view.render('index');
};
