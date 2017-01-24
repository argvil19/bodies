var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Contact Model
 * ==========
 */
var Contact = new keystone.List('Contact');

Contact.add({
    address: {
        type: String,
    },
    contactInfo: {
        type: Types.Html,
        wysiwyg: true,
    },
});

Contact.register();
