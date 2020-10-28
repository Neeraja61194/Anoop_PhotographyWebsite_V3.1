// Admin's EditContent Section for Images/Photos

const fs = require('fs');

const Folder = require("../../../../models/folder");
const Image = require("../../../../models/image");

const new_Image = (req, res) => {
    var folder_categoryList = []
    
    Folder.find({} , function (err, document) {
      document.forEach(document => { 
        folder_categoryList.push(document.name);
      }); 
      res.render('Admin/EditContent/newPhoto', { folder_categoryList: folder_categoryList});
      });
  }

const post_Images = (req, res) => {

    /*Getting only the "filename"(name of image) from req.files - which contains the information about 
    all the files chosen to upload. "files" - is a list containing the names(filename) of images */
    var files = [];
    var fileKeys = Object.keys(req.files);
  
    fileKeys.forEach(function(key) {
        files.push(req.files[key].filename);
    });
    
    /*Maps the "filenames" from the "files" list to the "image:" and the "category" selected from 
    drop down list into the "folder_category:" */
    newPhoto = files.map(x => {
      return({folder_category: req.body.category, image: x});
    });
  
    // Inserts all the images and their corresponding folder category into the "Image" model
    Image.insertMany(newPhoto);
  
    res.redirect('/EditContent');
  }

const delete_Image =  async (req, res) => {
    //internal scope of this function
    const idToDelete = req.params.id;
    const document = await Image.findById(idToDelete).exec();
    
    //Delete the image from folder
    deleteImage(document.image);

    //Delete Image from database
    await Image.deleteOne({ _id: idToDelete }).exec();
    res.redirect('/EditContent');
  }
  
// function to delete images from the folder
function deleteImage(image){
  const dir = __dirname + "/../../../../public/img/photos/" + image;
  if (fs.existsSync(dir)) {
      fs.unlink(dir, (err) => {
          if (err) throw err;
          console.log('successfully deleted images from folder photos');
      });
  }
}

module.exports = {
    get: new_Image,
    post: post_Images,
    delete: delete_Image
}
