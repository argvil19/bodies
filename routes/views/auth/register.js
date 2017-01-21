const keystone = require('keystone');

module.exports = (req, res, next) => {
    if (req.user) {
        return res.redirect('/');
    }

    const View = new keystone.View(req, res);
    const locals = res.locals;

    locals.error = req.flash('error');
    locals.section = 'register';

    View.render('user/signup', locals);
};
