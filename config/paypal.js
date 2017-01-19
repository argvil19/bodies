const paypal = require('paypal-rest-sdk');

const clientID = "INSERT YOUR CLIENT_ID HERE - PAYPAL DEV API";
const clientSecret = "INSERT YOUR CLIENT_SECRET HERE - PAYPAL DEV API";

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': clientID,
    'client_secret': clientSecret,
    'headers': {
        'custom': 'header'
    }
});

module.exports = paypal;
