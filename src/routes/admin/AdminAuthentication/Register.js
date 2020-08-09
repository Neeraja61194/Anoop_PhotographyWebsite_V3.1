const flash = require('express-flash')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

const Folder = require("../../../../models/folder");
const Image = require("../../../../models/image");

const get_AdminRegister = (req, res) => {
    res.render('Admin/AdminAuthentication/Admin_Register', { message: req.flash('signupMessage') });
  }

const post_AdminRegister = passport.authenticate('local-signup', {
    successRedirect : '/Admin_Login', 
    failureRedirect : '/Admin_Register', 
    failureFlash : true 
  })

module.exports = {
    get: get_AdminRegister,
    post: post_AdminRegister
}