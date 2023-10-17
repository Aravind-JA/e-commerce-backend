const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    // customer_id: {
    //     type: String,
    //     required: true
    // },
    items: [
        {
            product_id: String
        }
    ]
}, {
    timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;