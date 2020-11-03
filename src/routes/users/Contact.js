const express = require('express');
require('dotenv').config();
var aws     = require('aws-sdk');

var email = "annoop007@gmail.com";

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
          res.redirect('/Error!');
      } 
      else {

            var ses_mail_confirm = "From: 'Anoop Arunan Photography' <" + email + ">\n";
            ses_mail_confirm = ses_mail_confirm + `To: ${req.body.email}\n`;
            ses_mail_confirm = ses_mail_confirm + "Subject: Confirmation Email from Anoop Arunan Photography\n";
            ses_mail_confirm = ses_mail_confirm + "MIME-Version: 1.0\n";
            ses_mail_confirm = ses_mail_confirm + "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
            ses_mail_confirm = ses_mail_confirm + "--NextPart\n\n";
            ses_mail_confirm = ses_mail_confirm + `Thank you for your interest! Your message has been received. I will get in touch with you soon - Anoop Arunan\n\n`
        
            var params_confirm = {
                RawMessage: { Data: Buffer.from(ses_mail_confirm) },
                Destinations: [ req.body.email ],
                Source: "'AWS Tutorial Series' <" + email + ">'"
            };            
            ses.sendRawEmail(params_confirm, function(err, data) {
                if(err) {
                    res.redirect('/Error!');
                } 
                else {
                    res.redirect('/#contactus');
                }           
            });
      }           
  });
};


module.exports = contact