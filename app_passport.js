var LocalStrategy   = require('passport-local').Strategy;
// const flash = require('express-flash')

var User = require('./models/user');

module.exports = function(passport) {

    passport.use(new LocalStrategy({
      passReqToCallback : true
    }, 
      function(req, username, password, done) {
        User.findOne({ username: username }, function(err, user) {
          if (err) return done(err);
          if (!user) return done(null, false, req.flash('loginMessage', 'No user found.'));
          user.comparePassword(password, function(err, isMatch) {
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            }
          });
        });
      }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
};
