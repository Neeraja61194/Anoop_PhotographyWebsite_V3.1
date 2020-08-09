const fs = require('fs');
const bcrypt = require('bcrypt')

const User = require("../../../../models/user");

const getUpdate_Psw = async (req, res) => {
    try {
        res.render('Admin/EditContent/UpdatePassword', { user: req.user });
    } catch (err) {
        console.log("ERR: ", err)
    }
  }

const postUpdate_Psw = async (req, res) => {
    try {
        var user = req.user

        const idToUpdate = req.user._id    
        let filter = { _id: idToUpdate };

        const hashPsw = generateHash(req.body.newPassword)
        console.log("user.local.password after : ", hashPsw)

        // let updateObject = {
        //     "local.password": hashPsw
        // }
        
        // let result = await User.updateOne(filter, updateObject ).exec();
        let result = await User.update(filter, {$set: {"local.password": hashPsw}}).exec();
  
    } catch (err) {
        console.log("ERR: ", err);
    } finally {
        req.logout();
        res.redirect('/logout');
    }
  }

  
var generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  };
  

module.exports = {
    get: getUpdate_Psw,
    post: postUpdate_Psw
}
