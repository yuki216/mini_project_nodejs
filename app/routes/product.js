const express = require("express");
const router = express.Router();

router.post("/add",(req,res)=>{
    res.status(200).send("success")
})
router.delete("/delete",(req,res)=>{
    res.status(200).send("success")
})
router.put("/update",(req,res)=>{
    res.status(200).send("success")
})
router.get("/get",(req,res)=>{
    res.status(200).send("success")
})
router.get("/get/:id",(req,res)=>{
    res.status(200).send("success")
})

module.exports = router;