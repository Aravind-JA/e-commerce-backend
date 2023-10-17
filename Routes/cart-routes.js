const router = require('express').Router();
const { GetData, GetOneData, PostCartItem, DeleteCartItem } = require('../Controllers/cart-controller');

router.route("/").get(GetData);
router.route("/:customer_id").get(GetOneData).post(PostCartItem);
router.route("/:customer_id/:product_id").delete(DeleteCartItem);

module.exports = router;