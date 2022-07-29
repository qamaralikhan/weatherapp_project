const { render } = require('ejs');
let express = require('express')
let adminRouter = express.Router()
let GetNewData = require('../Helper/mongodbManager');
let dotenv = require('dotenv');

adminRouter.route('/')
            .get((req,res)=>{
               res.render('Admin/register',{title:"Admin"})
            })

//  adminRouter.route('/adduser')
//              .get((req,res)=>{
//                 console.log('test');
//                  res.render('Admin/addUser',{title:"Admin"})
                
//              })

//  adminRouter.route('admin/edituser')
//              .get(async(req,res)=>{            
//                  res.render('Admin/newViewList',{title:"Admin"})
//              })            

// adminRouter.route('/admin')
//             .get(async(req,res)=>{
//                 res.render('Admin/register',{title:"Admin"})
                
//             })

module.exports = adminRouter