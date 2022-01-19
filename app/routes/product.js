const express = require("express");
var router = express.Router();
const productHandler = require(`../handler/ProductHandler`)


    router.post("/product", productHandler.add)
    router.delete("/product/:id", productHandler.delete)
    router.put("/product",productHandler.update)
    router.get("/product",productHandler.list)
    router.get("/product/:id",productHandler.get)

module.exports = router;