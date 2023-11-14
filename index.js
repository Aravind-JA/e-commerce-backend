const express = require('express');
const DBconnect = require('./config/config');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const form = multer();
const app = express();

DBconnect();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(form.array());

app.use('/uploads', express.static('uploads'));

app.use("/admin", form.array(), require("./Routes/admin-routes"));
app.use("/customer", form.array(), require("./Routes/customer-routes"));
app.use("/category", require("./Routes/category-routes"));
app.use("/product", require("./Routes/product-routes"));
app.use("/order", require("./Routes/order-routes"));
app.use("/search", require("./Routes/search-routes"));
app.use("/cart", require("./Routes/cart-routes"));

app.listen(3333, () => {
    console.log("API running on port 3333...");
});