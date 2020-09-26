const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();
const flash = require('express-flash')
var emailSent = true;

// Create Transporter for nodemailer
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
  });

const contact = (req, res) => {
    let mailOptions = {
        from: 'anooparunanphotography@gmail.com',
        to: 'neerajajithinp@gmail.com, annoop007@gmail.com',
        subject: 'New Message from a visitor in Photography Website',
        text: `A visitor by the name ${req.body.name} has contacted you. The details are :
        
        1. Name : ${req.body.name} 
        2. Email : ${req.body.email}
        3. Phone : ${req.body.phone}
        4. Date of Event : ${req.body.date}
        5. Location : ${req.body.location}
        6. Type of Event : ${req.body.eventType}
        7. Message : ${req.body.message}`
    };

    transporter.sendMail(mailOptions, function(err, data){
        // req.flash('success', 'Success! Contact message is sent to Anoop Arunan !!');
        // done(err);
        if(err) {
            // req.flash('contactMessage', 'Error! Contact message could not be sent.');
            // contactMessage = 'Error! Contact message could not be sent.'
            emailSent = false;
            console.log('Error Occurs !!')
            console.log("emailSent in Failure ==== ", emailSent)
            // res.json({ success : false });
            // res.send(`<script>alert("Error! Contact Message was not sent. Please Try Again!")</script>`);
            // res.status(200);
            // return res.status(404).send("Oh uh, something went wrong");
            // return res.redirect('/Error!')
        } else {
            // req.flash('contactMessage', 'Success! Contact message is sent to Anoop Arunan !!');
            // contactMessage = 'Success! Contact message is sent to Anoop Arunan !!'
            // console.log('Contact message is sent to the Admin');
            console.log("emailSent in success ==== ", emailSent);
            // return res.redirect('/#contactus');
            // done(err, 'done');
            // res.redirect('/');
            // res.send(`<script>alert("Email Sent Successfully.")</script>`); 
        }
    });
    res.redirect('/#contactus');
};
// console.log("emailSent ==== ", emailSent)

module.exports = contact