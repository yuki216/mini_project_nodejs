const config = require(`../../config/config.json`);
const Sequelize = require(`sequelize`);


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


module.exports = sequelize;