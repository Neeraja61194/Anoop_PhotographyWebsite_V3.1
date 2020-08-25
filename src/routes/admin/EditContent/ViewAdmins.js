const fs = require('fs');
const moment = require('moment')

const User = require("../../../../models/user");
const user = require('../../../../models/user');

const viewAdmins = async (req, res) => {
    try {
        var dict = []; 
        User.find({}, function(err, users) {
            users.forEach(user => { 
                var newDate = moment(user.created).format('LLL');
                dict.push({
                    admins: user.local.email,
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