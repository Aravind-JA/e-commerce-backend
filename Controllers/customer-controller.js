const Customer = require('../Models/customer-model');
const { PostCart, DeleteCart } = require('./cart-controller');
const UID = require('../Functions/uid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function PostData(req, res) {
    const { firstName, lastName, password, email, phone, address, district, state } = req.body;
    try {
        if (firstName && lastName && password && email && phone && address && district && state) {

            const existingUser = await Customer.findOne({ $or: [{ phone }, { email }] });

            if (existingUser) {
                return res.status(409).json({ message: "User with the same email already exists." });
            }

            const hash = await bcrypt.hash(password, 10);

            const Body = { firstName, lastName, password: hash, email, phone, address, district, state, id: UID("CS") };

            const data = await Customer.create(Body);

            await PostCart(Body.id);
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: "All fields are mandatory..." });
        }
    } catch (error) {
        res.status(400).json({ error, message: "error" });
    }
}

async function Login(req, res) {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Both email and password are required." });
        }

        const user = await Customer.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Authentication failed. User not found." });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Authentication failed. Password is incorrect." });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.Customer_Key);
        res.status(200).json({ token, id: user.id });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Login failed." });
    }
}

async function GetData(req, res) {
    try {
        const data = await Customer.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
}

async function GetOneData(req, res) {
    try {
        const customer_id = req.params.id;
        const filter = { id: customer_id };
        if (customer_id) {
            const data = await Customer.findOne(filter);
            if (!data) {
                res.status(404).json({ message: "User not found!!!" });
            } else {
                res.status(200).json(data);
            }
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

async function PutData(req, res) {
    try {
        const filter = { id: req.params.id };
        const data = await Customer.findOneAndUpdate(filter, req.body, { new: true });
        if (!data) {
            res.status(404).json({ message: "User not found!!!" });
        } else {
            res.status(201).json({ message: "Successfully updated...", data });
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

async function DeleteData(req, res) {
    try {
        const filter = { id: req.params.id };
        const data = await Customer.findOneAndDelete(filter);
        await DeleteCart(filter);
        if (!data) {
            res.status(404).json({ message: "User not found!!!" });
        } else {
            res.status(200).json({ messgae: "Successfully Deleted..." });
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = { PostData, Login, GetData, GetOneData, PutData, DeleteData };