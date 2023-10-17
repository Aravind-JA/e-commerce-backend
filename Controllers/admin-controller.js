const Admin = require('../Models/admin-model');
const UID = require('../Functions/uid');
const bcrypt = require('bcryptjs');

async function PostData(req, res) {
    const { userName, password, email, phone } = req.body;
    try {
        if (userName && password && email && phone) {
            const hash = await bcrypt.hash(password, 10);
            const Body = {
                userName, password:hash, email, phone, id: UID("AD")
            };
            const data = await Admin.create(Body);
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: "All fields ara mandatory..." });
        }
    } catch (error) {
        res.status(400).json(error);
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

module.exports = { PostData, GetData, GetOneData, PutData, DeleteData };