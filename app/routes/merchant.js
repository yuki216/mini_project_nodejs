const express = require("express");
const router = express.Router();
const merchantHandler = require(`../handler/MerchantHandler`)
const auth = require(`../middleware/auth`)
router.post("/login", merchantHandler.login)

router.post("/logout", auth.check_login, merchantHandler.logout)

router.post("/register", merchantHandler.register)

router.post("/remove/:id", auth.check_login, merchantHandler.remove)

module.exports = router;