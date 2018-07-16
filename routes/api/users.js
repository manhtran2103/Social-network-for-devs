const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");
const secretKey = require("../../config/keys").secretKey;

// @route GET api/users/test
// @desc test users route
router.get("/test", (req, res) => res.json({ msg: "users test is working" }));

// @route GET api/users/register
// @desc register users route
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", // rating
        d: "404" // default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route GET api/users/loogin
// @desc login users route
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then(user => {
    // check for user
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    // check for password
    bcrypt.compare(password, user.password).then(isMatched => {
      if (isMatched) {
        const payload = {
          id: user.id,
          email: user.email,
          avatar: user.avatar
        };
        jwt.sign(payload, secretKey, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        return res.status(400).json({ msg: "invalid password" });
      }
    });
  });
});

module.exports = router;
