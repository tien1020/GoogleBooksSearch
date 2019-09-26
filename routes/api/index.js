const router = require("express").Router();
const bookRoutes = require("./books");
const googleRoutes = require("./googlebooks");


// Book routes
router.use("/googlebooks", googleRoutes );

// Book routes
router.use("/books", bookRoutes);

module.exports = router;
