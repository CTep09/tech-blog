// Importing dependencies
const router = require("express").Router();
const { Post } = require("../models");
const withAuth = require("../utils/auth");

// Get all posts for the logged-in user at the root endpoint '/'
router.get("/", withAuth, async (req, res) => {
  try {
    // Find all posts associated with current user
    const postData = await Post.findAll({
      where: {
        user_id: req.session.userId,
      },
    });

    // map the post data to plain objects
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render "all-posts-loggedin" template and pass in the post data
    res.render("all-posts-loggedin", {
      layout: "main",
      loggedIn: req.session.loggedIn,
      posts,
    });
  } catch (err) {
    // res.redirect("login");
    res.status(500).json(err);
  }
});

// Render the 'new-post' template for creating a new post at '/new' endpoint
router.get("/new", withAuth, (req, res) => {
  res.render("new-post", {
    layout: "main",
  });
});

// Render the 'edit-post' template for editing a specific post at '/edit/:id' endpoint
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    // Find the post by Id
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      // If post exists, render 'edit-post' template and pass in post data
      const post = postData.get({ plain: true });
      res.render("edit-post", {
        layout: "main",
        post,
      });
    } else {
      // If no post, send 404 status
      res.status(404).end();
    }
  } catch (err) {
    res.redirect("login");
  }
});

// Export router
module.exports = router;
