const router = require('express').Router();
const { GetData, GetOneData, PostData, PutData, DeleteData } = require("../Controllers/category-controller");

router.route("/").get(GetData).post(PostData);
router.route("/:id").get(GetOneData).put(PutData).delete(DeleteData);

module.exports = router;