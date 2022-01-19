const product = require(`../models/product`)

//service
const Sequelize = require(`sequelize`);
const Op = Sequelize.Op;
const sequelize = require(`../infratructures/database`);

module.exports = {
    add: async (req, res) => {
        await product.create({
            name:req.body.name,
            quantity:req.body.quantity,
            price:req.body.price
        }).then(function(data){
            res.json({
                "code" : "success",
                "Message" : "Created product success.",
                "product" : data
            });
        }).catch(function (err) {
            console.log(err)
            res.status(500).json({
                "code" : "error",
                "Message" : err.parent.sqlMessage
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
                res.status((item === 0)?500:200).json({
                    "code" : (item === 0)?"error":"success",
                    "Message" : (item === 0)?"ID Not Found.":"Delete product success."
                });
            }).catch(function (err) {
                res.status(500).json({
                    "code" : "error",
                    "Message" : err
                })
            });
       
    },

    update: async (req, res) => {
        const dataProduct = await product.findOne({
            where: {
              id: parseInt(req.params.id || req.body.id),
            },
          });
      
          if (!dataProduct) {
            return res.status(500).json({
                "code" : "error",
                "Message" : "ID Not Found."
            })
          }

        dataProduct.name = req.body.name || dataProduct.name;
        dataProduct.quantity = req.body.quantity || dataProduct.quantity;
        dataProduct.price = req.body.price || dataProduct.price;

        await dataProduct.save().then(function(item){
            res.status((item === 0)?500:200).json({
                "code" : (item === 0)?"error":"success",
                "Message" : (item === 0)?"ID Not Found.":"Update product success."
            });
        }).catch(function (err) {
            res.status(500).json({
                "code" : "error",
                "Message" : err
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
                res.status((item === 0)?500:200).json({
                    "code" : (item === 0)?"error":"success",
                    "Message" : (item === 0)?"ID Not Found.":"Delete merchant success.",
                    "data": item
                });
            }).catch(function (err) {
                res.status(500).json({
                    "code" : "error",
                    "Message" : err
                })
            });
       
    },

    list: async (req, res) => {
             
          await product.findAll().then(function(item){
              console.log(item)
                res.status((item === 0)?500:200).json({
                    "code" : (item === 0)?"error":"success",
                    "Message" : (item === 0)?"ID Not Found.":"Delete merchant success.",
                    "data": item
                });
            }).catch(function (err) {
                res.status(500).json({
                    "code" : "error",
                    "Message" : err
                })
            });
       
    },
}