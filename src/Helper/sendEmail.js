let nodemailer = require('nodemailer');
let dotenv = require('dotenv');
dotenv.config()

function sendEmail(fromemail,message)
{
    console.log(fromemail)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'khaqamarali@gmail.com',
          pass: process.env.PASSWORD
        }
      });
      var mailOptions = {
        from: fromemail,
        to: process.env.AUTHUSER,
        subject: 'Customer contacted',
        text: message
      };
      console.log(mailOptions)
      transporter.sendMail(mailOptions,(err,resp)=>{
        if(err) {
          //console.log(err)
          //return "Email Sent Successfuly" // sending incorrect message                                           
        }
        else
        {
            //console.log("Email sent")        
        }
        
      })
      return "Email Sent Successfuly" 
}

module.exports = sendEmail