var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'Articles';

	locals.data = {
		articles: [
			{ name: "Article 1", url: "images/articles/article-test.png", id: 1, description: "Description of article.", price: 10 }, 
			{ name: "Article 2", url: "images/articles/article-test.png", id: 2, description: "Description of article.", price: 10 }, 
			{ name: "Article 3", url: "images/articles/article-test.png", id: 3, description: "Description of article.", price: 10 }, 
			{ name: "Article 4", url: "images/articles/article-test.png", id: 4, description: "Description of article.", price: 10 },
			{ name: "Article 5", url: "images/articles/article-test.png", id: 5, description: "Description of article.", price: 10 }, 
			{ name: "Article 6", url: "images/articles/article-test.png", id: 6, description: "Description of article.", price: 10 }, 
			{ name: "Article 7", url: "images/articles/article-test.png", id: 7, description: "Description of article.", price: 10 }, 
			{ name: "Article 8", url: "images/articles/article-test.png", id: 8, description: "Description of article.", price: 10 },
			{ name: "Article 9", url: "images/articles/article-test.png", id: 9, description: "Description of article.", price: 10 }, 
			{ name: "Article 10", url: "images/articles/article-test.png", id: 10, description: "Description of article.", price: 10 }, 
			{ name: "Article 11", url: "images/articles/article-test.png", id: 11, description: "Description of article.", price: 10 }, 
			{ name: "Article 12", url: "images/articles/article-test.png", id: 12, description: "Description of article.", price: 10 },
		],
		details:[
			{ id: 1, name: "Content 1", url: "images/content/content-test.png", description: "Description of content.", pub_date: "January 1, 2017", author: "author" }, 
			{ id: 2, name: "Content 1", url: "images/content/content-test.png", description: "Description of content.", pub_date: "January 1, 2017", author: "author" }, 
			{ id: 2, name: "Content 2", url: "images/content/content-test.png", description: "Description of content.", pub_date: "January 1, 2017", author: "author" }, 
			{ id: 3, name: "Content 1", url: "images/content/content-test.png", description: "Description of content.", pub_date: "January 1, 2017", author: "author" },
			{ id: 3, name: "Content 2", url: "images/content/content-test.png", description: "Description of content.", pub_date: "January 1, 2017", author: "author" }, 
			{ id: 3, name: "Content 3", url: "images/content/content-test.png", description: "Description of content.", pub_date: "January 1, 2017", author: "author" }, 
			{ id: 3, name: "Content 4", url: "images/content/content-test.png", description: "Description of content.", pub_date: "January 1, 2017", author: "author" }, 
			{ id: 3, name: "Content 5", url: "images/content/content-test.png", description: "Description of content.", pub_date: "January 1, 2017", author: "author" },
			{ id: 4, name: "Content 1", url: "images/content/content-test.png", description: "Description of content.", pub_date: "January 1, 2017", author: "author" }, 
			{ id: 4, name: "Content 2", url: "images/content/content-test.png", description: "Description of content.", pub_date: "January 1, 2017", author: "author" }, 
			{ id: 5, name: "Content 1", url: "images/content/content-test.png", description: "Description of content.", pub_date: "January 1, 2017", author: "author" }, 
			{ id: 5, name: "Content 2", url: "images/content/content-test.png", description: "Description of content.", pub_date: "January 1, 2017", author: "author" },
			{ id: 6, name: "Content 1", url: "images/content/content-test.png", description: "Description of content.", pub_date: "January 1, 2017", author: "author" }, 
			{ id: 7, name: "Content 1", url: "images/content/content-test.png", description: "Description of content.", pub_date: "January 1, 2017", author: "author" },
			{ id: 7, name: "Content 2", url: "images/content/content-test.png", description: "Description of content.", pub_date: "January 1, 2017", author: "author" }, 
			{ id: 8, name: "Content 1", url: "images/content/content-test.png", description: "Description of content.", pub_date: "January 1, 2017", author: "author" }, 
			{ id: 9, name: "Content 1", url: "images/content/content-test.png", description: "Description of content.", pub_date: "January 1, 2017", author: "author" }, 
			{ id: 10, name: "Content 1", url: "images/content/content-test.png", description: "Description of content.", pub_date: "January 1, 2017", author: "author" }, 
			{ id: 11, name: "Content 1", url: "images/content/content-test.png", description: "Description of content.", pub_date: "January 1, 2017", author: "author" }, 
			{ id: 11, name: "Content 2", url: "images/content/content-test.png", description: "Description of content.", pub_date: "January 1, 2017", author: "author" }, 
			{ id: 11, name: "Content 3", url: "images/content/content-test.png", description: "Description of content.", pub_date: "January 1, 2017", author: "author" }, 
			{ id: 12, name: "Content 1", url: "images/content/content-test.png", description: "Description of content.", pub_date: "January 1, 2017", author: "author" }
		],
	};


	// Render the view
	view.render('articles');
};