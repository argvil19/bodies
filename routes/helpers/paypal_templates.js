const acceptUrl = 'https://web-projects-argvil19.c9users.io/payment/receive?success=true';
const rejectUrl = 'https://web-projects-argvil19.c9users.io/payment/receive?success=false';

module.exports.authorize = (params) => {
    const name = params.name;
    const sku = params.sku;
    const price = params.price.toString();
    const quantity = 1;
    const totalPrice = price;

    return {
        "intent": "authorize",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": acceptUrl,
            "cancel_url": rejectUrl
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": name,
                    "sku": sku,
                    "price": price,
                    "currency": "USD",
                    "quantity": quantity
                }]
            },
            "amount": {
                "currency": "USD",
                "total": totalPrice
            },
            "description": "Serie subscription for HIT-Bodies"
        }]
    };
};

module.exports.execute = (params) => {
    return {
        "payer_id": params.payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": params.total,
            }
        }]
    };
};
