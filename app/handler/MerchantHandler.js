const merchant = require(`../models/merchant`)
const bcrypt = require('bcrypt');
//validator
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = {
    login: async (req, res, next) => {
          // parse login and password from headers
            const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
            const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')           

          const user = await merchant.findOne({
            where: { phone_number: login }
          });
        
          if (!user) {
            return res.status(404).json({
              status: 'error',
              message: 'user not found'
            });
          }

        
          const isValidPassword = await bcrypt.compare(password, user.password);
          console.log(isValidPassword, password)
          if (!isValidPassword) {            
            res.set('WWW-Authenticate', 'Basic realm="401"') 
           return  res.status(401).send('Authentication required.') 
          }
        
          res.cookie('uid', user.id)
          res.cookie('name', user.name)
          return res.json({
            code: 'success',
            message:'login success',
            data: {
              id: user.id,
              name: user.name
            }
          });
    },
    logout: async (req,res) => {
      res.clearCookie('uid')      
      res.clearCookie('name')  
      return res.json({
        code: 'success',
        message:'cookie was cleared',
        data: []
      });
    },
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