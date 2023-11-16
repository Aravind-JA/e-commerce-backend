const express = require('express');
const router = express.Router();
const { Register, Login, GetOneData, PutData, DeleteData, GetData } = require('../Controllers/admin-controller');
const { verifyAdminToken } = require('../Functions/verify-admin');

router.route("/").get(GetData);
router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/:id").get(GetOneData).put(PutData).delete(DeleteData);

module.exports = router;