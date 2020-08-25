const bcrypt = require('bcrypt')
const flash = require('express-flash')
const session = require('express-session');

const Folder = require("../../../../models/folder");
const Image = require("../../../../models/image");

const get_securityKey = async (req, res) => {
    res.render('Admin/AdminAuthentication/securityKey')
  }

// var post_securityKey = (req, res) => {
//     res.restrict = false;
//     const admin_code = generate_AdminCode(process.env.admin_code)
//     // var restrict = false;
//     try {
//       if (bcrypt.compareSync(req.body.sec_key, admin_code)) {
//         res.restrict = true;
//         res.render('Admin/AdminAuthentication/Admin_Login');
//       } else {
//         console.log("Error : Security Key is incorrect");
//         // var restrict = false;
//         // res.status(400).send('Not found')
//         // req.flash('Admin Code is Incorrect!')
//         res.redirect('/security');  
//       }
//     } catch (e) {
//       return done(e)
//     }
//     return restrict;
//   }
// Function for hashing and generating salt 
var generate_AdminCode = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  };

module.exports = {
    get: get_securityKey
    // post: post_securityKey,
}
