var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	console.log('user item end point', req.params.id);

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'user';

	// Render the view
	view.render('user/items/details');
};
