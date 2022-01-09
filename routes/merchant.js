const express = require("express");
const router = express.Router();

router.post("/register", function(req,res){
    res.status(200).send(todolistData)
})

router.post("/remove", function(req,res){
    res.status(200).send(todolistData)
})

module.exports = router;