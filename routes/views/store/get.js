var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'store';

	view.on('init', function (next) {
		var q = keystone.list('Post').paginate({
				page: req.query.page || 1,
				perPage: 10,
				maxPages: 10,
				filters: {
					state: 'published',
				},
			})
			.sort('-publishedDate');

		q.exec(function (err, results) {
			
			locals.total = results.total
			locals.items = results.results;
			locals.currentPage = results.currentPage;
			locals.totalPages = results.totalPages,
			locals.pages = results.pages,
			locals.previous = results.previous,
			locals.next = results.next,
			locals.last = results.last,

		next(err);
		});
	});
	
	// Render the view
	view.render('store/get');
};
