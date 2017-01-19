const keystone = require('keystone');
const PostCategory = keystone.list('PostCategory');
const paypal = require('../../../config/paypal');
const paypalTemplates = require('../../helpers/paypal_templates');

module.exports = (req, res, next) => {
    const toBuy = req.query.productId;
    const View = new keystone.View(req, res);

    const locals = res.locals;

    if (!toBuy) {
        locals.error = 'You have not specified any item';
        return View.render('error');
    }

    PostCategory.model.findOne({
        _id: toBuy,
        published: true,
    }, {}, (err, category) => {
        if (err) {
            locals.error = 'Item not found';
            return View.render('error', locals);
        }

        paypal.payment.create(paypalTemplates.authorize({
            name: category.name,
            sku: category.name,
            price: category.price,
            quantity: 1,
        }), (err, payment) => {
            if (err) {
                locals.error = 'No response from payment processor';
                return View.render('error', locals);
            }

            payment.links.forEach(item => {
                if (item.rel === 'approval_url') {
                    req.session.paymentId = payment.id;
                    req.session.itemBoughtId = category._id;
                    return res.redirect(item.href);
                }
            });
        });
    });
};
