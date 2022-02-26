const {models} = require(`../storages`)

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

        await models.product.create({
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

    deleted: async (req, res) => {
        const dataProduct = {
            where: {
              id: parseInt(req.params.id),
            },
          };
      
          await models.product.destroy(dataProduct).then(function(item){
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

        const dataProduct = await models.product.findOne({
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

        await models.product.update(
            req.body,
            { where: { id: dataProduct.id  } }
        ).then(function(item){
            res.status((item)?200:404).json({
                "status" : (item)?"success":"error",
                "message" : (item)?"Update product success.":"ID Not Found."
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
      
          await models.product.findOne(dataProduct).then(function(item){
                res.status((item)?200:404).json({
                    "status" : (item)?"success":"error",
                    "message" : (item)?"":"ID Not Found.",
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
             
          await models.product.findAll().then(function(item){
                res.status((item)?200:404).json({
                    "status" : (item)?"success":"error",
                    "message" : (item)?"":"ID Not Found.",
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