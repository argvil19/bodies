const paypal = require('paypal-rest-sdk');

/*paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'INSERT YOUR CLIENT_ID HERE',
    'client_secret': 'INSERT YOUR CLIENT_SECRET HERE',
    'headers': {
        'custom': 'header'
    }
});*/

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AU6pMfUnHKiZlJ3mV80Edkqaj8_wU1TSmAN8iZn7sniAnDDbK7RTYAVq5pr4voovRbMufZhLjr3UAa15',
    'client_secret': 'ECsgg78hLXdLKPfaIPB74_h5ZSzm72S7wgHvA87Pj_VUO8q18D5qrANBLatQWroKlZXbFdkih6mlAwEG',
    'headers': {
        'custom': 'header'
    }
});

module.exports = paypal;
