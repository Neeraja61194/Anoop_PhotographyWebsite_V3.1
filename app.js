if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express');
const path = require('path');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const multer = require('multer');
const { MongoClient, ObjectID } = require('mongodb');
const fs = require('fs');
const bcrypt = require('bcrypt')
const flash = require('express-flash')
const session = require('express-session');
const methodOverride = require('method-override')
const AOS = require('aos')

const app = express();

//Passport 
require('./app_passport')(passport); // pass passport to app_passport.js

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch',resave: true,saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


const port = process.env.PORT || 3000;
let uri = 'mongodb://mongodb:27017/photoApp';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'pug');

//User, Image and Folder Mongoose Models - MongoDb Database 
const User = require('./models/user');
const Image = require('./models/image');
const Folder = require('./models/folder');
const websiteContent = require('./models/websiteContent');

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/img/photos')
  },
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
  }
})
const upload = multer({ storage: storage });

//Routes - User view 
const home = require('./src/routes/users/UserIndex');
const userFolderView = require('./src/routes/users/UserFolder')
const contact = require('./src/routes/users/Contact')

// Routes - Admin ONLY ==> EditContent Section
const editContent_home = require('./src/routes/admin/EditContent/EditContent_Index');
const { get: new_Folder, getUpdate: getUpdate_Folder, delete: delete_Folder, post: post_Folder, postUpdate: postUpdate_Folder, single: adminFolderView } = require('./src/routes/admin/EditContent/Folder');
const { get: new_Image, post: post_Images, delete: delete_Image } = require('./src/routes/admin/EditContent/Image');
const { get: getUpdate_Email, post: postUpdate_Email } = require('./src/routes/admin/EditContent/UpdateEmail');
const { get: getUpdate_Psw, post: postUpdate_Psw } = require('./src/routes/admin/EditContent/UpdatePassword');
const delete_Account = require('./src/routes/admin/EditContent/DeleteAccount');
const { slot_1: postSlot_1, slot_2: postSlot_2, slot_3: postSlot_3, slot_4: postSlot_4, slot_5: postSlot_5 } = require('./src/routes/admin/EditContent/WebsiteContent');

// Routes - Admin ONLY ==> Authentication Section
const { get: get_securityKey, post: post_securityKey } = require('./src/routes/admin/AdminAuthentication/Security');
const {  get: get_AdminLogin, post: post_AdminLogin, index: admin_IndexPage, logout: logout } = require('./src/routes/admin/AdminAuthentication/Login');
const {  get: get_AdminRegister, post: post_AdminRegister } = require('./src/routes/admin/AdminAuthentication/Register');

//User Section
app.get('/', home);
app.get('/folders/:id', userFolderView);
//User Section - Contact Form
app.post('/contact', contact);

// Admin EditContent Section ==> 1. Main Page
app.get('/EditContent', isLoggedIn ,editContent_home)

// Admin EditContent Section ==> 2. Folder Section
app.get('/newFolder', isLoggedIn, new_Folder)
app.get('/update/:id', isLoggedIn, getUpdate_Folder);
app.get('/delete/:id', isLoggedIn, delete_Folder);
app.post('/folders', isLoggedIn, upload.single('file'), post_Folder);
app.post('/folderUpdate/:id', isLoggedIn, upload.single('file'), postUpdate_Folder);
app.get('/adminFolders/:id', isLoggedIn, adminFolderView);

// Admin EditContent Section ==> 3. Image/Photo Section
app.get('/newPhoto', isLoggedIn, new_Image);
app.post('/photos', isLoggedIn, upload.any(), post_Images);
app.get('/deleteImage/:id', isLoggedIn, delete_Image);

// Admin EditContent Section ==> 4. Account Section (Email/Password Update)
app.get('/updateEmail', isLoggedIn, getUpdate_Email);
app.post('/updateEmail', isLoggedIn, postUpdate_Email);
app.get('/updatePassword', isLoggedIn, getUpdate_Psw);
app.post('/updatePassword', isLoggedIn, postUpdate_Psw);

// Admin EditContent Section ==> 5. Account Section - Delete Account
app.get('/deleteAccount', isLoggedIn, delete_Account);

// Admin EditContent Section ==> 5. Website Contents - Images
app.post('/slot_1', isLoggedIn, upload.single('file'), postSlot_1);
app.post('/slot_2', isLoggedIn, upload.single('file'), postSlot_2);
app.post('/slot_3', isLoggedIn, upload.single('file'), postSlot_3);
app.post('/slot_4', isLoggedIn, upload.single('file'), postSlot_4);
app.post('/slot_5', isLoggedIn, upload.single('file'), postSlot_5);

// Admin Authentication Section ==> 1. Security Key Page
app.get('/security', get_securityKey);
app.post('/security', post_securityKey);
 
// Admin Authentication Section ==> 2. Admin Login
app.get('/Admin_Login', get_AdminLogin)
app.post('/Admin_Login', post_AdminLogin)
app.get('/Admin_Index', isLoggedIn, admin_IndexPage)
app.get('/logout', logout);

// Admin Authentication Section ==> 3. Admin Registration
app.get('/Admin_Register', get_AdminRegister);
app.post('/Admin_Register', post_AdminRegister);

// Checks if User is logged or authenticated to access that particular page
function isLoggedIn(req, res, next) {

  if (req.isAuthenticated())
      return next();
  
  // res.status(400).send('Not found')
  res.redirect('/');
}

app.listen(port, () => {
  console.log(`listening at port ${chalk.green(port)}`);
  });
  