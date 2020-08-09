var mongoose = require('mongoose');

const Folder = mongoose.model('Folder', {
    name: String,
    folder_img: String
  });
  

// create the model for Folders and expose it to our app
module.exports = Folder;




