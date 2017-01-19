var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Order = new keystone.List('Order');

Order.add({
    success: {
        type: Types.Boolean,
    },
    purchaseDate: {
        type: Types.Date,
    },
    itemBought: {
        type: Types.Relationship,
        ref: 'PostCategory',
    },
    user: {
        type: Types.Relationship,
        ref: 'User',
    },
    paymentId: {
        type: String,
    },
});

Order.register();
