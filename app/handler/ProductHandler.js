const product = require(`../models/product`)

//validator
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = {
    add: async (req, res) => {
        const schema = {
            name: 'string|empty:false',
            quantity: 'number|empty:false|min:1',
            price: 'number|empty:false'
          }
        
          const validate = v.validate(req.body, schema);
        
          if (validate.length) {
            return res.status(400).json({
                "status" : "error",
                "message" : validate,
            });
        }

        await product.create({
            name:req.body.name,
            quantity:req.body.quantity,
            price:req.body.price,
            merchant_id:req.cookies.uid
        }).then(function(data){
            res.json({
                "status" : "success",
                "message" : "Created product success.",
                "product" : data
            });
        }).catch(function (err) {
            res.status(400).json({
                "status" : "error",
                "message" : err.parent.sqlMessage
            })
        });
    },

    delete: async (req, res) => {
        const dataProduct = {
            where: {
              id: parseInt(req.params.id),
            },
          };
      
          await product.destroy(dataProduct).then(function(item){
                res.status((item === 0)?404:200).json({
                    "status" : (item === 0)?"error":"success",
                    "message" : (item === 0)?"ID Not Found.":"Delete product success."
                });
            }).catch(function (err) {
                res.status(400).json({
                    "status" : "error",
                    "message" : err
                })
            });
       
    },

    update: async (req, res) => {
        const schema = {
            id:'number|empty:false',
            name: 'string|empty:false',
            quantity: 'number|empty:false|min:1',
            price: 'number|empty:false'
          }
        
          const validate = v.validate(req.body, schema);
        
          if (validate.length) {
            return res.status(400).json({
                "status" : "error",
                "message" : validate,
            });
        }

        const dataProduct = await product.findOne({
            where: {
              id: parseInt(req.body.id),
            },
          });
      
          if (!dataProduct) {
            return res.status(404).json({
                "status" : "error",
                "message" : "ID Not Found."
            })
          }

        dataProduct.name = req.body.name || dataProduct.name;
        dataProduct.quantity = req.body.quantity || dataProduct.quantity;
        dataProduct.price = req.body.price || dataProduct.price;

        await dataProduct.save().then(function(item){
            res.status((item === 0)?404:200).json({
                "status" : (item === 0)?"error":"success",
                "message" : (item === 0)?"ID Not Found.":"Update product success."
            });
        }).catch(function (err) {
            res.status(400).json({
                "status" : "error",
                "message" : err
            })
        });
       
    },

    get: async (req, res) => {
        const dataProduct = {
            where: {
              id: parseInt(req.params.id),
            },
          };
      
          await product.findOne(dataProduct).then(function(item){
                res.status((item === 0)?404:200).json({
                    "status" : (item === 0)?"error":"success",
                    "message" : (item === 0)?"ID Not Found.":"Delete merchant success.",
                    "data": item
                });
            }).catch(function (err) {
                res.status(400).json({
                    "status" : "error",
                    "message" : err
                })
            });
       
    },

    list: async (req, res) => {
             
          await product.findAll().then(function(item){
              console.log(item)
                res.status((item === 0)?404:200).json({
                    "status" : (item === 0)?"error":"success",
                    "message" : (item === 0)?"ID Not Found.":"Delete merchant success.",
                    "data": item
                });
            }).catch(function (err) {
                res.status(400).json({
                    "status" : "error",
                    "message" : err
                })
            });
       
    },
}