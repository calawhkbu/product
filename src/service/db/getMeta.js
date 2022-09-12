const root = require('path').resolve('./')
const config = require(root + "/config.json")
const axios = require('axios')
const validParams = require(root + '/src/service/utils/validParams')
const fs = require('fs')

//config 

//routers
const express = require('express')
const app = express()

const sequelize = require(root+'/src/service/db/mysql')
const { QueryTypes } = require('sequelize');

app.disable('X-Powered-By')
app.disable('x-powered-by')

app.get('/table/:tableName', async function (req, res, next) {
    var sql = `select column_name,data_type,character_maximum_length,ordinal_position from information_schema.columns where table_schema = ? and table_name = ? ORDER BY ORDINAL_POSITION ASC;`
    const result = await sequelize.query(sql, { replacements: [config.db.database, req.params.tableName], type: QueryTypes.SELECT })
    res.json(result)
})


module.exports = app