const flash = require('express-flash')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

const Folder = require("../../../../models/folder");
const Image = require("../../../../models/image");
const User = require("../../../../models/user");

const get_AdminRegister = (req, res) => {
    res.render('Admin/AdminAuthentication/Admin_Register', { message: req.flash('signupMessage'), user: req.user });
  }

const post_AdminRegister = function(req, res) {
  User.findOne({
      $or: [{
          email: req.body.email
      }, {
          username: req.body.username
      }]
    }).then(user => {
      if (user) {
          if (user.username === req.body.username) {
              req.flash('signupMessage', 'Username already exists !! ')
          } else {
              req.flash('signupMessage', 'Email already exists !!')
          }
          return res.redirect('/Admin_Register');
      } else {
        var user = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        });

        user.save(function(err) {
          req.logIn(user, function(err) {
            res.redirect('/Admin_Login');
          });
        });
      }
  })
}
// const post_AdminRegister = function(req, res) {
//     var user = new User({
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password
//       });
  
//     user.save(function(err) {
//       req.logIn(user, function(err) {
//         res.redirect('/Admin_Login');
//       });
//     });
//   };

module.exports = {
    get: get_AdminRegister,
    post: post_AdminRegister
}