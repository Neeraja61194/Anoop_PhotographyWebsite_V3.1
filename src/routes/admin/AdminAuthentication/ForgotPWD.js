const flash = require('express-flash')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();
var async = require('async');
var crypto = require('crypto');

const User = require("../../../../models/user");

// Create Transporter for nodemailer
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
  }
});

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
        var mailOptions = {
          to: user.email,
          from: 'neerajan.mec@gmail.com',
          subject: 'Admin Account Password Reset - Photography Website',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your ADMIN account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        transporter.sendMail(mailOptions, function(err, data){
          req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
          done(err, 'done');
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
      var mailOptions = {
        to: user.email,
        from: 'neerajan.mec@gmail.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      
      transporter.sendMail(mailOptions, function(err, data){
        req.flash('success', 'Success! Your password has been changed. You will receive an email in a few minutes, confirming that your Password has been successfully updated.');
        done(err);
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