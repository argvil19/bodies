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
    logo: {
        type: Types.CloudinaryImage
    },
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