const express = require("express");
const router = express.Router();
const merchantHandler = require(`../handler/MerchantHandler`)

router.post("/register", merchantHandler.register)

router.post("/remove", function(req,res){
    res.status(200).send("success")
})

module.exports = router;