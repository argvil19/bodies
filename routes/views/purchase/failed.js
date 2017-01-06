var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	console.log('purchase failed end point');

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'purchase';

	// Render the view
	view.render('purchase/failed');
};
