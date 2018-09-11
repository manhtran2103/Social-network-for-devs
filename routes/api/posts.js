const express = require("express");
const router = express.Router();
const passport = require("passport");
const Post = require("../../models/Post");
const validatePostForm = require("../../validation/post");
const validateCommentForm = require("../../validation/comment");

// @route GET api/posts
// @desc get post
// @access public

router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts));
});

// @route GET api/:id
// @desc get a single post
// @access public

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(() => res.status(404).json({ msg: "No post found" }));
});

// @route POST api/posts
// @desc create post
// @access private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostForm(req.body);
    if (!isValid) {
      return res.status(404).json(errors);
    }
    const post = new Post({
      user: req.user.id,
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar
    });
    post.save().then(post => {
      res.json(post);
    });
  }
);

// @route POST api/posts/like/:id
// @desc like post
// @access private

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id).then(post => {
      if (
        post.likes
          .map(like => like.user.toString())
          .includes(req.user.id.toString())
      ) {
        return res.json({ msg: "Already liked" });
      }
      post.likes.unshift({ user: req.user.id });
      post.save().then(() => res.json(post));
    });
  }
);

// @route POST api/posts/unlike/:id
// @desc unlike post
// @access private

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id).then(post => {
      if (
        !post.likes
          .map(like => like.user.toString())
          .includes(req.user.id.toString())
      ) {
        return res.json({ msg: "Not liked yet" });
      }
      const index = post.likes
        .map(like => like.user.toString())
        .indexOf(req.user.id.toString());
      post.likes.splice(index, 1);
      post.save().then(() => res.json({ msg: "success" }));
    });
  }
);

// @route DELETE api/posts/:id
// @desc delete post
// @access private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (req.user.id != post.user) {
          return res.json({
            msg: "You do not have authority to delete this post"
          });
        }
        post.remove().then(() => res.json({ msg: "success" }));
      })
      .catch(err => res.status(404).json({ msg: "No post found" }));
  }
);

// @route POST api/posts/comment/:id
// @desc post comment
// @access private

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id).then(post => {
      const comment = {
        user: req.params.id,
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar
      };
      const { errors, isValid } = validateCommentForm(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      post.comments.unshift(comment);
      post.save().then(post => res.json(post));
    });
  }
);

// @route DELETE api/posts/comment/:id/:comment_id
// @desc delete comment
// @access private

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id).then(post => {
      const comment = post.comments.find(
        comment => comment._id.toString() == req.params.comment_id.toString()
      );
      //console.log(comment);
      if (!comment) {
        return res.status(400).json({ msg: "Comment does not exist" });
      }
      const index = post.comments.indexOf(comment);
      post.comments.splice(index, 1);
      post.save().then(() => res.json({ msg: "success" }));
    });
  }
);

module.exports = router;
