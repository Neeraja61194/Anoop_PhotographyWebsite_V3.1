const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

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
        from: 'neerajan.mec@gmail.com',
        to: 'neerajajithinp@gmail.com',
        subject: 'Message from a visitor in Photography Website',
        text: `A visitor by the name ${req.body.name} has contacted you. The details are :
        
        1. Name : ${req.body.name} 
        2. Email : ${req.body.email}
        3. Phone : ${req.body.phone}
        4. Message : ${req.body.message}`
    };

    transporter.sendMail(mailOptions, function(err, data){
        if(err) {
            console.log('Error Occurs !!!!!')
        } else {
            console.log('Contact message is sent to the Admin');
        }
    });
    res.redirect('/');
};

module.exports = contact