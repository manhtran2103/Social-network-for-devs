const express = require("express");
const router = express.Router();

// @route GET api/posts/test
// @desc test posts route
router.get("/test", (req, res) => res.json({ msg: "posts test is working" }));

module.exports = router;
