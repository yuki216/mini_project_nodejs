const Sequelize = require(`sequelize`);
//const Database = require(`../infratructures/database`);

module.exports = (sequelize) => {
    sequelize.define('merchant',
    { 
        id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },
        phone_number:{
            type:Sequelize.STRING,  
        },
        password:{
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
}