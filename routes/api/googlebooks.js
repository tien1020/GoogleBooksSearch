const router = require("express").Router();
const googleBooksController = require("../../controllers/googleBooksController");

// Matches with "/api/googlebooks/"
router.route("/")
  .get(googleBooksController.findAll)
 

module.exports = router;
