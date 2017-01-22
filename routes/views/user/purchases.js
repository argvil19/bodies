var keystone = require('keystone');
var PostCategory = keystone.list('PostCategory').model;

exports = module.exports = function(req, res, next) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'user';

	/**
	 * Getting user model from request object
	 * We can get correctly user object because this route checked by middleware.requireUser
	 * @type {*|Object|null}
	 */
	var User = req.user;

	var purchases = User.purchases.map(function(item) {
		return item.product
	});

	/**
	 * Adding purchases list to locals
	 */
	PostCategory.find({
		_id: {
			'$in': purchases
		}
	}, function(err, purchases) {
		if (err) {
			next(err);
		}

		locals.purchases = purchases;

		view.render('user/purchases', locals);
	});
};
