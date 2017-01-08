var keystone = require('keystone');
var PostCategory = keystone.list('PostCategory').model;
exports = module.exports = function (req, res, next) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	PostCategory.find({
			published: true
	})
		.sort({creationDate: -1})
		.limit(8)
		.exec(function(err, categories){
			if (err || !categories.length) {
				return next(err);
			}
			
			locals.recent = categories;
			// Render the view
			view.render('index', locals);
		});
};