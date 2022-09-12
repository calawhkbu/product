const root = require('path').resolve('./')
const config = require(root + "/config.json")
const axios = require('axios')
const validParams = require(root + '/src/service/utils/validParams')
const fs = require('fs')

//config 

//routers

const sequelize = require(root+'/src/service/db/mysql')
const { QueryTypes } = require('sequelize');

let session={}

app.get('*', function (req, res, next) {

    const token = req.cookies.token || req.body.token 
    try {
        session = jwt.verify(token, config.jwt.TOKEN_KEY)
        next()

    } catch (err) {
        session = {}
        console.log( err)
        console.log(__filename)
        return res.status(401).json({success:false,message:'Error Invalid Token '+err})

    }
    if(!token){
        return res.status(401).json({success:false,message:'Token Required'})
    }

    if(!session.personsId){
        return res.status(401).json({success:false,message:'Not Logged In'})

    }
})


module.exports=app