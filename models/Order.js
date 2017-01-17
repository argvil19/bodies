var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Order = new keystone.List('Order');

Order.add({
    purchaseDate: {
        type: Types.Date,
    },
    itemBought: {
        type: Types.Relationship,
    }
})



Order.defaultColumns = 'name, email, isAdmin';
Order.register();
