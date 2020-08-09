const fs = require('fs');

const User = require("../../../../models/user");

const getUpdate_Email = async (req, res) => {
    try {
        res.render('Admin/EditContent/UpdateEmail', { user: req.user });
    } catch (err) {
        console.log("ERR: ", err)
    }
  }

const postUpdate_Email = async (req, res) => {
    try {
        const idToUpdate = req.user._id    
        let filter = { _id: idToUpdate };

        let result = await User.updateOne(filter, {$set: {"local.email": req.body.newEmail}}).exec();
  
    } catch (err) {
        console.log("ERR: ", err);
    } finally {
        res.redirect('/logout');
    }
  }

module.exports = {
    get: getUpdate_Email,
    post: postUpdate_Email
}
