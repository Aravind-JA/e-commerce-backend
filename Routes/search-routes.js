const router = require('express').Router();
const { SearchData } = require("../Controllers/search-controller");

router.route("/").get(SearchData);

module.exports = router;