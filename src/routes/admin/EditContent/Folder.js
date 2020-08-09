// Admin's EditContent Section for Folders

const fs = require('fs');

const Folder = require("../../../../models/folder");
const Image = require("../../../../models/image");

const new_Folder = (req, res) => {
    res.render('Admin/EditContent/newFolder');
  }

const getUpdate_Folder = async (req, res) => {
    try {
        const selectedId = req.params.id;
        const document = await Folder.findById(selectedId).exec();
        res.render('Admin/EditContent/update', { folder: document });
    } catch (err) {
        console.log("ERR: ", err)
    }
  }
const delete_Folder =  async (req, res) => {
    if (true) {
      const idToDelete = req.params.id;
      const document = await Folder.findById(idToDelete).exec();
      //Delete the image from folder
      deleteImage(document.folder_img);
      
      Folder.findById(idToDelete, function (err, document) {
        Image.find({"folder_category": document.name}, function (err, category) {  
          category.forEach(category => { 
            //Delete the images from local photos folder
            deleteImage(category.image);
            }); 
            //Delete the images present inside that folder from database
          Image.deleteMany( { "folder_category": document.name } ).exec();  
        })
      });
    
      //Delete Folder from database
      await Folder.deleteOne({ _id: idToDelete }).exec();
      res.redirect('/EditContent');
    }
  }

const post_Folder = (req, res) => {
    //internal scope of this function
    const newFolder = {
        name: req.body.folder,
        folder_img: req.file.filename
    }
    const folder = new Folder(newFolder);
    folder.save()
    res.redirect('/EditContent');
  }

const postUpdate_Folder = async (req, res) => {
    try {
        const idToUpdate = req.params.id;
  
        //create the updateObject
        let updateObject = {
            "name": req.body.folder,
        }
  
        let updateFolderCategory = {
          "folder_category": req.body.folder,
        }
        //logic to handle the image
        if (req.file) {
            console.log("Updating image");
            updateObject.folder_img = req.file.filename;
        }
        //call update on database
        let filter = { _id: idToUpdate };
  
        //find the document and put in memory
        const document = await Folder.findById(idToUpdate).exec();
        
        // Update the folder_category name of the photos(Image Model) in the particular folder
        Folder.findById(idToUpdate, function (err, document) {
          Image.find({"folder_category": document.name}, function (err, category) {       
            Image.update({"folder_category": document.name}, updateFolderCategory, { multi: true },function (err, category) {          
            }) 
          })
        });
        // Then update the folder
        let result = await Folder.updateOne(filter, updateObject).exec();
  
        if (result.ok > 0 && req.file) {
            // delete the image 
            deleteImage(document.folder_img);
        }
        
    } catch (err) {
        console.log("ERR: ", err);
    } finally {
        //redirect user to index
        res.redirect('/EditContent');
    }
  }

// Admin's Single Folder View 
const adminFolderView = async (req, res) => {
  const selectedId = req.params.id;
  Folder.findById(selectedId, function (err, document) {
    Image.find({"folder_category": document.name}, function (err, img_documents) {
      res.render('Admin/EditContent/AdminFolder', { folder: document, photos: img_documents})
    });
  });
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
    get: new_Folder,
    post: post_Folder,
    getUpdate: getUpdate_Folder,
    delete: delete_Folder,
    postUpdate: postUpdate_Folder,
    single: adminFolderView
}
