var keystone = require('keystone');
var async = require('async');
var PostCategory = keystone.list('PostCategory').model;
var Post = keystone.list('Post').model;

exports = module.exports = function(req, res, next) {

		console.log('store product get end point', req.query.id);

		var view = new keystone.View(req, res);
		var locals = res.locals;

		// Init locals
		locals.section = 'store';

		PostCategory.findOne({
		_id: req.query.id,
	}, function(err, category) {
		if (err) {
			return next(err);
		}

		Post.find({
			categories: req.query.id,
		}, function(err, articles) {
			if (err) {
				return next(err);
			}

			//console.log('CATEGORY DETAILS');
			//console.log(category);
			//console.log('POSTS DETAILS');
			//console.log(articles);

			locals.category = category;
			locals.articles = articles;

			view.render('store/product/get', locals);
		});
	});
};
