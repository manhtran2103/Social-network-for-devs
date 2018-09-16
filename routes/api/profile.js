const express = require("express");
const router = express.Router();
const passport = require("passport");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const validateProfileForm = require("../../validation/profile");
const validateExperienceForm = require("../../validation/experience");
const validateEducationForm = require("../../validation/education");

// @route GET api/profile/test
// @desc test profile route
// @access public
router.get("/test", (req, res) => res.json({ msg: "profile test is working" }));

// @route GET api/profile/handle/:handle
// @desc profile route
// @access public
router.get("/handle/:handle", (req, res) => {
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      const errors = {};
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route GET api/profile/user/:user_id
// @desc profile route
// @access public
router.get("/user/:user_id", (req, res) => {
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      const errors = {};
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route GET api/profile/all
// @desc profile route
// @access public
router.get("/all", (req, res) => {
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profile => {
      const errors = {};
      if (!profile) {
        errors.noprofile = "There are no profiles";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route GET api/profile/
// @desc profile route
// @access private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.profile = "Profile not found";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route POST api/profile/
// @desc profile route
// @access private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // validate profile input
    const { errors, isValid } = validateProfileForm(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // for skills
    if (typeof req.body.skills !== "undefined")
      profileFields.skills = req.body.skills.split(",");
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.youtube = req.body.instagram;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          // update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(profile => res.json(profile));
        } else {
          // create
          Profile.findOne({ handle: req.body.handle }).then(profile => {
            if (profile) {
              errors.handle = "This handle already exists";
              res.status(400).json(errors);
            } else {
              new Profile(profileFields)
                .save()
                .then(profile => res.json(profile));
            }
          });
        }
      })
      .catch(err => console.log(err));
  }
);

// @route POST api/profile/experience
// @desc profile route
// @access private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //validate experience input
    const { errors, isValid } = validateExperienceForm(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const exp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      profile.experiences.unshift(exp);
      profile.save().then(profile => res.json(profile));
    });
  }
);
// @route POST api/profile/education
// @desc profile route
// @access private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //validate education input
    const { errors, isValid } = validateEducationForm(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const edu = {
        school: req.body.school,
        degree: req.body.degree,
        major: req.body.major,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      profile.education.unshift(edu);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route DELETE api/profile/experience/:id
// @desc profile route
// @access private

router.delete(
  "/experience/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      const id = profile.experiences
        .map(item => item.id)
        .indexOf(req.params.id);
      profile.experiences.splice(id, 1);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route DELETE api/profile/education/:id
// @desc profile route
// @access private

router.delete(
  "/education/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      const id = profile.education.map(item => item.id).indexOf(req.params.id);
      profile.education.splice(id, 1);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route DELETE api/profile
// @desc profile route
// @access private

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
