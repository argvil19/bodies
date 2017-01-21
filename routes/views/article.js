var keystone = require('keystone');
var PostCategory = keystone.list('PostCategory').model;
var Post = keystone.list('Post').model;

exports = module.exports = function(req, res) {

	console.log('article end point', req.params.id);

	var view = new keystone.View(req, res);
	var locals = res.locals;

	Post.findOne({
			_id: req.params.id
		})
		.populate('author categories')
		.exec(function(err, post) {
			if (err) {
				locals.error = 'Internal Server Error';
				return view.render('error', locals);
			}

			if (!res.locals.articleStatus) {
				res.redirect('/store/product/get?id=' + post.categories[0]._id);
			}
			else {

				locals.article = Object.assign({}, post, {
					title: post.title,
					locked: res.locals.articleStatus === 1,
					content: {
						brief: post.content.brief,
						extended: res.locals.articleStatus === 2 ? post.content.extended : ''
					}
				});

				// Init locals
				locals.section = 'article';

				// Render the view
				view.render('article', locals);
			}
		});
};
