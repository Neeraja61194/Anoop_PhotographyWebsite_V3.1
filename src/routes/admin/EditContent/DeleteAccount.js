const User = require("../../../../models/user");

const delete_Account =  async (req, res) => {

  if (true) {
    const idToDelete = req.user._id;
    const document = await User.findById(idToDelete).exec();
    
    //Delete Admin Account from database
    await User.deleteOne({ _id: idToDelete }).exec();
    res.redirect('/');
  }
}
module.exports = delete_Account;
