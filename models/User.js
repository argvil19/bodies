var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User');

User.add({
	name: {
		type: Types.Name,
		required: true,
		index: true
	},
	email: {
		type: Types.Email,
		initial: true,
		required: true,
		index: true
	},
	password: {
		type: Types.Password,
		initial: true,
		required: true
	},
}, 'Permissions', {
	isAdmin: {
		type: Boolean,
		label: 'Can access Keystone',
		index: true
	},
});

User.schema.add({
	// ARRAY of OBJECTS. Items user has bought (series of articles)
	categoryAccess: {
		type: [{
			serieId: Number,
			unlocked: Array,
			nextUnlock: Date,
		}]
	},
	
	/**
	 * My suggestion of this block
	 * unlockSheddule structure:
	 * type: [{
   *		article: {
	 *			type: Types.Relationship,
	 *			ref: 'Post'
	 *		},
	 *		unlockDate: Date
	 *	}]
	 */
	purchases: {
		type: [
			{
				product: String,
				purchased: Date,
				unlockSheddule: Array
			}
		]
	}
})

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});


/**
 * Relationships
 */
User.relationship({
	ref: 'Post',
	path: 'posts',
	refPath: 'author'
});


/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin';
User.register();
