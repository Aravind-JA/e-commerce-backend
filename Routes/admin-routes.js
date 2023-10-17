const router = require('express').Router();
const { PostData, GetOneData, PutData, DeleteData, GetData } = require('../Controllers/admin-controller');

router.route("/").get(GetData).post(PostData);
router.route("/:id").get(GetOneData).put(PutData).delete(DeleteData);

module.exports = router;