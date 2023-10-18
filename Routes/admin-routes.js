const router = require('express').Router();
const { Register,Login, GetOneData, PutData, DeleteData, GetData } = require('../Controllers/admin-controller');
const {verifyAdminToken} = require('../Functions/verify-admin');

router.route("/").get(verifyAdminToken,GetData);
router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/:id").all(verifyAdminToken).get(GetOneData).put(PutData).delete(DeleteData);

module.exports = router;