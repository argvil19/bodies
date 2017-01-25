var stripeCheckoutInst = StripeCheckout.configure({
  key: 'pk_test_SDlAAnRWJjctOzTe4WqUgAVV',
  image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
  locale: 'auto',
  token: function(token) {
    $.post('/payment/cc/checkout', {
        stripeToken: token.id,
        itemBoughtId: $('#input-hidden-id').val()
    }).then(function (res) {
        Materialize.toast(res.message + ' Redirecting to your purchases...', 10000);
    }).fail(function (err) {
        console.log(err);
    });
  }
});

$(document).ready(function () {
    var onCheckoutWithCC = function(e) {
        e.preventDefault();
        
        stripeCheckoutInst.open({
            name: 'HIT-Bodies',
            description: 'Buy a new serie',
            amount: parseInt($('#input-price-hidden-id').val())
        });
    }
    
    $('#cc-buy-btn').click(onCheckoutWithCC);
});
