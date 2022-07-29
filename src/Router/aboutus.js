const { render } = require('ejs')
let express = require('express')
let aboutusRouter = express.Router()


aboutusRouter.route('/').get((req,res)=>{
    res.render('aboutus',{title:'AboutUs'})
})

module.exports = aboutusRouter


