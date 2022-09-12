const root = require('path').resolve('./')
const Sequelize = require("sequelize");
const sequelize = require(root + "/src/service/db/mysql")

const sql = sequelize.define("promotion", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    productId:{
        type: Sequelize.INTEGER,
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
    flexData:{
        type: Sequelize.TEXT,
         allowNull:true
  
    }
}, {
    freezeTableName: true
});

module.exports = sql;