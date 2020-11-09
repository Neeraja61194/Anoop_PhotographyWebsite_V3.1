const flash = require('express-flash')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const express = require('express');
require('dotenv').config();
var async = require('async');
var crypto = require('crypto');
var aws     = require('aws-sdk');

const User = require("../../../../models/user");

aws.config.loadFromPath(`${__dirname}/../../../../config/config_aws.json`);
var ses = new aws.SES();
var email_anoop = "annoop007@gmail.com";

// Create Transporter for nodemailer
// let transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//       user: process.env.EMAIL,
//       pass: process.env.PASSWORD 
//   }
// });

const get_forgotPwd = (req, res) => {
    res.render('Admin/AdminAuthentication/ForgotPWD', { message: req.flash('loginMessage'), user: req.user });
  }

const post_forgotPwd = function(req, res, next) {
    async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        User.findOne({ email: req.body.email }, function(err, user) {
          if (!user) {
            req.flash('error', 'No account with that email address exists.');
            return res.redirect('/forgotPassword');
          }
  
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
          user.save(function(err) {
            done(err, token, user);
          });
        });
      },
      function(token, user, done) {
        var ses_mail = "From: 'Anoop Arunan Photography' <" + email_anoop + ">\n";
        ses_mail = ses_mail + "To: " + user.email + "\n";
        ses_mail = ses_mail + "Subject: Admin Account Password Reset - AA Photography Website\n";
        ses_mail = ses_mail + "MIME-Version: 1.0\n";
        ses_mail = ses_mail + "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
        ses_mail = ses_mail + "--NextPart\n\n";
        ses_mail = ses_mail + `You are receiving this because you (or someone else) have requested the reset of the password for your ADMIN account.\n\n`
        ses_mail = ses_mail + "--NextPart\n\n";
        ses_mail = ses_mail + `Please click on the following link, or paste this into your browser to complete the process: \n\n`
        ses_mail = ses_mail + "--NextPart\n\n";
        ses_mail = ses_mail + 'http://' + req.headers.host + '/reset/' + token + '\n\n';
        ses_mail = ses_mail + "--NextPart\n\n";
        ses_mail = ses_mail + `If you did not request this, please ignore this email and your password will remain unchanged.\n\n`;

        var params = {
          RawMessage: { Data: Buffer.from(ses_mail) },
          Destinations: [ user.email ],
          Source: "'Anoop Arunan Photography' <" + email_anoop + ">'"
        };    
        ses.sendRawEmail(params, function(err, data) {
          if(err) {
              res.redirect('/forgotPassword');
          } 
          else {
            req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
            done(err, 'done');
          }           
        });
      }
    ], function(err) {
      if (err) return next(err);
      res.redirect('/forgotPassword');
    });
};

const get_ResetLink = function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgotPassword');
    }
    res.render('Admin/AdminAuthentication/Reset', { user: req.user });
  });
};

const post_ResetLink = function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('/forgotPassword');
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        user.save(function(err) {
          req.logIn(user, function(err) {
            done(err, user);
          });
        });
      });
    },
    function(user, done) {
      var ses_mail_confirm = "From: 'Anoop Arunan Photography' <" + email_anoop + ">\n";
      ses_mail_confirm = ses_mail_confirm + 'To:' + user.email + '\n';
      ses_mail_confirm = ses_mail_confirm + "Subject: Confirmation of Password Reset in AA Website.\n";
      ses_mail_confirm = ses_mail_confirm + "MIME-Version: 1.0\n";
      ses_mail_confirm = ses_mail_confirm + "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
      ses_mail_confirm = ses_mail_confirm + "--NextPart\n\n";
      ses_mail_confirm = ses_mail_confirm + `Hello,\n\n`
      ses_mail_confirm = ses_mail_confirm + "--NextPart\n\n";
      ses_mail_confirm = ses_mail_confirm + 'This is a confirmation that the password for your Admin account ' + user.email + ' has just been changed in the AA Photography Website.\n'

      var params_confirm = {
        RawMessage: { Data: Buffer.from(ses_mail_confirm) },
        Destinations: [ user.email  ],
        Source: "'Anoop Arunan Photography' <" + email_anoop + ">'"
      };    
      ses.sendRawEmail(params_confirm, function(err, data) {
        if(err) {
            res.redirect('/Error!');
        } 
        else {
          req.flash('success', 'Success! Your password has been changed. You will receive an email in a few minutes, confirming that your Password has been successfully updated.');
          done(err);
        }           
      });
    }
  ], function(err) {
    res.redirect('/Admin_Login');
  });
};

module.exports = {
    get: get_forgotPwd,
    post: post_forgotPwd,
    get_reset: get_ResetLink,
    post_reset: post_ResetLink
}