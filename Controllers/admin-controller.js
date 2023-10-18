const Admin = require('../Models/admin-model');
const UID = require('../Functions/uid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function Register(req, res) {
    const { userName, password, email, phone } = req.body;

    try {
        if (!userName || !password || !email || !phone) {
            return res.status(400).json({ message: "All fields are mandatory." });
        }

        const existingUser = await Admin.findOne({ $or: [{ userName }, { email }] });

        if (existingUser) {
            return res.status(409).json({ message: "User with the same username or email already exists." });
        }

        // Hash the password
        const hash = await bcrypt.hash(password, 10);

        // Create a new admin
        const Body = { userName, password: hash, email, phone, id: UID("AD") };

        const data = await Admin.create(Body);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: "Registration failed." });
    }
}


async function Login(req, res) {
    const { userName, password } = req.body;

    try {
        if (!userName || !password) {
            return res.status(400).json({ message: "Both username and password are required." });
        }

        // Find the admin by their username
        const admin = await Admin.findOne({ userName });

        if (!admin) {
            return res.status(401).json({ message: "Authentication failed. User not found." });
        }

        // Compare the entered password with the stored hash
        const passwordMatch = await bcrypt.compare(password, admin.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Authentication failed. Password is incorrect." });
        }

        // If the username and password match, create a JWT token and send it to the client
        const token = jwt.sign({ id: admin.id, userName: admin.userName }, process.env.Admin_Key);

        res.status(200).json({ token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Login failed." });
    }
}


async function GetData(req, res) {
    try {
        const data = await Admin.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
}

async function GetOneData(req, res) {
    try {
        const admin_id = req.params.id;
        if (admin_id) {
            const data = await Admin.findOne({ id: admin_id });
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
        const data = await Admin.findOneAndUpdate(filter, req.body, { new: true });
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
        const data = await Admin.findOneAndDelete(filter);
        if (!data) {
            res.status(404).json({ message: "User not found!!!" });
        } else {
            res.status(200).json({ messgae: "Successfully Deleted..." });
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = { Register, Login, GetData, GetOneData, PutData, DeleteData };