'use strict';

const keystone = require('keystone');
const User = keystone.list('User').model;
const Post = keystone.list('Post').model;
const PostCategory = keystone.list('PostCategory').model;
const CronJob = require('cron').CronJob;
const jade = require('jade');
const fs = require('fs');
const mailer = require('./mailer');

const cronInterval = 60; // It means searching every 60 seconds

module.exports = () => {
    fs.readFile(process.env.PWD + '/templates/mail/unlock.jade', 'utf8', function(err, data) {
        if (err) throw err;
        const mailTemplate = jade.compile(data);
        
        new CronJob('*/' + cronInterval + ' * * * * *',
            function() {
                var date = new Date();
                console.log('========== Searching articles for notificate user about unlock ==========');
                console.log('From date: ' + new Date(date.getTime() - cronInterval * 1000));
                console.log('To date:   ' + date);
        
                User.aggregate()
                    .project({
                        _id: 1,
                        purchases: 1,
                        email: 1
                    })
                    .unwind('purchases')
                    .project({
                        purchases: 1,
                        email: 1,
                        'sheddule': '$purchases.unlockSheddule'
                    })
                    .unwind('sheddule')
                    .match({
                        'sheddule.unlockDate': {
                            '$lt': date,
                            '$gte': new Date(date.getTime() - cronInterval * 1000)
                        }
                    })
                    .exec(function(err, results) {
                        for (var i in results) {
                            console.log('Sending email to ' + results[i].email + '. Unlock article ' + results[i].sheddule.article);
        
                            Post.findOne().where('_id', results[i].sheddule.article).populate('categories').exec(function(err, article) {
                                if (!err) {
                                    var mailOptions = {
                                        from: mailer.mailSender,
                                        to: results[i].email,
                                        subject: 'HIT-Bodies - new article unlocked',
                                        html: mailTemplate({
                                            article: article,
                                            category: article.categories[0],
                                        }),
                                    };
        
                                    mailer.transporter.sendMail(mailOptions, function(error, info) {
                                        if (error) {
                                            return console.log(error);
                                        }
                                        console.log('Message sent: ' + info.response);
                                    });
        
                                }
                            });
                        }
                    });
            },
            null,
            true,
            'America/Los_Angeles'
        );
    });
}