const router = require('express').Router();
const { GetData, GetOneData, PutData, DeleteData, PostData, GetCategoryData, GetAdminProducts } = require('../Controllers/product-controller')
const { verifyAdminToken } = require('../Functions/verify-admin');
router.route("/").get(GetData);
router.route("/").post(verifyAdminToken, PostData);
router.route("/category/:id").get(GetCategoryData);
router.route("/admin/:id").get(GetAdminProducts);
router.route("/:id").get(GetOneData).put(PutData).delete(DeleteData);

module.exports = router;