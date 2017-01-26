const stripe = require('stripe')('sk_test_WBPu9tPUmLJXbLaMmpOpUvAU');
const keystone = require('keystone');
const Order = keystone.list('Order');
const User = keystone.list('User');
const PostCategory = keystone.list('PostCategory');
const Post = keystone.list('Post');
const async = require('async');
const mailer = require('../../../helpers/mailer');

module.exports = (req, res, next) => {
    const stripeToken = req.body.stripeToken;

    PostCategory.model.findOne({
        _id: req.body.itemBoughtId,
    }, {}, (err, itemBought) => {
        if (err) {
            return res.status(500).send({
                message: 'Internal Server Error',
                success: false
            });
        }
        else if (!itemBought) {
            return res.status(404).send({
                message: 'The item you are trying to buy doesn\'t exist',
                success: false
            });
        }

        stripe.charges.create({
            card: stripeToken,
            currency: 'usd',
            amount: parseInt(itemBought.price, 10) * 100,
        }, (err, charge) => {
            if (err) {
                return res.status(500).send(err);
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
                        .where('categories', req.body.itemBoughtId)
                        .where('state', 'published')
                        .exec((err, articles) => {
                            if (err) {
                                return done(err);
                            }

                            return done(null, articles);
                        });
                }
            ], (err, results) => {
                if (err) {
                    return res.status(500).send({
                        message: 'Internal Server Error',
                        success: false
                    });
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
                    product: req.body.itemBoughtId,
                    unlockSheddule: schedule,
                });

                results[0].save((err, userSaved) => {
                    if (err) {
                        console.log('Error saving User schedule');
                    }

                    Order.model.create({
                        purchaseDate: Date.now(),
                        itemBought: req.body.itemBoughtId,
                        user: req.user._id,
                        success: true,
                    }, (err, order) => {
                        if (err) {
                            console.log('Error saving order with CC. Payment still approved');
                        }

                        mailer.getTemplate('purchase_cc', {
                            order,
                            itemBought,
                            user: results[0],
                            purchaseMethod: 'Credit Card',
                            purchaseDate: new Date().toLocaleDateString()
                        }, (err, html) => {
                            if (err) {
                                return console.log('Error at sending purchase email');
                            }

                            const mailOptions = {
                                html,
                                from: mailer.mailSender,
                                to: req.user.email,
                                subject: 'You have purchased a new item',
                            };

                            mailer.transporter.sendMail(mailOptions, (err, info) => {
                                if (err) {
                                    console.log(err);
                                    return console.log('Error sending confirmation email');
                                }

                                console.log('Confirmation email has been sent');
                            });
                        });

                        return res.status(201).send({
                            message: 'Purchase completed',
                            success: true,
                        });
                    });
                });
            });
        });
    });
};