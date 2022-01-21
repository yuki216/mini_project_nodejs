const express = require("express");
var router = express.Router();
const productHandler = require(`../handler/ProductHandler`)
const auth = require(`../middleware/auth`)


    router.post("/product", auth.check_login, productHandler.add)
    router.delete("/product/:id", auth.check_login, productHandler.delete)
    router.put("/product", auth.check_login, productHandler.update)
    router.get("/product", auth.check_login, productHandler.list)
    router.get("/product/:id", auth.check_login, productHandler.get)

module.exports = router;