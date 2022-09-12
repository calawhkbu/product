
const express = require('express')
const app = express()


const root = require('path').resolve('./')
const config = require(root + "/config.json")




/*
Detect Illegal Characters in URL return cleaned and show Error
*/
module.exports = function (str) {
    console.log(__filename)
    const regex = /^([a-zA-Z0-9\@\-\:\s\~\#\$\%\&\_\=\+\?\,\.\[\]\(\)\\\/]*)$/gm
    let invalid = 0
    if (!str) {
        return str
    }


    if (typeof str == 'object') {
        let keys = Object.keys(str)
        if (keys.length > 0) {
            keys.forEach((item) => {
                //Test Integer and String
                // if (str[item] && (!regex.test(parseInt(str[item])) && !regex.test(str[item]))) {
                //     console.log('item =' + item)
                //     console.log(chalk.red(str[item]))
                //     invalid++
                // }
                if (str[item] && !regex.test(str[item])) {
                    let isNumber = !isNaN(str[item])
                    if (isNumber && !regex.test(str[item])) {
                        invalid++
                        console.log('item =' + item)
                        console.log(str[item])
                    }else if(!isNumber &&!regex.test(str[item])){
                        console.log('Not Number item =' + item)
                        console.log(str[item])
                        invalid++
                    }                   
                   
                }
            })
        } else {
            invalid = 0
        }


        if (str['search'] && str['search']['value']) {
            if (!regex.test(str['search']['value'])) {
                if (str['search']['value'] != '' && !regex.test(str['search']['value'])) {
                    console.log(str['search']['value'])
                    invalid++
                }
            }
        }
        //columns used in /getAllDT  //columns[0]={data:'0',name:'',searcheable:'true',orderable:'true}
        if (str.columns) {
            let cols = Object.keys(str.columns)
            if (cols.length > 0) {
                cols.forEach((col) => {
                    let keys = Object.keys(str.columns[col])
                    if (keys.length > 0) {
                        keys.forEach((key) => {
                            if (str.columns[col][key] && (!regex.test(parseInt(str.columns[col][key])) && !regex.test(str.columns[col][key]))) {
                                invalid++
                            }
                        })
                    }
                })
            }
        }

        if (str['order']) {
            if(str['order'].length>0){
                str['order'].forEach((row,idx)=>{
                    let keys = Object.keys(row)
                    if(keys.length>0){
                        keys.forEach((item)=>{
                            
                            if(!regex.test(parseInt(str['order'][idx][item])) && !regex.test(str['order'][idx][item])){
                                invalid++
                            }
                        })
                    }
                })
            }
        }

        if (invalid > 0) {
            console.log(invalid)
            return false
        } else {
            return true
        }
    } else {
        return regex.test(str)
    }



}