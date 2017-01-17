var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PostCategory Model
 * ==================
 */

/* Shop items are categories
 * An user buys access to these categories
 */

var PostCategory = new keystone.List('PostCategory', {
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	},
	label: 'Series',
	singular: 'serie',
	plural: 'series',
});

PostCategory.add({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Types.Money,
		required: true,
		currency: 'en-us',
		default: 0,
	},
	author: {
		type: Types.Relationship,
		ref: 'User',
	},
	creationDate: {
		type: Types.Date,
		required: true,
		default: Date.now,
	},
	images: {
		type: Types.CloudinaryImage,
		required: false,
	},
	description: {
		type: Types.Textarea,
		required: false,
	},
	published: {
		type: Types.Boolean,
		default: false,
	},
});

PostCategory.relationship({
	ref: 'Post',
	path: 'categories'
});

PostCategory.register();
