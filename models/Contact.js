var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Contact Model
 * ==========
 */
var Contact = new keystone.List('Contact');

Contact.add({
    longitude: {
        type: Types.Number,
        default: -43.81347656,
    },
    latitude: {
        type: Types.Number,
        default: 29.72622232,
    },
    contactInfo: {
        type: Types.Html,
        wysiwyg: true,
    },
});

Contact.register();
