const Order = require('../Models/order-model');
const UID = require('../Functions/uid');
const { PostCart, DeleteCart } = require('./cart-controller');

async function PostData(req, res) {
    try {
        const { customer_id, order_date, items, total_price } = req.body;
        const Body = { customer_id, order_date, items, total_price, id: UID('OD') };
        const order = await Order.create(Body);
        await DeleteCart(customer_id);
        await PostCart(customer_id);
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json(error);
    }
}

async function GetData(req, res) {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json(error);
    }
}

async function GetOneData(req, res) {
    try {
        const order_id = req.params.id;
        const filter = { id: order_id };
        const order = await Order.findOne(filter);
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json(error);
    }
}

async function GetAdminData(req, res) {
    try {
        const admin_id = req.params.id;
        const orders = await Order.aggregate([
            {
                $match: {
                    "items.admin_id": admin_id,
                }
            }
        ]);
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json(error);
    }
}

async function GetCustomerData(req, res) {
    try {
        const customer_id = req.params.id;
        const filter = { customer_id: customer_id };
        const orders = await Order.find(filter);
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json(error);
    }
}

async function DeleteData(req, res) {
    try {
        const order_id = req.params.id;
        const filter = { id: order_id };
        const order = await Order.findOneAndDelete(filter);
        res.status(200).json({ message: "Successfully Deleted...", order });
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = { PostData, GetOneData, GetAdminData, GetCustomerData, DeleteData, GetData };