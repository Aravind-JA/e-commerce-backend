const UID = require('../Functions/uid');
const multer = require('multer');
const path = require('path');
const Product = require('../Models/product-model');
const { upload } = require('../Functions/multer-config');

async function GetData(req, res) {
    try {
        const data = await Product.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
}

async function GetOneData(req, res) {
    try {
        const product_id = req.params.id;
        if (product_id) {
            const data = await Product.findOne({ id: product_id });
            if (!data) {
                res.status(404).json({ message: "Product not found!!!" });
            } else {
                res.status(200).json(data);
            }
        }
    } catch (error) {
        res.status(400).json(error);
    }
}



async function PostData(req, res) {
    upload(req, res, async (err)=> {
        if (err instanceof multer.MulterError) {
            res.status(400).json({ error: "Multer Error...", err });
        } else if (err) {
            res.status(500).send({ error: { message: `unknown uploading error: ${err.message}` } });
        } else {
            try {
               const image = req.files['image'][0].path;
                const files = req.files['images'];
                let images = [];
                for (const file of files) {
                    images.push(file.path);
                }
                const { name, description, price, active, admin_id, category_id } = req.body;
                const Body = { name, description, price, image, images, active, admin_id, category_id, id: UID("PR") };
                const data = await Product.create(Body);
                res.status(200).json(data);
                // res.status(200).json(Body);
            } catch (error) {
                res.status(400).json(error);
            }
        }
    });

}

// async function PostData(req, res) {
//     upload(req, res, (err) => {
//         if (err instanceof multer.MulterError) {
//             res.status(400).json({ error: "Multer Error...", err });
//         } else if (err) {
//             res.status(500).send({ error: { message: `unknown uploading error: ${err.message}` } });
//         } else {
//             try {
//                 const image = req.files['image'][0].path;
//                 const files = req.files['images'];
//                 let images = [];
//                 for (const file of files) {
//                     images.push(file.path);
//                 }
//                 res.status(200).json({ image, images });

//             } catch (error) {

//             }
//         }
//     });
// }

async function PutData(req, res) {
    try {
        const filter = { id: req.params.id };
        const data = await Product.findOne(filter);
        // const newBody = [...data, ...req.body];
        // const result = await Product.findOneAndUpdate(filter, newBody, { new: true });


        if (!data) {
            return res.status(404).json({ message: "Product not found!!!" });
        }

        for (const key in req.body) {
            if (key in data) {
                data[key] = req.body[key];
            }
        }
        const updatedData = await data.save();
        res.status(201).json({ message: "Successfully updated...", updatedData });

    } catch (error) {
        res.status(400).json(error);
    }
}

async function DeleteData(req, res) {
    try {
        const filter = { id: req.params.id };
        const data = await Product.findOneAndDelete(filter);
        if (!data) {
            res.status(404).json({ message: "Product not found!!!" });
        } else {
            res.status(200).json({ messgae: "Successfully Deleted..." });
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = { GetData, GetOneData, PostData, PutData, DeleteData };