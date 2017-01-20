const keystone = require('keystone');
const User = keystone.list('User');

module.exports = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const View = new keystone.View(req, res);
    const locals = res.locals;

    if ((name || email || password) === {}) {
        return res.status(403).send({
            message: 'Missing required parameter'
        });
    }

    User.model.findOne({
        email
    }, {}, (err, user) => {
        if (err) {
            locals.error = 'Internal Server Error';
            return View.render('error', locals);
        }
        else if (user) {
            return res.status(403).send({
                message: 'Email already registered'
            });
        }

        User.model.create({
            name,
            email,
            password,
        }, (err, created) => {
            if (err) {
                locals.error = 'Internal Server Error';
                return View.render('error', locals);
            }

            return res.send({
                message: 'Success! You can log in with your new account.',
                success: true,
                redirect: '/keystone/signin',
            });

        });
    });
};
