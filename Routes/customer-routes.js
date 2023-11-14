const router = require('express').Router();
const { GetOneData, PostData, PutData, DeleteData, GetData, Login } = require('../Controllers/customer-controller');

router.route("/").get(GetData);
router.route("/register").post(PostData);
router.route("/login").post(Login);
router.route("/:id").get(GetOneData).put(PutData).delete(DeleteData);

module.exports = router;