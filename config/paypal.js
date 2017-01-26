const paypal = require('paypal-rest-sdk');

const clientID = "AVW34J5m8m2OKfTEzZa2HwPT2wmgU5nMmiP_UZ9a-QMORFANDtiJkYWKqurKIXZOfaHWR76CoabtszLH";
const clientSecret = "ENvnw80-rvrDHYaRKYngB74VZH9WClQqRgvjbKl9OagM9ZwKsinjytX8TM6U2M1AObhIppP22lXSoRgu";

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': clientID,
    'client_secret': clientSecret,
    'headers': {
        'custom': 'header'
    }
});

module.exports = paypal;
