const { render } = require('ejs');
let express = require('express');
let sportRouter = express.Router();


sportRouter.route('/')
            .get((req,res)=>{
                res.render('sport',{title:'sport'})
})


module.exports = sportRouter