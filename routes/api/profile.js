const express = require("express");
const router = express.Router();
const passport = require("passport");
const Profile = require("../../models/Profile");

// @route GET api/profile/test
// @desc test profile route
// @access public
router.get("/test", (req, res) => res.json({ msg: "profile test is working" }));

// @route GET api/profile/
// @desc profile route
// @access private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.profile = "profile not found";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
