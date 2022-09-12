const root = require('path').resolve('./')
const config = require(root + "/config.json")
const axios = require('axios')
const validParams = require(root+'/src/service/utils/validParams')
const fs = require('fs')
const api = require(root + '/src/routes/api')
const getMeta = require(root+'/src/service/db/getMeta')
const auth = require(root+'/src/routes/auth')
//config 

//routers
const express = require('express')
const { builtinModules } = require('module')
const app = express()
app.disable('X-Powered-By')
app.disable('x-powered-by')
app.use('*',async function(req,res,next){
    await syncDb();
    next()
})
app.use(auth)
app.use(api)
app.use(getMeta)





async function syncDb() {
    const models = root + '/src/models';
    var filenames = []
    var models_name = []

    //Sync all DB 
     fs.readdir(models, (err, files) => {
        files.forEach(file => {
            if (file) {
                filenames.push(file.replace('.js', ''))
            }
        });
        console.log('filenames', filenames)
        filenames.forEach(e => {
            models_name.push(require(root + "/src/models/" + e))
        });

        models_name.forEach(e => {
            e.sync()
        })
    });


}

module.exports= app