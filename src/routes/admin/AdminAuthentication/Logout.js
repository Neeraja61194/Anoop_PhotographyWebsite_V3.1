// console.log(restrict)

function setRestrictFalse(){
    restrict = false;
    };
    
const logout = function(req, res) {
    console.log(app.locals)

    app.locals = setRestrictFalse();
    req.logout();
    res.redirect('/');
  }

module.exports = logout;