var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	console.log('user purchases end point');

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'user';

	// Render the view
	view.render('user/purchases');
};
