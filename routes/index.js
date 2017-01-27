/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */
var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
};

// Setup Route Bindings
exports = module.exports = function(app) {
	
	// Views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', middleware.requireUser, middleware.categoryIsLocked, routes.views.blog);
	app.get('/blog/post/:post', middleware.requireUser, middleware.articleIsLocked, routes.views.post);
	
	// End points
	app.get('/store/get', routes.views.store.get); // ?page=INT
	app.get('/store/product/get', routes.views.store.product.get); // ?id=INT
	// app.get('/cart', middleware.requireUser, routes.views.cart.index);
	// app.get('/cart/add', middleware.requireUser, routes.views.cart.add);
	// app.get('/cart/delete', middleware.requireUser, routes.views.cart.delete);
	app.get('/user/purchases', middleware.requireUser, routes.views.user.purchases);
	app.get('/contact', routes.views.contact.contact);
	app.post('/contact', routes.views.contact.contact_post);
	// This route for getting message from payment system about paument status
	//app.get('/purchase/accept', routes.views.purchase.accept) // ?user=MongoKey & product=mongoKey & secret=String 
	
	// Auth route
	app.get('/signup', routes.views.auth.register);
	app.post('/signup', routes.views.auth.register_post);
	
	// Autocomplete
	app.get('/store/autocomplete/search?', routes.views.search.autocomplete);
	app.get('/store/search?', routes.views.search.search);
	
	// Payment routes
	app.get('/payment/checkout?', middleware.requireUser, routes.views.payment.process);
	app.get('/payment/receive?', middleware.requireUser, routes.views.payment.receive);
	app.post('/payment/cc/checkout', middleware.requireUser, routes.views.payment.credit_card);
	
	// Contact
	//console.log(routes.views.contact);
	//app.post('/contact', routes.views.contact.send_mail);
	
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
};