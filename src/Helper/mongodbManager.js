const MongoClient = require('mongodb').MongoClient;
const { ObjectID } = require('bson');
let dotenv = require('dotenv');
let _ = require('underscore')
dotenv.config()
const mongoUrl = process.env.MONGOURL
const dbName = "weatherapp"
const collectionName = "latest_news"


function GetMongodb(collectionName)
{
    const client = new MongoClient(mongoUrl);
    return client.db(dbName).collection(collectionName);
}

async function  getNewData(searchtext) {    
    let db = GetMongodb("latest_news"); 
    if(searchtext !== '')
    {    
      var query = {title: searchtext}
      return await db.find(query).toArray()  
    }    
    return await db.find().toArray()                
  }
  
  async function  insertNews(req) {        
    let newsdata = {
                       title:req.newstitle ,
                       description:req.newsdesc ,
                       url:req.newsurl ,                      
                       publishat:req.newspublishat 
                    }                    
    let db = GetMongodb("latest_news");
    var result = await db.insertOne(newsdata);
    if (result?.acknowledged) return "Inserted succesfully!"
    return "Insert failed"    
  }

  async function  deleteNews(id) {  
    let db = GetMongodb("latest_news");
    var query = {_id:new ObjectID(id)}
    var result =  await db.deleteOne(query)                
    console.log(result)
  }

  async function  insertuser(req) {   

    let newuser = {
                       name:req.username ,
                       emailid:req.emailid ,
                       userpassword:req.userpassword ,                               
                    }
    let db = GetMongodb("usertable");
    let isUserRegiter = await db.findOne({emailid:req.emailid})
    
    if (isUserRegiter==null) 
    {
      console.log("insert new user")
        var result = await db.insertOne(newuser);
       
        if (result?.acknowledged) {
          return true
        }
        return true
    }
    console.log("user exist")
    return false
  }

  async function  authuser(req) {                     
    let db = GetMongodb("usertable");
    var query = {
                    emailid:req.emailid,
                    userpassword:req.userpassword
                }

    var result = await db.findOne(query);
    return result;    
  }

  

module.exports = { 
                    getNewData,                    
                    insertNews,
                    deleteNews,
                    insertuser,
                    authuser
                }
