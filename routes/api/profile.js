const express = require("express");
const router = express.Router();

// @route GET api/profile/test
// @desc test profile route
router.get("/test", (req, res) => res.json({ msg: "profile test is working" }));

module.exports = router;
