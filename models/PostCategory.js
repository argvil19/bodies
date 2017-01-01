var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PostCategory Model
 * ==================
 */

var PostCategory = new keystone.List('PostCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
});

PostCategory.add({
	name: { type: String, required: true },
  price: { type: Types.Money, required: false, currency: 'en-us' },
  articles: { type: Types.TextArray, required: false },
  author: { type: String, required: false },
  creationDate: { type: Types.Date, required: true, default: Date.now },
  images: { type: Types.TextArray, required: false },
  published: { type: Types.Boolean, required: true, default: true },
});

PostCategory.relationship({ ref: 'Post', path: 'categories' });

PostCategory.register();
