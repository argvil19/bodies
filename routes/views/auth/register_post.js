const keystone = require('keystone');
const User = keystone.list('User');
module.exports = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    if (!(name && email && password)) {
        return res.status(403).send({
            message: 'Missing required parameter'
        });
    }
    User.model.findOne({
        email
    }, {}, (err, user) => {
        if (err) {
            return res.status(500).send({
                message: 'Internal Server Error',
                success: false,
            });
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
                return res.status(500).send({
                    message: 'Internal Server Error',
                    success: false,
                });
            }
            
            req.flash('success', 'Success! You can log in with your new account.');
            return res.send({
                message: 'Success! You can log in with your new account.',
                success: true,
                redirect: '/keystone/signin',
            });
        });
    });
};