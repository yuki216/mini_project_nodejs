const { Sequelize } = require('sequelize');
const config = require(`../../config/config.json`);
//const Database = require(`../infratructures/database`);

const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password, 
    {
      host: config.development.host,
      dialect: config.development.dialect,      
      port: config.development.port,

      logging: console.log,
    });

const modelDefiners = [
    require('./models/merchant'),
    require('./models/product'),
];

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}


module.exports = sequelize;