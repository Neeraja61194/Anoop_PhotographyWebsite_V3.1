const Folder = require("../../../models/folder");
const Image = require("../../../models/image");

// User's Single Folder View 
const userFolderView = async (req, res) => {
    const selectedId = req.params.id;
    Folder.findById(selectedId, function (err, document) {
      Image.find({"folder_category": document.name}, function (err, img_documents) {
        res.render('users/folder', { folder: document, photos: img_documents})
      });
    });
  }

module.exports = userFolderView;

