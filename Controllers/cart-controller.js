const Cart = require('../Models/cart-model');

async function PostCart(id) {
    const Body = { id, items: [] };
    const data = await Cart.create(Body);
    return data;
}

async function GetData(req, res) {
    try {
        const data = await Cart.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
}

async function GetOneData(req, res) {
    try {
        const filter = { id: req.params.customer_id }
        const data = await Cart.findOne(filter);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
}

async function PostCartItem(req, res) {
    try {
        const { customer_id } = req.params;
        const { product_id } = req.body;
        const items = { product_id };
        const filter = { id: customer_id };
        const cart = await Cart.findOne(filter);
        cart.items.push(items);
        const updatedCart = await cart.save();
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(400).json(error);
    }
}

async function DeleteCartItem(req, res) {
    try {
        const { customer_id, product_id } = req.params;
        const filter = { id: customer_id };
        const cart = await Cart.findOne(filter);
        const itemIndex = cart.items.findIndex(item => item.product_id === product_id);
        if (itemIndex == -1) {
            res.status(404).json({ messgae: "Product not found in cart !!!" });
            return;
        }
        cart.items.splice(itemIndex, 1);
        const updatedCart = await cart.save();
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(400).json(error);
    }
}

// async function PutData(req, res) {
//     const filter = { id: req.params.customer_id };
//     // const data = await Cart.findOne(filter);
//     const items = req.body;
//     const Body = { filter, items: items };
//     const data = await Cart.findOneAndUpdate(filter, { $set: Body }, { new: true });
//     res.status(200).json(data);
// }

async function DeleteCart(id) {
    const data = await Cart.findOneAndDelete(id);
    return data;
}

// async function DeleteData(req, res) {
//     const filter = { id: req.params.id };
//     const data = await Cart.findOneAndDelete(filter);
//     if (!data) {
//         res.status(404).json({ message: "Cart not found!!!" });
//     } else {
//         res.status(200).json({ messgae: "Successfully Deleted..." });
//     }
// }

module.exports = { GetData, GetOneData, PostCart, PostCartItem, DeleteCartItem, DeleteCart };