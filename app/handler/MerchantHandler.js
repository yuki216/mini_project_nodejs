const merchant = require(`../models/merchant`)
const bcrypt = require('bcrypt');
//validator
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = {
    register: async (req, res) => {
        const schema = {
            phone_number: 'string|empty:false',
            password: 'string|empty:false',
            name: 'string|empty:false',
            address: 'string|empty:false',
            join_date: 'string|empty:false'
          }
        
          const validate = v.validate(req.body, schema);
        
          if (validate.length) {
            return res.status(400).json({
                "code" : "error",
                "Message" : validate,
            });
        }


        const password = await bcrypt.hash(req.body.password, 10);
        console.log(password)
        await merchant.create({
            phone_number: req.body.phone_number,
            password: password,
            name:req.body.name,
            address:req.body.address,
            join_date:req.body.join_date
        }).then(function(data){
            res.json({
                "code" : "success",
                "Message" : "Created merchant success.",
                "merchant" : data
            });
        }).catch(function (err) {
            console.log(err)
            res.status(500).json({
                "code" : "error",
                "Message" : err.parent.sqlMessage
            })
        });
    },

    remove: async (req, res) => {
        const dataMerchant = {
            where: {
              id: parseInt(req.params.id),
            },
          };
      
          const deleteMerchant = await merchant.destroy(dataMerchant).then(function(item){
                res.status((item === 0)?500:200).json({
                    "code" : (item === 0)?"error":"success",
                    "Message" : (item === 0)?"ID Not Found.":"Delete merchant success."
                });
            }).catch(function (err) {
                res.status(500).json({
                    "code" : "error",
                    "Message" : err
                })
            });
       
    },
}