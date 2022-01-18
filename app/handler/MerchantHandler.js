const merchant = require(`../models/merchant`)

//service
const Sequelize = require(`sequelize`);
const Op = Sequelize.Op;
const sequelize = require(`../infratructures/database`);

module.exports = {
    register: async (req, res) => {
        const data = await merchant.findAll();
          console.log(data)
        res.status(200).send(`Registration has been saved`);
    },

    remove: async (req, res) => {
        res.status(200).send(`Registration has been saved`);
    },
}