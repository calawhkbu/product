

const express = require("express");
const router = express();
const root = require('path').resolve('./')
const config = require(root + "/config.json")
const fs = require('fs')

//Config

const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");
const axios = require("axios");

const Roles = require(root + "/src/models/roles")
const Persons = require(root + '/src/models/persons')


router.use(cookieParser())

const oneDay = config.jwt.expire
const PlusADay = new Date(new Date().getTime() + oneDay)
const sequelize = require(root + '/src/service/db/mysql')
var bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

//must be at top
router.get('/logout', function (req, res) {
    console.log("logout")
    res.clearCookie("token");
    res.clearCookie("_csrf");
    res.clearCookie("csrf");
    res.clearCookie("token");

    
    delete session
    res.json({sucess:true,message:'Logged Out. Close All browesers'})
});



router.post('/login', async function (req, res, next) {
    let body = req.body
    let currRole = {}

    if (!body.username) {
        return res.json({ success: false, message: 'Missing Params -username' })
    }


    let validPerson = await Persons.findOne({
        where: {
            username: body.username,

        },
        raw: true
    })


    if (validPerson && validPerson.id) {
        currRole = await Roles.findByPk(validPerson.rolesId)


        //Sign JWT
        const token = jwt.sign(
            {
                personsId: validPerson.id,
                role: currRole.name,
                roleId: currRole.id,
                lastName: validPerson.lastName,
                firstName: validPerson.firstName,
            },
            config.jwt.TOKEN_KEY,
            {
                expiresIn: "24h",
            }
        );
        res.cookie("token", token, {
            expire: PlusADay,
            secure: false,
            httpOnly: true
        })
        return res.json({ success: true, token })

    } else {
        return res.status(401).json({ success: false, message: 'User Not Found' })

    }

    //Future Todo - OTP 
    //Future Todo CAS/SSO/SAML Implementation
})









module.exports = router