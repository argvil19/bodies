var keystone = require('keystone');

exports = module.exports = function (req, res) {

	console.log('user purchases end point');

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

	/**
	 * Adding purchases list to locals
	 */
	locals.purchases = User.categoryAccess;

	view.render('user/purchases', locals);
};
