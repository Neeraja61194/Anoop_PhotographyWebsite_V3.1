const flash = require('express-flash')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

const Folder = require("../../../../models/folder");
const Image = require("../../../../models/image");
const User = require("../../../../models/user");

const get_AdminLogin = (req, res) => {
    res.render('Admin/AdminAuthentication/Admin_Login', { message: req.flash('loginMessage') });
  }

const post_AdminLogin = passport.authenticate('local-login', {
    successRedirect: '/Admin_Index',
    failureRedirect: 'Admin_Login',
    failureFlash: true
  })

const admin_IndexPage = async (req, res) => {
  try {
    res.render('Admin/AdminAuthentication/Admin_Index', { user: req.user });
} catch (err) {
    console.log("ERR: ", err)
}
}

const logout = function(req, res) {
  req.logout();
  res.redirect('/');
}

module.exports = {
    get: get_AdminLogin,
    post: post_AdminLogin,
    index: admin_IndexPage,
    logout: logout
}