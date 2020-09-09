var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs')
// var passportLocalMongoose=require("passport-local-mongoose");

var userSchema = mongoose.Schema({

  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created: {type: Date, default: Date.now},
  resetPasswordToken: String,
  resetPasswordExpires: Date
  
});

userSchema.pre('save', function(next) {
  var user = this;
  var SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// userSchema.methods.generateHash = function(password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
// };

// userSchema.methods.validPassword = function(password) {
//   return bcrypt.compareSync(password, this.local.password);
// };

// create the model for ADMINS and expose it to our app
module.exports = mongoose.model('User', userSchema);




