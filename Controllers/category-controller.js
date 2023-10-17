const UID = require('../Functions/uid');
const Category = require('../Models/category-model');

async function GetData(req, res) {
    try {
        const data = await Category.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
}

async function GetOneData(req, res) {
    try {
        const category_id = req.params.id;
        const filter = { id: category_id }
        const data = await Category.findOne(filter);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
}

async function PostData(req, res) {
    try {
        const { name } = req.body;
        const id = UID("CT");
        const Body = { id, name };
        const data = await Category.create(Body);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
}

async function DeleteData(req, res) {
    try {
        const filter = { id: req.params.id };
        const data = await Category.findOneAndDelete(filter);
        res.status(200).json({ message: "Successfully DeleteData..." });
    } catch (error) {
        res.status(400).json(error);
    }
}

async function PutData(req, res) {
    try {
        const filter = { id: req.params.id };
        const Body = req.body;
        const data = await Category.findOneAndUpdate(filter, Body, { new: true });
        res.status(200).json({message:"Successfully updated...",data});
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = { GetData, GetOneData, PostData,PutData, DeleteData };