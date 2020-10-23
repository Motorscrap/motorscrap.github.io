const express = require("express");
const router = express.Router();
const { quote } = require("../controllers/mail");

router.route("/quote").post(quote);

module.exports = router;