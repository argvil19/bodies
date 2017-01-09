// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
var environment = require('dotenv').config();
// Require keystone
var keystone = require('keystone');
// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.
keystone.init({
	'name': 'hit-bodies',
	'brand': 'hit-bodies',
	'mongo': 'mongodb://hit-bodies-test:test@ds021663.mlab.com:21663/hit-bodies',
	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'jade',
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': environment.COOKIE_SECRET,
});
// Load your project's Models
keystone.import('models');
// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});
// Load your project's Routes
keystone.set('routes', require('./routes'));
// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	users: 'users',
});
/**
 * Mail settings
 */ 
var nodemailer = require('nodemailer');
var mailSender = '"HVU site administrator" <account@gmail.com>';
var transporter = nodemailer.createTransport('smtps://account%40gmail.com:password@smtp.gmail.com');
/**
 * User notification system
 */ 
var User = keystone.list('User').model,
		Post = keystone.list('Post').model,
		CronJob = require('cron').CronJob,
		cronInterval = 20; // It means searching every 20 seconds
// Generate template for mail text
var jade = require('jade'),
		fs = require('fs');
var mailTemplate;
fs.readFile('./templates/mail/unlock.jade', 'utf8', function (err, data) {
	if (err) throw err;
	mailTemplate = jade.compile(data);
});
// Start cron
new CronJob('*/' + cronInterval + ' * * * * *', 
	function() {
		var date = new Date();
		console.log('========== Searching articles for notificate user about unlock ==========');
		console.log('From date: ' + new Date(date.getTime() - cronInterval * 1000));
		console.log('To date:   ' + date);
		
		User.aggregate()
			.project({_id: 1, purchases: 1, email: 1})
			.unwind('purchases')
			.project({purchases: 1, email: 1, 'sheddule': '$purchases.unlockSheddule'})
			.unwind('sheddule')
			.match({ 'sheddule.unlockDate': { '$lt': date, '$gte': new Date(date.getTime() - cronInterval * 1000) } })
			.exec(function(err, results){
				for (var i in results) {
					console.log('Sending email to ' + results[i].email + '. Unlock article ' + results[i].sheddule.article);
					Post.findOne({
						_id: results[i].sheddule.article
					}, function(err, article){
						if (!err) {
							var mailOptions = {
								from: mailSender,
								to: results[i].email,
								subject: 'Article unlocked by sheddule',
								html: mailTemplate({article: article})
							};
							transporter.sendMail(mailOptions, function(error, info){
								if(error){
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
// Start Keystone to connect to your database and initialise the web server
keystone.start();