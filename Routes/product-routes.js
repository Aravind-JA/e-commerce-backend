const router = require('express').Router();
const { GetData, GetOneData, PutData, DeleteData, PostData } = require('../Controllers/product-controller')

router.route("/").get(GetData).post(PostData)
router.route("/:id").get(GetOneData).put(PutData).delete(DeleteData);

module.exports = router;