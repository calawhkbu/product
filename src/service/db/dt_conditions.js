

const root = require('path').resolve('./')
const config = require(root + "/config.json")
const { default: axios } = require('axios');
const fs = require('fs')
const sequelize = require(root+'/src/service/db/mysql')
const { QueryTypes } = require('sequelize');

/**
 * Parse Conditions from DataTable to SQL Statements 
 * 2022-08-22
 */



module.exports = async function (conditions, { tableName = '' }) {
    console.log(conditions)
    let conditions_code = fs.readFileSync(root + '/src/service/db/conditions_code.json', 'utf-8')
    if (conditions_code) {
        conditions_code = JSON.parse(conditions_code)
    }


    let sql = ''
    if (!conditions || Object.keys(conditions).length == 0) {
        console.log('conditions required')
        return ''
    }


    let fields = []



    fields = await axios.get('/table/' + tableName)
    fields = fields.data
    if (fields && fields.length > 0) {
        fields = fields.map(o => o.COLUMN_NAME)
    }



    let fields_to_process = [
    ]

    console.log({ fields })

    let keys = Object.keys(conditions)
    if (keys.length > 0) {
        keys.forEach((item) => {
            if (fields && fields.includes(item)) {
                fields_to_process.push(item)

            }
        })
    }


    if (fields_to_process && fields_to_process.length > 0) {
        for (let i = 0; i < fields_to_process.length; i++) {
            let col = fields_to_process[i]

            let value = ''
            let operator = ''


            let item = conditions[fields_to_process[i]] && conditions[fields_to_process[i]].split(':') || [conditions[fields_to_process[i]]]
            operator = conditions_code.find(o => o.key == item[0]) && conditions_code.find(o => o.key == item[0]).value || '=' //default EQ 
            console.log({ operator })

            console.log({ item })
            console.log({ col })
            console.log({ value })
            if (col == undefined) col = 'id'

            if (Array.isArray(item) && item.length > 0) { //DataTable Query Builder
                if (Array.isArray(item) && item.length == 1) {
                    value = item[0]  //default
                } else if (Array.isArray(item) && item[1] && item[1].indexOf(',') != -1) {
                    value = item[1].split(',')
                } else {
                    value = item[1] //using dtTable Query Builder
                }
              

                if (col && value && operator) {
                   



                    if (value.length == 2 && operator.indexOf('BETWEEN') != -1) {
                        sql += `${tableName}.${col} BETWEEN '${value[0]}' AND '${value[1]}'`

                    } else if (col == 'academicYear') {
                        sql += `YEAR(${col}) ${operator} '${value}'`

                    } else if (operator.indexOf('_') != -1) { //replace Value between operator
                        operator = operator.replace('_', value)
                        sql += `${tableName}.${col} like '${operator}'`

                    } else if (operator.indexOf('NULL') != -1) {
                        sql += `${tableName}.${col} ${operator}`

                      } else if (col && col.indexOf('.') != -1) { //tableName. is not required 
                        sql += `${col} ${operator} '${value}'`

                    } else {
                        sql += `${tableName}.${col} ${operator} '${value}'`
                    }
                    if (i + 1 == fields_to_process.length) {
                        //Ignore
                    } else {
                        sql += ` AND `
                    }
                }
            }
        }
    }
    console.log({ sql })
    return sql
}