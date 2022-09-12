const root = require('path').resolve('./')
const Sequelize = require("sequelize");
const sequelize = require(root + "/src/service/db/mysql")

const sql = sequelize.define("persons", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    firstName: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    lastName:{
        type: Sequelize.STRING(100),
        allowNull: true
    },
    rolesId:{
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue:2
    },
    username:{
        type: Sequelize.STRING(100),
        allowNull: true
    },
    token:{
        type: Sequelize.STRING,
        allowNull: true
    },
    remarks: {
        type: Sequelize.STRING,
        allowNull: true
    },
     createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    createdBy: {
        type: Sequelize.STRING(30),
        allowNull: true
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedBy: {
        type: Sequelize.STRING(30),
        allowNull: true
    },
    expiredAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue:null
    },
    flexData:{
        type: Sequelize.TEXT,
         allowNull:true
  
    }
}, {
    freezeTableName: true
});

module.exports = sql;