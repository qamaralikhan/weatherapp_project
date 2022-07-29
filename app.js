const express = require('express')
const app = express()
const ejs = require('ejs')
const bodyParser = require('body-parser');
let _ = require('underscore')
let sportRouter = require('./src/Router/sport');
let aboutusRouter = require('./src/Router/aboutus');
let contactRouter = require('./src/Router/contactus');
let homeRouter = require('./src/Router/home')
let adminRouter = require('./src/Router/adminoperation');
let dbmanager = require('./src/Helper/mongodbManager')
app.use(express.static(__dirname+'/public'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//add html path
app.set('views',['./src/views','./src/views/admin'])

//set view engin
app.set('view engine','ejs')
app.use('/home',homeRouter);
app.use('/',homeRouter);
app.use('/sport',sportRouter);
app.use('/contactus',contactRouter);
app.use('/aboutus',aboutusRouter);
app.use('/register',adminRouter);

app.get("/register",(req,res)=>{
  
    res.render('Admin/register',{usermessage:"Hello"})
 })

app.get("/admin/logout",(req,res)=> {    
     res.render('Admin/register',{usermessage:""})   
 })

app.get("/admin/addnews",async(req,res)=> { 
    let result = "";
    res.render('Admin/addnews',{message:result})   
})

app.post("/admin/insert",async(req,res)=> {
    let data = req.body;
    let result = "";
    console.log('===Inserting News data to Mongodb')
    result = await dbmanager.insertNews(data);
   res.render('Admin/addnews',{message:result})    
  })

app.get("/admin/editnews/",async(req,res)=> {
    let searchtext = ''
    if (Object.keys(req.query).length==0)
    {       
        var newsList= await dbmanager.getNewData('');
    }
    else
    {
        searchtext = req.query.searchtext 
        console.log(searchtext)  
        var newsList= await dbmanager.getNewData(searchtext);
    }
    var newsList= await dbmanager.getNewData(searchtext);

   res.render('Admin/newViewList',{newsData:newsList})   
 })

 app.get("/admin/editnews/query",async(req,res)=> {
    let searchtext = ''
    if (Object.keys(req.query).length==0)
    {       
        var newsList= await dbmanager.getNewData('');
    }
    else
    {
        searchtext = req.query.searchtext 
        console.log(searchtext)  
        var newsList= await dbmanager.getNewData(searchtext);
    }
    var newsList= await dbmanager.getNewData(searchtext);

   res.send({newsData:newsList})   
 })

 app.post("/register/user",async(req,res)=> {
    let data = req.body;
    result = await dbmanager.insertuser(data);
    var messageval = "User already exisit."
    if (result)
        {
            messageval = "User added Successfully."            
        }
    res.render('Admin/register',{usermessage:messageval})    
  })

  app.post("/register/isvalid",async(req,res)=> {
    let data = req.body;
     let result = "";
    
    result = await dbmanager.authuser(data);    
    if (result==null)
    {
        res.render('/register',{message:""})  
    }
    var userAuth = {}          
    res.render('Admin/addnews',{message:""})    
  })

  app.put("/admin/deleteNews",async(req,res)=> {
    let data = req.body;     
    result = await dbmanager.deleteNews(data._id);    
    res.sendStatus(200)      
  })

app.listen(5001,()=> console.log('Service started at 5001'))
