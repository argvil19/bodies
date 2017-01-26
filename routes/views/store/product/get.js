var keystone = require('keystone');
var async = require('async');
var PostCategory = keystone.list('PostCategory').model;
var Post = keystone.list('Post').model;
var User = keystone.list('User').model;

exports = module.exports = function(req, res, next) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'product';
	locals.alreadyBought = false;

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

			if (req.user) {
				req.user.purchases.forEach((item) => {
					if (item.product === String(category._id)) {
						locals.alreadyBought = true;
					}
				});
			}

			locals.category = category;
			locals.articles = articles;

			view.render('store/product/get', locals);
		});
	});
};
