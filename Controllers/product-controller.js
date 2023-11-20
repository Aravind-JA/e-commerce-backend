const UID = require('../Functions/uid');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
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

async function GetCategoryData(req, res) {
    try {
        const category_id = req.params.id;
        const filter = { category_id: category_id };
        const data = await Product.find(filter);
        if (!data) {
            res.status(404).json({ message: "Products not found!!!" });
        } else {
            res.status(200).json(data);
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

async function GetAdminProducts(req, res) {
    try {
        const admin_id = req.params.id;
        const filter = { admin_id: admin_id };
        const data = await Product.find(filter);
        if (!data) {
            return res.status(404).json({ message: "Products not found!!!" });
        } else {
            return res.status(200).json(data);
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

async function PostData(req, res) {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            res.status(400).json({ error: "Multer Error...", err });
        } else if (err) {
            res.status(500).send({ error: { message: `unknown uploading error: ${err.message}` } });
        } else {
            try {
                const image = 'http://localhost:3333/' + req.files['image'][0].path;
                //    const image = req.files['image'][0].path;
                const files = req.files['images'];
                let images = [];
                for (const file of files) {
                    images.push('http://localhost:3333/' + file.path);
                }
                const { name, description, price, active, admin_id, category_id, specs, discount } = req.body;
                const Body = { name, description, specs, price, discount, image, images, active, admin_id, category_id, id: UID("PR") };
                const data = await Product.create(Body);
                res.status(200).json(data);
                // res.status(200).json(Body);
            } catch (error) {
                res.status(400).json({ message: "error occured", error: error });
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
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            res.status(400).json({ error: "Multer Error...", err });
        } else if (err) {
            res.status(500).send({ error: { message: `unknown uploading error: ${err.message}` } });
        } else {
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
    });
}

async function DeleteData(req, res) {
    try {
        const filter = { id: req.params.id };
        const product = await Product.findOne(filter);
        deleteImage(product.image);
        product.images.forEach(image => {
            console.log(image);
            deleteImage(image);
        });
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

function deleteImage(image) {
    const imagePath = image.replace('http://localhost:3333/uploads\\', '/uploads/');
    const pathsegments = __dirname.split('\\');
    const dirname = pathsegments.slice(0, -1).join('/');
    const absolutePath = path.join(dirname, imagePath);
    console.log(absolutePath);
    if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
    } else {
        console.log(`File ${imagePath} does not exist.`);
    }
}

module.exports = { GetData, GetOneData, GetCategoryData, GetAdminProducts, PostData, PutData, DeleteData };