const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: [true,"Name is required."],
        index: 'text',
    },
    description: {
        type: String,
        required: [true,"Description is required."],
        index: 'text',
    },
    specs: [String],
    price: {
        type: Number,
        required: [true,"Price is required."],
        index: true,
    },
    discount: {
        type: Number,
        required:[true,"Discount is required."],
    },
    image: {
        type: String,
        required: [true,"Image is required."],
    },
    images: [String],
    active: {
        type: Boolean,
        required: [true,"Active is required."],
    },
    admin_id: {
        type: String,
        required: [true,"Admin Id is required."],
    },
    category_id: {
        type: String,
        required: [true,"Category Id is required."],
    }
});

const Product = mongoose.model('product', productSchema);
module.exports = Product;