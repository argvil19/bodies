var keystone = require('keystone');
var async = require('async');
var Post = keystone.list('Post').model;

exports = module.exports = function (req, res, next) {

	console.log('user item end point', req.params.id);

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'user';

	var User = req.user;
	
	Post.findOne({
		_id: req.params.id
	}, function(err, article) {
		if (err) {
			return next(err);
		}
		
		/**
		 * Checking purchases
		 */
		var bought = User.purchases.some(function(item){
			return article.categories.some(function(cat){
				return item.product === cat.toString();
			}); 
		});
		
		if (!bought) {
			locals.alert = "You didn't buy this."; 
		} else {

			/**
			 * Filtering products by article Id
			 */
			var category = User.purchases.filter(function(item){
				return item.unlockSheddule.some(function(subitem){
					return subitem.article.toString() === req.params.id;
				})
			})[0];

			/**
			 * Getting unlock time from sheddule
			 */
			var unlockDate = category.unlockSheddule.filter(function(item){
				return item.article.toString() === req.params.id;
			})[0].unlockDate;
			
			if(unlockDate.getTime() > new Date().getTime()) {
				locals.alert = "You can't acces it yet. It will be unlocked at " + unlockDate.toTimeString();
			} else {
				locals.item = article;
			}
		}

		// Render the view
		view.render('user/item/details', locals);
	});
};
