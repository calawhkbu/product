const root = require('path').resolve('./')
const config = require(root + "/config.json")
const axios = require('axios')
const validParams = require(root + '/src/service/utils/validParams')
const dt_conditions = require(root + '/src/service/db/dt_conditions')
const fs = require('fs')
const jwt = require("jsonwebtoken");


//config 

//routers
const express = require('express')
const sequelize = require(root + '/src/service/db/mysql')
const app = express()
app.disable('X-Powered-By')
app.disable('x-powered-by')

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let session={}

app.all('*', async function (req, res, next) {
    let valid = validParams(req.params)
    if (!valid) {
        return res.json({ success: false, message: 'Invalid Params' })
    }
    valid = validParams(req.query)

    if (!valid) {
        return res.json({ success: false, message: 'Invalid Params Q' })
    }


    const token = req.body.token || req.headers.token
    try {
        if(token){
            session = jwt.verify(token, config.jwt.TOKEN_KEY)
        }

    } catch (err) {
        session = {}
        console.log( err)
        console.log(__filename)
        
    }

    res.removeHeader("X-Powered-By");
    res.removeHeader("x-powered-by");
    next()
})

app.get('/logout',function(req,res,next){
    delete session
    next()
})

app.get('/list/:tableName', async function (req, res, next) {
    let tableName = req.params.tableName
    let offset = req.query.offset || 0
    let limit = req.query.limit || 10


    let isModelExist = fs.existsSync(root + '/src/models/' + tableName + '.js')
    let data


    //parse URL params 
    //simple search KEY=VALUE 
    // if(req.query){
    //     let keys = Object.keys(req.query)
    //     if(keys.length>0){
    //         keys.forEach((col)=>{
    //             conditions[col]=req.query[col]
    //         })
    //     }
    // }

    let where = ''
    let conditions = await dt_conditions(req.query, { tableName })
    if (conditions) {
        where = 'WHERE ' + conditions
    }

    if (isModelExist) {
        let sql = `SELECT * from ${tableName} ${where} LIMIT ${offset},${limit} `
        data = await sequelize.query(sql)
        if (data) {
            data = data[0]
        }


    } else {
        return res.json({
            success: false,
            message: 'Error TBL'
        })
    }

    return res.json({ success: true, data })
})

//Retrive Promotion Details
//Get One Record
app.get('/get/:tableName/:id', async function (req, res, next) {
    let tableName = req.params.tableName
    let id = req.params.id
    let data
    let { data: isTableExist } = await axios.get('/table/' + tableName)
    if (isTableExist.length == 0) {
        return res.json({ success: false, message: 'TBL Invalid' })
    }

    let Model = require(root + "/src/models/" + tableName)
    data = await Model.findOne({
        where: {
            id
        },
        raw: true
    })

    //removeFields
    if (data) {
        let keys = Object.keys(data)
        if (keys.length > 0) {
            keys.forEach((item, idx) => {
                if (config.removeFields.includes(item)) {
                    delete data[item]
                }
            })
        }
    } else {
        return res.json({ success: false, message: 'Not Found' })
    }


    return res.json({ success: true, data })
})


//Create new 
app.post('/:tableName',async function (req, res, next) {
    let body = req.body
    let tableName = req.params.tableName
    let { data: isTableExist } = await axios.get('/table/' + tableName)
    if (isTableExist.length == 0) {
        return res.json({ success: false, message: 'TBL Invalid' })
    }



    console.log('...........')
    console.log(session)

    console.log('req.cookies')
    console.log(req.cookies)



    if(!session || !session.personsId){
        return res.json({success:false,message:'Not Authorized, Login Required'})
    }

    //Check duplicate 
    let conditions = {}
    let keys = Object.keys(body)
    if (keys.length > 0) {
        keys.forEach((item) => {
            conditions[item] = body[item]
        })
    }
    if (Object.keys(conditions).length > 0) {
        let Model = require(root + '/src/models/' + tableName)
        let exist = await Model.findAll({
            where: conditions,
            raw: true
        })
        if (exist && exist.length > 0) {
            return res.json({ success: false, message: 'duplicate record' })
        } else {
            Model.create(conditions).then((result) => {
                if (result && result.id) {
                    return res.json({ success: true, id: result.id })
                }

            }).catch((err) => {
                if (err) {
                    return res.json({ success: false, message: 'Fail to Create Record ' + err })
                }
            })
        }
    }
})


// get promotion category in tree node 
app.get('/listPromotions', async function (req, res, next) {
    let Model = require(root + '/src/models/category')
    let raw = await Model.findAll({
        order: [['id', 'asc']],
        raw: true
    })

    let data = []


    if (raw && raw.length > 0) {
        for (let i = 0; i < raw.length; i++) {
            let item = raw[i]

            if (!item.parentId) { //get Parent only
                let count_sql = `SELECT count(*) as total FROM category WHERE parentId = ${item.id} ORDER by id ASC`
                let count = await sequelize.query(count_sql)
                if (count) {
                    count = count[0][0]['total']
                }

                let children_sql = `SELECT id,name FROM category WHERE parentId = ${item.id} ORDER by id ASC`
                let children = await sequelize.query(children_sql)
                if (children) {
                    children = children[0]
                }

                data.push({
                    id: item.id,
                    name: item.name,
                    subCategoryCount: count,
                    children
                })
            }
        }
    }



    return res.json({ success: true, data })

})

//TODO add security


module.exports = app