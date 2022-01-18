'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('merchants', 
      "createdAt", 
      {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    ),
    await queryInterface.addColumn('merchants', 
      "updatedAt",
       {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColoumn('merchants','createAt')
    await queryInterface.removeColoumn('merchants','updeateAt')
  }
};
