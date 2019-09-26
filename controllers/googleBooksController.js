  
const axios = require("axios");
 

module.exports = {
  findAll: function (req, res) {
    // console.log("googleSearch findAll ", req.params.bookTitle);
    axios
    .get("https://www.googleapis.com/books/v1/volumes", { params: req.query })
    .then(results=> res.json(results.data))
    .catch(err => res.status(422).json(err));
  }
}