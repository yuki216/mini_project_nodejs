const {models} = require(`../storages`)
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

//validator
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = {
    login: async (req, res, next) => {
          // parse login and password from headers
            const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
            const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')           

          const user = await models.merchant.findOne({
            where: { phone_number: login }
          });
        
          if (!user) {
            return res.status(404).json({
              "status": 'error',
              "message": 'user not found'
            });
          }

        
          const isValidPassword = await bcrypt.compare(password, user.password);
          //console.log(isValidPassword, bcrypt.(password), user)
          if (!isValidPassword) {            
            res.set('WWW-Authenticate', 'Basic realm="401"') 
           return res.status(401).json({
            "status" : "error",
            "message" : "Authentication required.",
            });
          }
        
          const merchantId = user.id;
          const merchantName = user.name;
          const accessToken = jwt.sign({ merchantId, merchantName }, "Yuki-Token-123", {
              expiresIn: process.env.ACCESS_TOKEN_EXIPRY || 604800
          });
          const refreshToken = jwt.sign({ merchantId, merchantName }, "Yuki-Token-123", {
              expiresIn: process.env.REFRESH_TOKEN_EXIPRY || 604800
          });
          //console.log(accessToken,refreshToken)
          return res.json({
            "status": 'success',
            "message":'login success',
            "data": {
              token: accessToken,
              refreshToken: refreshToken
            }
          });
    },
    logout: async (req,res) => {
      res.clearCookie('uid')      
      res.clearCookie('name')  
      return res.json({
        "status": 'success',
        "message":'cookie was cleared'
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
                "status" : "error",
                "message" : validate,
            });
        }

        const password = await bcrypt.hash(req.body.password, 10);
        await models.merchant.create({
            phone_number: req.body.phone_number,
            password: password,
            name:req.body.name,
            address:req.body.address,
            join_date:req.body.join_date
        }).then(function(data){
            res.json({
                "status" : "success",
                "message" : "Created merchant success.",
                "data" : data
            });
        }).catch(function (err) {
            console.log(err)
            res.status(400).json({
                "status" : "error",
                "message" : err.parent.sqlMessage
            })
        });
    },
    remove: async (req, res) => {
        const dataMerchant = {
            where: {
              id: parseInt(req.params.id),
            },
          };
      
        await models.merchant.destroy(dataMerchant).then(function(item){
                res.status((item)?200:404).json({
                    "status" : (item)?"success":"error",
                    "message" : (item)?"Delete merchant success.":"ID Not Found."
                });
            }).catch(function (err) {
                res.status(400).json({
                    "status" : "error",
                    "message" : err
                })
            });
       
    },
}