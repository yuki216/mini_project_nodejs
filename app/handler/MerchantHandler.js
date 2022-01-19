const merchant = require(`../models/merchant`)

//service
const Sequelize = require(`sequelize`);
const Op = Sequelize.Op;
const sequelize = require(`../infratructures/database`);

module.exports = {
    register: async (req, res) => {
        const data = await merchant.create({
            phone_number: req.body.phone_number,
            password: req.body.password,
            name:req.body.name,
            address:req.body.address,
            join_date:req.body.join_date
        }).then(function(){
            res.json({
                "code" : "success",
                "Message" : "Created merchant success.",
                "merchant" : data
            });
        }).catch(function (err) {
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