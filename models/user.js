var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs')
// var passportLocalMongoose=require("passport-local-mongoose");

var userSchema = mongoose.Schema({

  local            : {
      email        : String,
      password     : String,
  },
  created: {type: Date, default: Date.now}
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// userSchema.plugin(passportLocalMongoose);

// create the model for ADMINS and expose it to our app
module.exports = mongoose.model('User', userSchema);




