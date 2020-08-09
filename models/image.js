var mongoose = require('mongoose');

const Image = mongoose.model('Image', {
    folder_category: String,
    image: String
});
  
// create the model for Images and expose it to our app
module.exports = Image;




