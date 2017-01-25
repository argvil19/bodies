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
	contact: 'contacts',
});

// Unlock watcher - mail sender.
require('./helpers/mail_unlock')();

// Set redirect after successful login
keystone.set('signin redirect', function(user, req, res) {
	var url = (user.isAdmin) ? '/keystone' : '/';
	res.redirect(url);
});

keystone.set('signout redirect', function(req, res) {
	var url = '/';
	res.redirect(url);
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
