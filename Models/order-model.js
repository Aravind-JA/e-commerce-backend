const mongoose = require('mongoose');

orderSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    customer_id: {
        type: String,
        required: true
    },
    order_date: {
        type: String,
        required: true
    },
    items: [
        {
            product_id: {
                type: String,
                required: true
            },
            admin_id: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    total_price: {
        type: Number,
        required: true
    }
});

const Order = mongoose.model('order', orderSchema);

module.exports = Order;