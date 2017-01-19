/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash');
var keystone = require('keystone');


/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function(req, res, next) {
	res.locals.navLinks = [{
		label: 'Home',
		key: 'home',
		href: '/'
	}, {
		label: 'Blog',
		key: 'blog',
		href: '/blog'
	}, ];
	res.locals.user = req.user;
	next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function(req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function(msgs) {
		return msgs.length;
	}) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function(req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin?from=' + req.url);
	}
	else {
		next();
	}
};

/**
 Prevents people from accessing locked articles
 */
exports.articleIsLocked = function(req, res, next) {

	/**
	 * 0 - if the user didn't bought this serie
	 * 1 - if this article is not unlocked yet
	 * 2 - if this article is allowed
	 * @type {number}
	 */
	var View = new keystone.View(req, res);
	res.locals.articleStatus = 0;

	req.user.purchases.map(function(serie, i) {
		serie.unlockSheddule.map(function(item, i) {
			if (item.article.toString() === req.params.post) {
				res.locals.articleStatus = 1;
				if (item.unlockDate < new Date()) {
					res.locals.articleStatus = 2;
				}
			}
		});
	});

	if (res.locals.articleStatus === 0 || res.locals.articleStatus === 1) {
		res.locals.error = 'You\'re not authorized to see this item';
		return View.render('error', res.locals);
	}

	next();
};

exports.categoryIsLocked = function(req, res, next) {

	/**
	 * 0 - if the user didn't bought this serie
	 * 1 - if this serie is allowed
	 * @type {number}
	 */
	var View = new keystone.View(req, res);
	res.locals.categoryStatus = 0;

	req.user.purchases.map(function(serie, i) {
		if (serie.product === req.params.category) {
			res.locals.categoryStatus = 1;
		}
	});

	if (res.locals.categoryStatus === 0) {
		res.locals.error = 'You\'re not authorized to see this item';
		return View.render('error', res.locals);
	}

	next();
};
