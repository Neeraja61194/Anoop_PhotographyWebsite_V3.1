const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();
const flash = require('express-flash')
var emailSent = true;
var aws     = require('aws-sdk');

var email   = "anooparunanphotography@gmail.com";
var email_1   = "neerajan.mec@gmail.com";
aws.config.loadFromPath(`${__dirname}/../../../config/config_aws.json`);
var ses = new aws.SES();

const contact = (req, res) => {
  var ses_mail = "From: 'Anoop Arunan Photography' <" + email + ">\n";
  ses_mail = ses_mail + "To: " + email + "\n";
  ses_mail = ses_mail + "Subject: Message from a visitor in Photography Website\n";
  ses_mail = ses_mail + "MIME-Version: 1.0\n";
  ses_mail = ses_mail + "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
  ses_mail = ses_mail + "--NextPart\n\n";
  ses_mail = ses_mail + `A visitor by the name ${req.body.name} has contacted you. The details are :\n\n`
  ses_mail = ses_mail + "--NextPart\n\n";
  ses_mail = ses_mail + `1. Name : ${req.body.name} \n\n`
  ses_mail = ses_mail + "--NextPart\n\n";
  ses_mail = ses_mail + `2. Email : ${req.body.email}\n\n`;
  ses_mail = ses_mail + "--NextPart\n\n";
  ses_mail = ses_mail + `3. Phone : ${req.body.phone}\n\n`;
  ses_mail = ses_mail + "--NextPart\n\n";
  ses_mail = ses_mail + `4. Date of Event : ${req.body.date}\n\n`;
  ses_mail = ses_mail + "--NextPart\n\n";
  ses_mail = ses_mail + `5. Location : ${req.body.location}\n\n`;
  ses_mail = ses_mail + "--NextPart\n\n";
  ses_mail = ses_mail + `6. Type of Event : ${req.body.eventType}\n\n`;
  ses_mail = ses_mail + "--NextPart\n\n";
  ses_mail = ses_mail + `7. Message : ${req.body.message}\n\n`;
    

  var params = {
      RawMessage: { Data: Buffer.from(ses_mail) },
      Destinations: [ email ],
      Source: "'AWS Tutorial Series' <" + email + ">'"
  };
  
  ses.sendRawEmail(params, function(err, data) {
      if(err) {
          //res.send(err);/Error!
          res.redirect('/Error!');
      } 
      else {
          //res.send(data);

            var ses_mail_confirm = "From: 'Anoop Arunan Photography' <" + email + ">\n";
            ses_mail_confirm = ses_mail_confirm + `To: ${req.body.email}\n`;
            ses_mail_confirm = ses_mail_confirm + "Subject: Confirmation Email from Anoop Arunan Photography\n";
            ses_mail_confirm = ses_mail_confirm + "MIME-Version: 1.0\n";
            ses_mail_confirm = ses_mail_confirm + "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
            ses_mail_confirm = ses_mail_confirm + "--NextPart\n\n";
            ses_mail_confirm = ses_mail_confirm + `This is to confirm that your contact message was received by Anoop Arunan. He will contact you soon regarding your enquiry.\n\n`
        
            var params_confirm = {
                RawMessage: { Data: Buffer.from(ses_mail_confirm) },
                Destinations: [ req.body.email ],
                Source: "'AWS Tutorial Series' <" + email + ">'"
            };            
            ses.sendRawEmail(params_confirm, function(err, data) {
                if(err) {
                    // res.send(err);
                    res.redirect('/Error!');
                } 
                else {
                    //res.send(data);
                    res.redirect('/#contactus');
                }           
            });
      }           
  });
};

// const contact = (req, res) => {
//     let mailOptions = {
//         from: 'anooparunanphotography@gmail.com',
//         to: 'neerajajithinp@gmail.com',
//         subject: 'New Message from a visitor in Photography Website',
//         text: `A visitor by the name ${req.body.name} has contacted you. The details are :
        
//         1. Name : ${req.body.name} 
//         2. Email : ${req.body.email}
//         3. Phone : ${req.body.phone}
//         4. Date of Event : ${req.body.date}
//         5. Location : ${req.body.location}
//         6. Type of Event : ${req.body.eventType}
//         7. Message : ${req.body.message}`
//     };

//     transporter.sendMail(mailOptions, function(err, data){

//         if(err) {
//             emailSent = false;
//             console.log('Error Occurs !!')
//             console.log("emailSent in Failure ==== ", emailSent)
//         } else {
//             console.log("emailSent in success ==== ", emailSent);
//             let mailOptions_confirm = {
//                 from: 'anooparunanphotography@gmail.com',
//                 to: req.body.email,
//                 subject: 'Confirmation Email from Anoop Arunan Photography',
//                 text: `This is to confirm that your contact message was received by Anoop Arunan. He will contact you soon regarding your enquiry`
//             };
//             transporter.sendMail(mailOptions_confirm, function(err, data){ 
//                 if(err) {
//                     console.log("Confirmation was Failure ==== ")
//                 }
//                 else {
//                     console.log("Confirmation was success ==== ");
//                 }
//             })
//         }
//     });
//     res.redirect('/#contactus');
// };

module.exports = contact