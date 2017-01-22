var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'purchases';
	locals.filters = {
		category: req.params.category,
	};
	locals.data = {
		posts: [],
		categories: [],
	};

	const unlockedArticles = req.user.purchases.filter(item => item.product === req.params.category)[0].unlockSheddule.filter(item => new Date() > item.unlockDate).map(item => item.article);

	keystone.list('Post').model.find({
		categories: req.params.category,
		_id: {
			$in: unlockedArticles,
		},
	}, {}, (err, posts) => {
		if (err) {
			locals.error = 'Internal Server Error';
			return view.render('error', locals);
		}

		keystone.list('PostCategory').model.find({
			_id: {
				$in: req.user.purchases.map(item => item.product),
			},
		}, {}, (err, category) => {
			if (err) {
				locals.error = 'Internal Server Error';
				return view.render('error', locals);
			}

			locals.data.categories.push(category);
			locals.data.posts = posts;

			return view.render('blog', locals);
		});
	});
};
