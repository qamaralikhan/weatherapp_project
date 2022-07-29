const { render } = require('ejs')
let express = require('express')
let contactusRouter = express.Router()
let sendEmail = require('../Helper/sendEmail');
let dotenv = require('dotenv');
dotenv.config()

let message = ''


contactusRouter.route('/').get((req,res)=>{
      res.render('contactus',{message:''})
})

contactusRouter.route('/').post((req,res)=>{   
    let data = req.body;
    let result =  sendEmail(data.custemail,data.custquery);
    console.log(result);
    res.render('contactus',{message:result})
})


module.exports = contactusRouter


