const router = require('express').Router();
const { GetData, GetOneData, PutData, DeleteData, PostData, GetCategoryData } = require('../Controllers/product-controller')

router.route("/").get(GetData).post(PostData);
router.route("/category/:id").get(GetCategoryData);
router.route("/:id").get(GetOneData).put(PutData).delete(DeleteData);

module.exports = router;