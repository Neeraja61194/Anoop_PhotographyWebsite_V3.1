const fs = require('fs');
const moment = require('moment')

const User = require("../../../../models/user");
// const user = require('../../../../models/user');

// const viewAdmins = async (req, res) => {
//     try {
//         console.log("Username : ", req.user)
//         var dict = []; 
//         var newDate = moment(req.user.created).format('LLL');
//         dict.push({
//             usrename: req.user.username,
//             admins: req.user.email,
//             dateCreated: newDate
//         });
//             res.render('Admin/EditContent/ViewAdmins', { adminCreatedList: dict });
//     } catch (err) {
//         console.log("ERR: ", err)
//     }
//   }

const viewAdmins = async (req, res) => {
    try {
        
        var dict = []; 
        User.find({}, function(err, users) {
            users.forEach(user => { 
                var newDate = moment(user.created).format('LLL');
                dict.push({
                    username: user.username,
                    admins: user.email,
                    dateCreated: newDate
                });
              }); 
            res.render('Admin/EditContent/ViewAdmins', { adminCreatedList: dict });
        });
    } catch (err) {
        console.log("ERR: ", err)
    }
  }

module.exports = viewAdmins;