const express = require("express");
const router = express.Router();
const merchantHandler = require(`../handler/MerchantHandler`)

router.post("/register", merchantHandler.register)

router.post("/remove/:id", merchantHandler.remove)

module.exports = router;