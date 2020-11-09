const flash = require('express-flash')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

const Folder = require("../../../../models/folder");
const Image = require("../../../../models/image");
const User = require("../../../../models/user");

const get_AdminLogin = (req, res) => {
    res.render('Admin/AdminAuthentication/Admin_Login', { message: req.flash('loginMessage'), user: req.user });
  }

const post_AdminLogin = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err)
    if (!user) {
      return res.redirect('/Admin_Login')
    }
    req.logIn(user, function(err) {
      if (err) return next(err);
      return res.redirect('/Admin_Index');
    });
  })(req, res, next);
};

const admin_IndexPage = async (req, res) => {
  try {
    var userEmail = req.user.email;
    // res.redirect('/Admin_Index/' + userEmail)
   res.render('Admin/AdminAuthentication/Admin_Index', { user: req.user });
} catch (err) {
    console.log("ERR: ", err)
}
}

module.exports = {
    get: get_AdminLogin,
    post: post_AdminLogin,
    index: admin_IndexPage
}