const moveFile = require('move-file');
const path = require('path');
const fs = require('fs');

//Config File for editing About the Photographer Section
const config = fs.readFileSync('config/config.json'); 
const configData = JSON.parse(config); 

const Edit_AboutSection = async (req, res) => {
  try {
      configData.aboutSection.heading = req.body.heading;
      let edited_aboutHeading = JSON.stringify(configData);
      fs.writeFileSync('config/config.json', edited_aboutHeading);
      
      configData.aboutSection.About_Para1 = req.body.About_Para1;
      let edited_About_Para1 = JSON.stringify(configData);
      fs.writeFileSync('config/config.json', edited_About_Para1);

      configData.aboutSection.About_Para2 = req.body.About_Para2;
      let edited_About_Para2 = JSON.stringify(configData);
      fs.writeFileSync('config/config.json', edited_About_Para2);

  } catch (err) {
      console.log("ERR: ", err);
  } finally {
      res.redirect('/EditContent');
  }
}

const Edit_ServicesSection = async (req, res) => {
  try {
      configData.servicesSection.Services_Para1 = req.body.para_1;
      let edited_Services_Para1 = JSON.stringify(configData);
      fs.writeFileSync('config/config.json', edited_Services_Para1);
      
      configData.servicesSection.Services_Para2 = req.body.para_2;
      let edited_Services_Para2 = JSON.stringify(configData);
      fs.writeFileSync('config/config.json', edited_Services_Para2);

      configData.servicesSection.Services_Para3 = req.body.para_3;
      let edited_Services_Para3 = JSON.stringify(configData);
      fs.writeFileSync('config/config.json', edited_Services_Para3);

  } catch (err) {
      console.log("ERR: ", err);
  } finally {
      res.redirect('/EditContent');
  }
}

const postSlot_1 = async (req, res) => {

    const main_img_Folder = __dirname+'/../../../../public/img/Slot_1_Image/'
    
    main_img_List = []

    fs.readdirSync(main_img_Folder).forEach(main_img_img => {
      main_img_List.push(main_img_img);
    });

    main_img_List.forEach(function(value){
      delete_Slot1_Image(value)
    });

    moveFile(path.join('public/img/photos/', req.file.filename), path.join('public/img/Slot_1_Image/', req.file.filename), function(err) {
      
    });
    
    res.redirect('/EditContent')
  }

// function to delete existing main image (slot 1 image) from the slot 1 folder
function delete_Slot1_Image(image){
  const dir = __dirname + '/../../../../public/img/Slot_1_Image/' + image;
  if (fs.existsSync(dir)) {
      fs.unlink(dir, (err) => {
          if (err) throw err;
          console.log('successfully deleted images from folder photos');
      });
  }
}

// Slot 2 Image - About Me
const postSlot_2 = async (req, res) => {

  const slot_2_Folder = __dirname+'/../../../../public/img/Slot_2_Image/'
  slot_2_List = []
  fs.readdirSync(slot_2_Folder).forEach(slot2_img => {
    slot_2_List.push(slot2_img);
  });

  slot_2_List.forEach(function(value){
    delete_Slot2_Image(value)
  });

  moveFile(path.join('public/img/photos/', req.file.filename), path.join('public/img/Slot_2_Image/', req.file.filename), function(err) {
  });
  
  res.redirect('/EditContent')
}

// function to delete existing image (slot 2 image) from the slot 2 folder
function delete_Slot2_Image(image){
const dir = __dirname + '/../../../../public/img/Slot_2_Image/' + image;
if (fs.existsSync(dir)) {
    fs.unlink(dir, (err) => {
        if (err) throw err;
        console.log('successfully deleted images from folder photos');
    });
}
}

// Slot 3 Image - Parallax
const postSlot_3 = async (req, res) => {

  const slot_3_Folder = __dirname+'/../../../../public/img/Slot_3_Image/'
  slot_3_List = []
  fs.readdirSync(slot_3_Folder).forEach(slot3_img => {
    slot_3_List.push(slot3_img);
  });

  slot_3_List.forEach(function(value){
    delete_Slot3_Image(value)
  });

  moveFile(path.join('public/img/photos/', req.file.filename), path.join('public/img/Slot_3_Image/', req.file.filename), function(err) {
  });
  
  res.redirect('/EditContent')
}

// function to delete existing image (slot 3 image) from the slot 3 folder
function delete_Slot3_Image(image){
const dir = __dirname + '/../../../../public/img/Slot_3_Image/' + image;
if (fs.existsSync(dir)) {
    fs.unlink(dir, (err) => {
        if (err) throw err;
        console.log('successfully deleted images from folder photos');
    });
}
}

// Slot 4 Image - Parallax
const postSlot_4 = async (req, res) => {

  const slot_4_Folder = __dirname+'/../../../../public/img/Slot_4_Image/'
  slot_4_List = []
  fs.readdirSync(slot_4_Folder).forEach(slot4_img => {
    slot_4_List.push(slot4_img);
  });

  slot_4_List.forEach(function(value){
    delete_Slot4_Image(value)
  });

  moveFile(path.join('public/img/photos/', req.file.filename), path.join('public/img/Slot_4_Image/', req.file.filename), function(err) {
  });
  
  res.redirect('/EditContent')
}

// function to delete existing image (slot 4 image) from the slot 4 folder
function delete_Slot4_Image(image){
const dir = __dirname + '/../../../../public/img/Slot_4_Image/' + image;
if (fs.existsSync(dir)) {
    fs.unlink(dir, (err) => {
        if (err) throw err;
        console.log('successfully deleted images from folder photos');
    });
}
}

// Slot 5 Image - Contact
const postSlot_5 = async (req, res) => {

  const slot_5_Folder = __dirname+'/../../../../public/img/Slot_5_Image/'
  slot_5_List = []
  fs.readdirSync(slot_5_Folder).forEach(slot5_img => {
    slot_5_List.push(slot5_img);
  });

  slot_5_List.forEach(function(value){
    delete_Slot5_Image(value)
  });

  moveFile(path.join('public/img/photos/', req.file.filename), path.join('public/img/Slot_5_Image/', req.file.filename), function(err) {
  });
  
  res.redirect('/EditContent')
}

// function to delete existing image (slot 4 image) from the slot 4 folder
function delete_Slot5_Image(image){
const dir = __dirname + '/../../../../public/img/Slot_5_Image/' + image;
if (fs.existsSync(dir)) {
    fs.unlink(dir, (err) => {
        if (err) throw err;
        console.log('successfully deleted images from folders');
    });
}
}


module.exports = {
  slot_1: postSlot_1,
  slot_2: postSlot_2,
  slot_3: postSlot_3,
  slot_4: postSlot_4,
  slot_5: postSlot_5,
  Edit_About: Edit_AboutSection,
  Edit_Services: Edit_ServicesSection
}
