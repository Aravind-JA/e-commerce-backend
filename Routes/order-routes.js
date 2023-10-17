const router = require("express").Router();
const { PostData,GetData, GetOneData, GetAdminData, GetCustomerData, DeleteData } = require("../Controllers/order-controller");

router.route("/").get(GetData).post(PostData);
router.route("/:id").get(GetOneData).delete(DeleteData);
router.route("/admin/:id").get(GetAdminData);
router.route("/customer/:id").get(GetCustomerData);

module.exports = router;