const express = require("express");
var router = express.Router();
const productHandler = require(`../handler/ProductHandler`)
const auth = require(`../middleware/auth`)


    router.post("", auth.check_login, productHandler.add)
    router.delete("/:id", auth.check_login, productHandler.deleted)
    router.put("", auth.check_login, productHandler.update)
    router.get("", auth.check_login, productHandler.list)
    router.get("/:id", auth.check_login, productHandler.get)

module.exports = router;