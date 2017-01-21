const keystone = require('keystone');
const Order = keystone.list('Order');
const Post = keystone.list('Post');
const PostCategory = keystone.list('PostCategory');
const User = keystone.list('User');
const paypal = require('../../../config/paypal');
const async = require('async');
const mailer = require('../../../helpers/mailer');
const paypalTemplates = require('../../helpers/paypal_templates');

module.exports = (req, res, next) => {
    const locals = res.locals;
    const View = new keystone.View(req, res);

    if (req.query.success) {
        paypal.payment.execute(req.session.paymentId, paypalTemplates.execute({
            payerId: req.query.PayerID,
            total: req.session.totalPrice,
        }), (err, payment) => {
            if (err) {
                locals.error = 'An error has occurred while occurred while executing the payment. You have not been charged.';
                return View.render('error', locals);
            }

            async.parallel([
                (done) => {
                    User.model.findOne({
                        _id: req.user._id,
                    }, {}, (err, user) => {
                        if (err) {
                            return done(err);
                        }

                        user.purchases = user.purchases ? user.purchases : [];

                        return done(null, user);
                    });
                },
                (done) => {
                    Post.model.find()
                        .where('categories', req.session.itemBoughtId)
                        .where('state', 'published')
                        .exec((err, articles) => {
                            if (err) {
                                return done(err);
                            }

                            return done(null, articles);
                        });
                },
                (done) => {
                    PostCategory.model.findOne({
                        _id: req.session.itemBoughtId,
                    }, {}, (err, category) => {
                        return done(err, category);
                    });
                }
            ], (err, results) => {
                if (err) {
                    locals.error = 'An error has occurred while processing your order. Your payment ID is ' + req.query.paymentId + '. Please contact support and supply your Payment ID';
                    return View.render('error', locals);
                }

                const purchaseDate = new Date();
                const schedule = [];

                for (var i = 0; i < results[1].length; i++) {
                    schedule.push({
                        article: results[1][i]._id,
                        unlockDate: new Date(purchaseDate.getTime() + (i * 604800000))
                    });
                }

                results[0].purchases.push({
                    purchased: purchaseDate,
                    product: req.session.itemBoughtId,
                    unlockSheddule: schedule,
                });
                results[0].save((err, userSaved) => {
                    if (err) {
                        locals.error = 'An error has occurred while processing your order. Your payment ID is ' + req.query.paymentId + '. Please contact support and supply your Payment ID';
                        return View.render('error', locals);
                    }

                    locals.paymentId = req.query.paymentId;
                    locals.puchaseSchedule = userSaved.purchases[userSaved.purchases.length - 1];
                    locals.purchaseDate = purchaseDate;
                    locals.purchaseMethod = 'Paypal';
                    locals.itemBought = results[2];
                    locals.section = 'payment';

                    Order.model.create({
                        purchaseDate: Date.now(),
                        itemBought: req.session.itemBoughtId,
                        user: req.user._id,
                        success: req.query.success,
                        paymentId: req.query.paymentId,
                    }, (err, order) => {
                        if (err) {
                            console.error('Order failed to save. The payment has been succeded anyway');
                        }

                        mailer.getTemplate('purchase', locals, (err, html) => {
                            if (err) {
                                return console.log('Error at sending purchase email');
                            }

                            const mailOptions = {
                                html,
                                from: mailer.mailSender,
                                to: req.user.email,
                                subject: 'You have purchased a new item',
                            };

                            mailer.sendMail(mailOptions, (err, info) => {
                                if (err) {
                                    return console.log('Error sending confirmation email');
                                }

                                console.log('Confirmation email has been sent');
                            })
                        })

                        return View.render('purchase/purchase_result', locals);
                    });
                });
            });
        });
        console.log(locals);
    }
    else {
        locals.error = 'The payment has been canceled';
        return View.render('error', locals);
        console.log(locals);
    }
};
