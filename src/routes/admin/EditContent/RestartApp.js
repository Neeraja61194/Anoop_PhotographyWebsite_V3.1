
const restart = async (req, res) => {
    try {
        console.log("App is going to exit now.....................")
        process.exit(0);
        res.redirect('/')
    } catch (err) {
        console.log("ERR: ", err)
    }
  }
module.exports = restart;
