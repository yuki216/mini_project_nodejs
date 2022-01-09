'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    await queryInterface.createTable('merchants', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      phone_number:{
        type:Sequelize.STRING,  
        unique:true,      
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
    });
    
  },

  down: async (queryInterface, Sequelize) => {
   
      await queryInterface.dropTable('merchants');
  }
};
