var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	console.log('store get end point', req.query);

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'store';

	// Render the view
	view.render('store/get');
};
