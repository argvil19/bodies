/**
 * This script automatically creates a default Admin user when an
 * empty database is used for the first time. You can use this
 * technique to insert data into any List you have defined.
 *
 * Alternatively, you can export a custom function for the update:
 * module.exports = function(done) { ... }
 */

exports.create = {
	PostCategory: [
		{ name: 'TestCategory', price: 200,  articles: [ '58696075ba2522120005670e', '586965cbba2522120005670f' ], author: '58640e095a1dcca306ba792b', creationDate: new Date(), images: ['http://res.cloudinary.com/keystone-demo/image/upload/v1483302759/n2auqk9chwpoabdftjaj.jpg'], published: true }
	],
};
