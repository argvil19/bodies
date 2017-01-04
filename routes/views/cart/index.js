var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	console.log('cart end point');
	
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'cart';

	// Render the view
	view.render('cart/index');
};
