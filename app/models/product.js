const Sequelize = require(`sequelize`);
const Database = require(`../infratructures/database`);

const Product = Database.define(`products`, {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name:{
        type:Sequelize.STRING,        
    },
    quantity:{
        type:Sequelize.INTEGER,        
    },
    price:{
        type:Sequelize.DOUBLE,        
    },
    merchant_id:{
        type:Sequelize.INTEGER,    
        references: {
            model: `merchants`,
            key: `id`,
          },
          onUpdate: `NO ACTION`,
          onDelete: `CASCADE`,    
    },
})

module.exports = Product;