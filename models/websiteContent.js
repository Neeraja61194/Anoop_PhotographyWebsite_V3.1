var mongoose = require('mongoose');

const websiteContent = mongoose.model('websiteContent', {
    main_img : String,
    parallax_1: String
}
// { capped: { size: 1024, max: 2, autoIndexId: true } }
);
  
// create the model for Images and expose it to our app
module.exports = websiteContent;

