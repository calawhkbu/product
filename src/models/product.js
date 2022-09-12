const root = require('path').resolve('./')
const Sequelize = require("sequelize");
const sequelize = require(root + "/src/service/db/mysql")

const sql = sequelize.define("product", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    html:{
        type: Sequelize.TEXT,
        allowNull: true
    },
    categoryId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    imageUrlList:{
        type: Sequelize.TEXT,
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
    flexData:{
        type: Sequelize.TEXT,
         allowNull:true
  
    }
}, {
    freezeTableName: true
});

module.exports = sql;