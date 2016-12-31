var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'Articles';

	locals.data = {
		articles: [
			{ name: "Article 1", url: "images/articles/article-test.png", id: 1 }, 
			{ name: "Article 2", url: "images/articles/article-test.png", id: 2 }, 
			{ name: "Article 3", url: "images/articles/article-test.png", id: 3 }, 
			{ name: "Article 4", url: "images/articles/article-test.png", id: 4 },
			{ name: "Article 5", url: "images/articles/article-test.png", id: 5 }, 
			{ name: "Article 6", url: "images/articles/article-test.png", id: 6 }, 
			{ name: "Article 7", url: "images/articles/article-test.png", id: 7 }, 
			{ name: "Article 8", url: "images/articles/article-test.png", id: 8 },
			{ name: "Article 9", url: "images/articles/article-test.png", id: 9 }, 
			{ name: "Article 10", url: "images/articles/article-test.png", id: 10 }, 
			{ name: "Article 11", url: "images/articles/article-test.png", id: 11 }, 
			{ name: "Article 12", url: "images/articles/article-test.png", id: 12 },
			// { name: "Article 13", url: "images/articles/article-test.png", id: 13 }, 
			// { name: "Article 14", url: "images/articles/article-test.png", id: 14 }, 
			// { name: "Article 15", url: "images/articles/article-test.png", id: 15 }, 
			// { name: "Article 16", url: "images/articles/article-test.png", id: 16 },
			// { name: "Article 17", url: "images/articles/article-test.png", id: 17 }, 
			// { name: "Article 18", url: "images/articles/article-test.png", id: 18 }, 
			// { name: "Article 19", url: "images/articles/article-test.png", id: 19 }, 
			// { name: "Article 20", url: "images/articles/article-test.png", id: 20 },
			// { name: "Article 21", url: "images/articles/article-test.png", id: 21 }, 
			// { name: "Article 22", url: "images/articles/article-test.png", id: 22 }, 
			// { name: "Article 23", url: "images/articles/article-test.png", id: 23 }, 
			// { name: "Article 24", url: "images/articles/article-test.png", id: 24 },
			// { name: "Article 25", url: "images/articles/article-test.png", id: 25 }, 
			// { name: "Article 26", url: "images/articles/article-test.png", id: 26 }, 
			// { name: "Article 27", url: "images/articles/article-test.png", id: 27 }, 
			// { name: "Article 28", url: "images/articles/article-test.png", id: 28 },
			// { name: "Article 29", url: "images/articles/article-test.png", id: 29 }, 
			// { name: "Article 30", url: "images/articles/article-test.png", id: 30 }, 
			// { name: "Article 31", url: "images/articles/article-test.png", id: 31 }, 
			// { name: "Article 32", url: "images/articles/article-test.png", id: 32 },
			],
	};


	// Render the view
	view.render('articles');
};