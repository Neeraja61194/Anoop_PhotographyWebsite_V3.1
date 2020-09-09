const fs = require('fs');

const Folder = require("../../../../models/folder");
const Image = require("../../../../models/image");
const User = require("../../../../models/user");

//config
var config = require('../../../../config/config.json')
config_aboutHeading = config.aboutSection.heading;
config_address = config.aboutSection.address;

config_Point_1 = config.servicesSection.Point_1;
config_Para_1 = config.servicesSection.Para_1;

// Reading the Main Page images from the folder Slot_1_Image
const Slot_1_Folder = __dirname+'/../../../../public/img/Slot_1_Image/'
Slot_1_List = []
fs.readdirSync(Slot_1_Folder).forEach(main_image => {
  Slot_1_List.push(main_image);
});

// Reading the Slot 2 image from the folder Slot_2_Image
const Slot_2_Folder = __dirname+'/../../../../public/img/Slot_2_Image/'
Slot_2_List = []
fs.readdirSync(Slot_2_Folder).forEach(image => {
  Slot_2_List.push(image);
});

// Reading the Slot 3 image from the folder Slot_3_Image
const Slot_3_Folder = __dirname+'/../../../../public/img/Slot_3_Image/'
Slot_3_List = []
fs.readdirSync(Slot_3_Folder).forEach(image => {
  Slot_3_List.push(image);
});

// Reading the Slot 4 image from the folder Slot_4_Image
const Slot_4_Folder = __dirname+'/../../../../public/img/Slot_4_Image/'
Slot_4_List = []
fs.readdirSync(Slot_4_Folder).forEach(image => {
  Slot_4_List.push(image);
});

// Reading the Slot 5 image from the folder Slot_5_Image
const Slot_5_Folder = __dirname+'/../../../../public/img/Slot_5_Image/'
Slot_5_List = []
fs.readdirSync(Slot_5_Folder).forEach(image => {
  Slot_5_List.push(image);
});

// Admin View only
const editContent_home = async (req, res) => {

    // console.log("User : ", req.user)
    const documents = await Folder.find().exec();
    const indexVariables = {
        pageTitle: "First page of our app",
        folders: documents
    }
    const img_documents = await Image.find().exec();
    const user_documents = await User.find().exec();

    res.render('Admin/EditContent/EditContent_Index', { variables: indexVariables, photos: img_documents, users: user_documents,Slot_1_List, Slot_2_List, Slot_3_List, Slot_4_List, Slot_5_List, config_aboutHeading, config_address, config_Point_1, config_Para_1});
}

module.exports = editContent_home;

