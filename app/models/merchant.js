const Sequelize = require(`sequelize`);
const Database = require(`../infratructures/database`);

const Merchant = Database.define(`merchants`, {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    phone_number:{
        type:Sequelize.STRING,  
    },
    passsword:{
        type:Sequelize.STRING,        
    },
    name:{
        type:Sequelize.STRING(100),        
    },
    address:{
        type:Sequelize.STRING(500),        
    },
    join_date:{
        type:Sequelize.DATE,        
    },
})

module.exports = Merchant;