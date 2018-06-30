const express = require("express");
const router = express.Router();

// get
// @desc /api/users
router.get("/test", (req, res) => res.json({ msg: "users test is working" }));

module.exports = router;
