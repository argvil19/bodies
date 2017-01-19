const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'INSERT YOUR CLIENT_ID HERE',
    'client_secret': 'INSERT YOUR CLIENT_SECRET HERE',
    'headers': {
        'custom': 'header'
    }
});

module.exports = paypal;
