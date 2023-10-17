const router = require('express').Router();
const { GetOneData, PostData, PutData, DeleteData, GetData } = require('../Controllers/customer-controller');

router.route("/").get(GetData).post(PostData);
router.route("/:id").get(GetOneData).put(PutData).delete(DeleteData);

module.exports = router;