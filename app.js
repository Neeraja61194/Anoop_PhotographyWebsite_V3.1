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

app = express();

//Passport 
require('./app_passport')(passport); // pass passport to app_passport.js

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch',resave: true,saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


const port = process.env.PORT || 3000;
let uri = 'mongodb://localhost:27017/photoApp';
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

// Restrict Global Variable
var restrict = false;

//Routes - User view 
const home = require('./src/routes/users/UserIndex');
const { folder: userFolderView, singleFolder: singleFolder } = require('./src/routes/users/UserFolder')
const contact = require('./src/routes/users/Contact')
const errorPage = require('./src/routes/users/ErrorPage')

// Routes - Admin ONLY ==> EditContent Section
const editContent_home = require('./src/routes/admin/EditContent/EditContent_Index');
const { get: new_Folder, getUpdate: getUpdate_Folder, delete: delete_Folder, post: post_Folder, postUpdate: postUpdate_Folder, single: adminFolderView } = require('./src/routes/admin/EditContent/Folder');
const { get: new_Image, post: post_Images, delete: delete_Image } = require('./src/routes/admin/EditContent/Image');
const { slot_1: postSlot_1, slot_2: postSlot_2, slot_3: postSlot_3, slot_4: postSlot_4, slot_5: postSlot_5, Edit_About: Edit_AboutSection, Edit_Services: Edit_ServicesSection } = require('./src/routes/admin/EditContent/WebsiteContent');

// Routes - Admin ONLY ==> Profile Section
const viewAdmins = require('./src/routes/admin/EditContent/ViewAdmins')
const restart = require('./src/routes/admin/EditContent/RestartApp')
const delete_Account = require('./src/routes/admin/EditContent/DeleteAccount');

// Routes - Admin ONLY ==> Authentication Section
const { get: get_securityKey} = require('./src/routes/admin/AdminAuthentication/Security');
const {  get: get_AdminRegister, post: post_AdminRegister } = require('./src/routes/admin/AdminAuthentication/Register');
const {  get: get_AdminLogin, post: post_AdminLogin, index: admin_IndexPage} = require('./src/routes/admin/AdminAuthentication/Login');
const {  get: get_forgotPwd, post: post_forgotPwd, get_reset: get_ResetLink, post_reset: post_ResetLink } = require('./src/routes/admin/AdminAuthentication/ForgotPWD');

//User Section
app.get('/', home);
app.get('/folders/:id', userFolderView);
app.get('/folder/:name', singleFolder);

//User Section - Contact Form
app.post('/contact', contact);

//User Section - Error Page !!
app.get('/Error!', errorPage);

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

// Admin EditContent Section ==> 4. Website Contents - Background Images, About Section and Services Section
app.post('/slot_1', isLoggedIn, upload.single('file'), postSlot_1);
app.post('/slot_2', isLoggedIn, upload.single('file'), postSlot_2);
app.post('/slot_3', isLoggedIn, upload.single('file'), postSlot_3);
app.post('/slot_4', isLoggedIn, upload.single('file'), postSlot_4);
app.post('/slot_5', isLoggedIn, upload.single('file'), postSlot_5);
app.post('/slot_About', isLoggedIn, Edit_AboutSection);
app.post('/slot_Services', isLoggedIn, Edit_ServicesSection);

// Admin Profile Section ==> 1. View All Admins
app.get('/viewAdmins',isLoggedIn, viewAdmins)

// Admin Profile Section ==> 2. Restart the Application (after the Updates)
app.get('/restart',isLoggedIn, restart)

// Admin Profile Section ==> 3. Delete Account
app.get('/deleteAccount', isLoggedIn, delete_Account);

// Admin Authentication Section ==> 1. Security Key Page
app.get('/' + process.env.Path1, get_securityKey);

function setRestrictTrue(){
  restrict = true;
  };

app.post('/' + process.env.Path1, (req, res) => {
  const admin_code = generate_AdminCode(process.env.admin_code)
  try {
    if (bcrypt.compareSync(req.body.sec_key, admin_code)) {
      setRestrictTrue();
      res.render('Admin/AdminAuthentication/Admin_Login');
    } else {
      console.log("Error : Security Key is incorrect");
      res.redirect('/'+ process.env.Path1);  
    }
  } catch (e) {
    return done(e)
  }
});

function setRestrictFalse(){
  restrict = false;
  };

var restrictPage = function(req, res, next) {
  if (restrict === false)
    return res.redirect('/Error!')
  next();
};

// Admin Profile Section ==> 4. Logout 
app.get('/logout', function(req, res) {
  setRestrictFalse();
  req.logout();
  res.redirect('/');
});

// Admin Authentication Section ==> 2. Admin Registration
app.get('/' + process.env.Path2, restrictPage, get_AdminRegister);
app.post('/' + process.env.Path2 , post_AdminRegister);

// Admin Authentication Section ==> 3. Admin Login
app.get('/Admin_Login', restrictPage, get_AdminLogin)
app.post('/Admin_Login', post_AdminLogin)
app.get('/Admin_Index', isLoggedIn, admin_IndexPage)

// Admin Authentication Section ==> 3. Forgot Password? and Reset Password
app.get('/forgotPassword', restrictPage, get_forgotPwd)
app.post('/forgotPassword', post_forgotPwd)
app.get('/reset/:token', get_ResetLink)
app.post('/reset/:token', post_ResetLink)

// Checks if User is logged or authenticated to access that particular page
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}

var generate_AdminCode = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// Redirects to Error Page when a app.get path does not exist and when restricted pages are accessed by unauthorized people. 
app.use((req, res, next) => {
  return res.redirect('/Error!')
});

app.listen(port, () => {
  console.log(`listening at port ${chalk.green(port)}`);
  });
  