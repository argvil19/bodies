var keystone = require('keystone');
var Types = keystone.Field.Types;
/**
 * Settings
 * ==========
 */
var Settings = new keystone.List('Settings');

Settings.add({
    name: {
        type: String
    },
    phone: {
        type: Types.Text
    },
    phoneShow: {
        type: Types.Boolean,
        label: "Show phone number in footer?"
    },
    email: {
        type: Types.Text
    },
    address: {
        type: Types.Text
    },
    addressShow: {
        type: Types.Boolean,
        label: "Show address in footer?"
    },
    menuLogo: {
        type: Types.CloudinaryImage
    },
    // menuLogoColor: {
    //     type: Types.Color
    // },
    frontPageLogo: {
        type: Types.CloudinaryImage
    },
    // frontPageLogoColor: {
    //     type: Types.Color
    // },
    facebookUrl: {
        type: Types.Url
    },
    twitterUrl: {
        type: Types.Url
    },
    instagramUrl: {
        type: Types.Url
    }
});

Settings.defaultColumns = 'name, facebookUrl, twitterUrl, instagramUrl';

Settings.register();