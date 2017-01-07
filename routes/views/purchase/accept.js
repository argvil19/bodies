var keystone = require('keystone');
var PostCategory = keystone.list('PostCategory').model;
var Post = keystone.list('Post').model;
var User = keystone.list('User').model;

exports = module.exports = function (req, res) {

	console.log('purchase accept end point. ' +
		'User: ' + req.query.user + ', ' +
		'Product: ' + req.query.product + ', ' +
		'Secret: ' + req.query.secret
	);

	// TODO: Add secret checking here
	
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'user';
	
	User.findOne({
		_id: req.query.user
	}, function(err, user) {
		if (err) { return res.json({ success: false, mgs: err.message }) }
		if (!user) { return res.json({ success: false, mgs: 'User not found.' }) }
	
		PostCategory.findOne({
			_id: req.query.product
		}, function(err, category) {
			if (err) { return res.json({ success: false, mgs: err.message }) }
			if (!category) { return res.json({ success: false, mgs: 'Product not found.' }) }
			
			Post.find({
				categories: req.query.product
			}, function(err, articles) {
				if (err) { return res.json({ success: false, mgs: err.message }) }
				if (!articles) { return res.json({ success: false, mgs: 'Articles not found.' }) }

				var purchaseDate = new Date();
				var sheddule = [];
				
				for (var i in articles) {
					sheddule.push({
						article: articles[i]._id,
						unlockDate: new Date(purchaseDate.getTime() + i * 604800)
					})
				}
				
				user.purchases.push({
					product: category.id,
					purchased: purchaseDate,
					unlockSheddule: sheddule
				});
				
				user.save();

				res.json({
					success: true
				})
			})
		})
	})
};
