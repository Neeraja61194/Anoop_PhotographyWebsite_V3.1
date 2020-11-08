const Folder = require("../../../models/folder");
const Image = require("../../../models/image");

// User's Single Folder View 
// const userFolderView = async (req, res) => {
//     const selectedId = req.params.id;
//     Folder.findById(selectedId, function (err, document) {
//       Image.find({"folder_category": document.name}, function (err, img_documents) {
//         res.render('users/folder', { folder: document, photos: img_documents})
//       });
//     });
//   }

const userFolderView = async (req, res) => {
  const selectedId = req.params.id;
  Folder.findById(selectedId, function (err, document) {
    const folder_name = document.name;
    res.redirect('/folder/'+ encodeURIComponent(folder_name))
  }); 
}
const singleFolder = async (req, res) => {
  const folder_name = req.params.name;

  Folder.find({"name": folder_name}, function (err, document) {
    Image.find({"folder_category": folder_name}, function (err, img_documents) {
      res.render('users/folder', { folder: document, photos: img_documents})
    });
  });
}
// module.exports = userFolderView;
module.exports = {folder: userFolderView, singleFolder: singleFolder}
