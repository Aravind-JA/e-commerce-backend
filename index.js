const express = require('express');
const DBconnect = require('./config/config');
const cors = require('cors');
const app = express();

DBconnect();
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('uploads'));

app.use("/category", require("./Routes/category-routes"));
app.use("/product", require("./Routes/product-routes"));
app.use("/customer", require("./Routes/customer-routes"));
app.use("/admin", require("./Routes/admin-routes"));
app.use("/order", require("./Routes/order-routes"));
app.use("/search", require("./Routes/search-routes"));
app.use("/cart", require("./Routes/cart-routes"));

app.listen(3333, () => {
    console.log("API running on port 3333...");
});