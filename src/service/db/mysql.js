const Sequelize = require("sequelize")

var path = require('path');
var root = path.dirname(require.main.filename)
const config = require(root+"/config.json")




const sequelize= new Sequelize(config.db.database,config.db.username,config.db.password,{
  dialect:"mysql",
  dialectOptions: {
    connectTimeout: 60000,
    multipleStatements:true
  },
  host:config.db.hostname});






module.exports=sequelize;