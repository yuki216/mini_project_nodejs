'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('products', 
      "createdAt", 
      {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    ),
    await queryInterface.addColumn('products', 
      "updatedAt",
       {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColoumn('products','createAt')
    await queryInterface.removeColoumn('products','updeateAt')
  }
};
