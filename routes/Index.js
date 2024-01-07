const router = require("express").Router();
const apiRoutes = require(".api");

router.use ("/api", apiRoutes);

// Edit Later for error send //

module.exports = router;