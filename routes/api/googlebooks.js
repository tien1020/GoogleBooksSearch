const router = require("express").Router();
const googleBooksController = require("../../controllers/googleController");

// Matches with "/api/googlebooks/"
router.route("/")
  .get(googleBooksController.findAll)
 

module.exports = router;
