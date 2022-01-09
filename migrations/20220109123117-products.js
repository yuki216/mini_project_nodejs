'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
   
      await queryInterface.createTable('products', { 
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
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
      });
  },

  down: async (queryInterface, Sequelize) => {
    
      await queryInterface.dropTable('products');
    
  }
};
