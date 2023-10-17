const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        index: 'text',
    },
    description: {
        type: String,
        required: true,
        index: 'text',
    },
    price: {
        type: Number,
        required: true,
        index: true,
    },
    image: {
        type: String,
        required: true,
    },
    images: [String],
    active: {
        type: Boolean,
        required: true,
    },
    admin_id: {
        type: String,
        required: true,
    },
    category_id: {
        type: String,
        required: true,
    }
});

const Product = mongoose.model('product', productSchema);
module.exports = Product;