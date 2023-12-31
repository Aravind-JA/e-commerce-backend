const mongoose = require('mongoose');
const adminSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    });

const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;